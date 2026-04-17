"""FastAPI dependency injection — DB sessions, auth context, rate limiting."""
from fastapi import Depends, HTTPException, Header, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError
from uuid import UUID
from typing import Optional
import redis.asyncio as aioredis
import time

from models.database import AsyncSessionLocal
from schemas.auth import AuthContext
from config import get_settings

settings = get_settings()


# --- Database Session ---
async def get_db() -> AsyncSession:
    """Provide an async database session per request."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


# --- Redis ---
_redis_client: Optional[aioredis.Redis] = None


async def get_redis() -> Optional[aioredis.Redis]:
    """Get or create a Redis connection. Returns None if Redis is unavailable."""
    global _redis_client
    if _redis_client is None:
        try:
            client = aioredis.from_url(settings.REDIS_URL, decode_responses=True, socket_connect_timeout=1)
            await client.ping()
            _redis_client = client
        except Exception:
            return None
    return _redis_client


# --- JWT Auth ---
async def get_current_user(
    authorization: str = Header(None),
) -> AuthContext:
    """Extract and validate JWT from Authorization header.
    
    Returns an AuthContext with user_id, org_id, role, email.
    Works with both Supabase JWTs and local dev tokens.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Extract Bearer token
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization scheme",
        )

    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
        )

    # Extract claims
    user_id = payload.get("sub")
    org_id = payload.get("org_id")
    role = payload.get("user_role", "member")
    email = payload.get("email", "")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject claim",
        )

    return AuthContext(
        user_id=UUID(user_id),
        org_id=UUID(org_id) if org_id else UUID(user_id),  # Fallback for dev
        role=role,
        email=email,
    )


# --- Optional Auth (for public endpoints that benefit from auth) ---
async def get_optional_user(
    authorization: str = Header(None),
) -> Optional[AuthContext]:
    """Like get_current_user but returns None if no auth header."""
    if not authorization:
        return None
    try:
        return await get_current_user(authorization)
    except HTTPException:
        return None


# --- Rate Limiting ---
async def rate_limit(
    request: Request,
    redis: Optional[aioredis.Redis] = Depends(get_redis),
):
    """Redis sliding window rate limiter — 100 requests per minute per IP. Skipped if Redis unavailable."""
    if redis is None:
        return  # Skip rate limiting if Redis is not available

    client_ip = request.client.host if request.client else "unknown"
    key = f"rate_limit:{client_ip}"
    window = 60  # seconds
    max_requests = 100

    current = await redis.get(key)
    if current and int(current) >= max_requests:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Max 100 requests per minute.",
        )
    
    pipe = redis.pipeline()
    pipe.incr(key)
    pipe.expire(key, window)
    await pipe.execute()
