"""Auth router — registration, login info, user profile."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import uuid
import re

from dependencies import get_db, get_current_user
from schemas.auth import RegisterRequest, UserResponse, OrgResponse, AuthContext
from models.tables import Organization, User

router = APIRouter(tags=["auth"])


def slugify(text: str) -> str:
    """Convert text to URL-safe slug."""
    slug = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[-\s]+", "-", slug).strip("-")


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """Register a new user and create their organization.
    
    Note: In production, the actual user creation happens in Supabase Auth.
    This endpoint creates the corresponding org and user record in our DB.
    The frontend calls Supabase Auth first, then this endpoint with the
    Supabase user ID.
    """
    # Check if email already exists
    existing = await db.execute(
        select(User).where(User.email == data.email)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    # Create organization
    slug = slugify(data.org_name)
    # Ensure unique slug
    slug_check = await db.execute(
        select(Organization).where(Organization.slug == slug)
    )
    if slug_check.scalar_one_or_none():
        slug = f"{slug}-{str(uuid.uuid4())[:8]}"

    org = Organization(
        name=data.org_name,
        slug=slug,
        plan="starter",
    )
    db.add(org)
    await db.flush()  # Get org.id

    # Create user
    user = User(
        id=uuid.uuid4(),  # In production, this comes from Supabase auth.users
        org_id=org.id,
        role="owner",
        email=data.email,
        full_name=data.full_name,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


@router.get("/me", response_model=UserResponse)
async def get_me(
    auth: AuthContext = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current authenticated user's profile."""
    result = await db.execute(
        select(User).where(User.id == auth.user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user


@router.get("/org", response_model=OrgResponse)
async def get_my_org(
    auth: AuthContext = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current user's organization."""
    result = await db.execute(
        select(Organization).where(Organization.id == auth.org_id)
    )
    org = result.scalar_one_or_none()
    if not org:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )
    return org
