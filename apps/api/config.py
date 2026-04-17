"""AutoSEO API Configuration — reads from environment variables."""
from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache


class Settings(BaseSettings):
    # --- Database ---
    DATABASE_URL: str = "postgresql+asyncpg://autoseo:devpassword@localhost:5432/autoseo_dev"
    DATABASE_URL_SYNC: str = "postgresql://autoseo:devpassword@localhost:5432/autoseo_dev"

    # --- Supabase ---
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = "super-secret-jwt-token-for-local-dev-minimum-32-chars-long!!"

    # --- Redis ---
    REDIS_URL: str = "redis://localhost:6379/0"

    # --- Stripe ---
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_STARTER_PRICE_ID: str = "price_starter"
    STRIPE_PRO_PRICE_ID: str = "price_pro"
    STRIPE_AGENCY_PRICE_ID: str = "price_agency"

    # --- Anthropic ---
    ANTHROPIC_API_KEY: str = ""

    # --- Cloudflare R2 ---
    CLOUDFLARE_R2_ACCESS_KEY: str = ""
    CLOUDFLARE_R2_SECRET_KEY: str = ""
    CLOUDFLARE_R2_BUCKET: str = "autoseo-storage"
    CLOUDFLARE_R2_ENDPOINT: str = ""

    # --- Encryption ---
    DOPPLER_MASTER_ENCRYPTION_KEY: str = ""

    # --- ScrapFly ---
    SCRAPFLY_API_KEY: str = ""

    # --- Resend ---
    RESEND_API_KEY: str = ""

    # --- Sentry ---
    SENTRY_DSN: str = ""

    # --- GitHub App ---
    GITHUB_APP_ID: str = ""
    GITHUB_APP_PRIVATE_KEY: str = ""

    # --- App ---
    FRONTEND_URL: str = "http://localhost:5173"
    API_URL: str = "http://localhost:8000"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    model_config = {"env_file": "../../.env", "env_file_encoding": "utf-8", "extra": "ignore"}


@lru_cache
def get_settings() -> Settings:
    return Settings()
