# AutoSEO — Autonomous SEO Agent

## Overview
AutoSEO is an autonomous SEO platform that crawls websites, analyzes them for SEO issues with Claude AI, and automatically applies fixes directly to your CMS. Fully redesigned with a premium dark 3D UI/UX design system.

## Current State (April 2026)

### What's Built (Frontend)
- **Landing page** (`/`) — 3D animated hero orb, feature grid, pricing cards, stats, how-it-works section, footer
- **Login page** (`/login`) — Split panel layout, Google OAuth, email/password form
- **Signup page** (`/signup`) — Split panel with benefits list
- **Dashboard** (`/dashboard`) — Stat cards, SEO trend chart, activity feed, issue breakdown, onboarding CTA
- **Sites page** (`/sites`) — Site grid, add-site modal with connection type selector
- **Issues page** (`/issues`) — Filter bar, sortable table (ready for real data)
- **Fixes page** (`/fixes`) — Fix list UI
- **Settings page** (`/settings`) — User/org settings
- **Dashboard layout** — Collapsible glass sidebar, top search bar with ⌘K, plan badge, notification bell

### What's Built (Backend scaffolding)
- FastAPI app structure with routers: auth, sites, crawls, issues, fixes, snippet, webhooks
- SQLAlchemy async models, Pydantic schemas, dependencies
- Celery worker tasks for crawl, fix, report
- 4-layer crawler packages: ai_engine, cms_adapters, crawler, shared

### What's NOT Built Yet (Priority Order)
1. **Supabase connection** — env vars not set, auth is mocked, no real DB
2. **Backend runtime** — PostgreSQL + Redis required, not running in Replit
3. **Real crawl engine** — Crawl4AI, Camoufox, ScrapFly not integrated
4. **AI analysis** — Anthropic API not connected
5. **CMS integrations** — WordPress, Shopify, Webflow, GitHub app flows
6. **Onboarding wizard** — Add site → connect CMS → first crawl flow
7. **Real-time crawl progress** — SSE connection for live updates
8. **PDF reports** — @react-pdf/renderer not installed
9. **API key management UI** — Settings page placeholder
10. **Stripe billing** — Subscription enforcement not implemented
11. **JS snippet** — Collector endpoint + embeddable script

## Design System (v2 — Premium Dark)

### Color Palette
- Background: `#040712` (base) → `#070d1f` (primary) → `#0c1428` (secondary) → `#0f1a30` (card)
- Brand: `#6366f1` (indigo) with `#22d3ee` (cyan) accent
- Text: `#f0f4ff` (primary) / `#8b9fc4` (secondary) / `#4d6080` (muted)
- Borders: `rgba(99,102,241,0.12)` → `rgba(99,102,241,0.28)` on hover

### Key CSS Classes
- `.glass` / `.glass-heavy` — backdrop blur glassmorphism panels
- `.gradient-text` — indigo→cyan gradient text
- `.gradient-text-warm` — pink→indigo→cyan
- `.gradient-border` — animated gradient border using CSS mask
- `.card-3d` — 3D perspective hover transform
- `.mesh-bg` — multi-radial ambient glow background
- `.grid-pattern-animated` — animated scrolling grid for hero
- `.dot-pattern` — subtle dot grid for section backgrounds
- `.separator-beam` — horizontal gradient separator line
- `.skeleton` — loading shimmer

## Architecture Decisions (Final)
| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite 8 + TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| State | Zustand + TanStack Query |
| Auth | Supabase JS |
| Backend | FastAPI + SQLAlchemy async |
| Queue | Celery + Redis |
| DB | Supabase (PostgreSQL 15 + RLS) |
| Payments | Stripe |
| AI | Anthropic Claude |
| Crawler | Crawl4AI + Camoufox + ScrapFly |

## Gap Analysis — What the Plan Missed

### Critical gaps vs original plan:
1. **No multi-tenant org structure wired up** — JWT claims with org_id not implemented
2. **No Doppler** — secrets just use env vars locally, fine for now
3. **Voyage AI embeddings** — duplicate content detection not mentioned in roadmap clearly
4. **Crawl4AI + Camoufox** — listed but the actual Python packages aren't installed
5. **Google Search Console integration** — in schema but no OAuth flow planned in phases
6. **Hreflang validation** — in DB schema but not in issue types list
7. **Stripe enforcement** — plan limits should block crawls past quota, not implemented
8. **Fix verification** — re-crawl after CMS write to confirm fix applied, critical for trust

### Good decisions in the plan:
- 4-layer crawler with fallback is correct architecture
- RLS from day one is right
- Append-only change_log is essential for agency trust
- JS snippet for client-side monitoring is differentiator

## Dev Workflow

### Frontend (port 5000)
```bash
cd apps/web && npm run dev
```

### Environment Variables Required
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key
- `DATABASE_URL` — PostgreSQL async connection string
- `SUPABASE_SERVICE_ROLE_KEY` — For server-side operations
- `ANTHROPIC_API_KEY` — Claude API key
- `REDIS_URL` — Redis connection URL
- `STRIPE_SECRET_KEY` — Stripe billing

## Deployment
- Configured as static site: build `apps/web`, serve from `apps/web/dist`
- Backend (FastAPI + workers) requires separate hosting: Railway recommended
