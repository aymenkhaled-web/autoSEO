# AutoSEO — Autonomous SEO Agent

## Overview
AutoSEO is an autonomous SEO platform that crawls websites, analyzes them for SEO issues, and automatically generates/applies fixes. It includes a dashboard for managing sites, viewing crawl results, and tracking SEO health.

## Project Structure
- `apps/web/` — React 19 + TypeScript frontend (Vite, Tailwind CSS, TanStack Query, Supabase Auth)
- `apps/api/` — FastAPI Python backend (SQLAlchemy async, Pydantic, Celery)
- `packages/` — Shared Python packages: ai_engine, cms_adapters, crawler, shared
- `workers/` — Celery worker tasks (crawl, fix, report)
- `supabase/` — Database migrations and seed data
- `infra/` — Docker/Railway deployment configs

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, React Router v7, Zustand, Supabase JS
- **Backend**: FastAPI, SQLAlchemy (async), asyncpg, Alembic, Celery + Redis
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth

## Development Setup

### Frontend (runs on port 5000)
```bash
cd apps/web && npm install && npm run dev
```

### Backend (runs on port 8000)
Requires PostgreSQL and Redis. Set environment variables in `.env` at project root.
```bash
cd apps/api && pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Environment Variables Required
- `DATABASE_URL` — PostgreSQL async URL
- `DATABASE_URL_SYNC` — PostgreSQL sync URL
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `REDIS_URL` — Redis connection URL
- `ANTHROPIC_API_KEY` — For AI SEO analysis
- `STRIPE_SECRET_KEY` — For billing
- `FRONTEND_URL` — Frontend URL (for CORS)

## Workflows
- **Start application**: `cd apps/web && npm run dev` — Frontend dev server on port 5000

## Deployment
- Configured as static site: build `apps/web`, serve from `apps/web/dist`
- The backend (FastAPI) requires separate hosting with Redis and PostgreSQL
