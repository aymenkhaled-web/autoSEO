"""AutoSEO API — FastAPI application entry point."""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import structlog
import sentry_sdk

from config import get_settings
from models.database import engine

settings = get_settings()

# --- Sentry (only if DSN is configured) ---
if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        traces_sample_rate=0.1,
        environment=settings.ENVIRONMENT,
    )

# --- Structured Logging ---
structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.StackInfoRenderer(),
        structlog.dev.ConsoleRenderer() if settings.DEBUG else structlog.processors.JSONRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(0),
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()


# --- Lifespan ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    logger.info("AutoSEO API starting", environment=settings.ENVIRONMENT)
    yield
    logger.info("AutoSEO API shutting down")
    await engine.dispose()


# --- App ---
app = FastAPI(
    title="AutoSEO API",
    version="1.0.0",
    description="Autonomous SEO Agent — Crawl, Analyze, Fix",
    lifespan=lifespan,
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Import and register routers ---
from routers.auth import router as auth_router
from routers.sites import router as sites_router
from routers.crawls import router as crawls_router
from routers.issues import router as issues_router
from routers.fixes import router as fixes_router
from routers.snippet import router as snippet_router
from routers.webhooks import router as webhooks_router

app.include_router(auth_router, prefix="/auth")
app.include_router(sites_router, prefix="/sites")
app.include_router(crawls_router, prefix="/crawls")
app.include_router(issues_router, prefix="/issues")
app.include_router(fixes_router, prefix="/fixes")
app.include_router(snippet_router, prefix="/snippet")
app.include_router(webhooks_router, prefix="/webhooks")


# --- Health Check ---
@app.get("/health", tags=["system"])
async def health():
    """Health check endpoint for monitoring."""
    return {"status": "ok", "version": "1.0.0", "environment": settings.ENVIRONMENT}


@app.get("/", tags=["system"])
async def root():
    """API root — redirects to docs."""
    return {
        "name": "AutoSEO API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }
