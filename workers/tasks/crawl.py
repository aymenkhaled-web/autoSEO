"""Crawl tasks — Phase 2 implementation.

These are stub tasks that will be fully implemented in Phase 2 (Smart Crawler).
"""
from workers.celery_app import app
import structlog

logger = structlog.get_logger()


@app.task(bind=True, max_retries=3)
def run_site_crawl(self, site_id: str, crawl_id: str):
    """Run a full site crawl with the 4-layer crawler architecture.
    
    Phase 2 will implement:
    1. robots.txt compliance check
    2. Sitemap URL seeding
    3. Layer selection (CMS API → Jina → Crawl4AI → ScrapFly)
    4. SEO signal extraction
    5. Duplicate content detection
    6. Internal link analysis
    7. Issue generation
    8. Score calculation
    """
    logger.info("crawl_task_started", site_id=site_id, crawl_id=crawl_id)
    # TODO: Phase 2 implementation
    logger.info("crawl_task_stub_completed", site_id=site_id, crawl_id=crawl_id)


@app.task
def run_scheduled_crawls():
    """Run scheduled crawls for all sites due for re-crawl.
    
    Called daily by Celery Beat. Checks each site's crawl_frequency
    and last_crawled_at to determine if a new crawl should be triggered.
    """
    logger.info("scheduled_crawls_check")
    # TODO: Phase 2 implementation


@app.task
def refresh_expiring_tokens():
    """Refresh OAuth tokens that are about to expire.
    
    Called daily by Celery Beat. Checks CMS tokens with upcoming
    expiration and refreshes them.
    """
    logger.info("token_refresh_check")
    # TODO: Phase 4 implementation
