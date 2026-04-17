"""SQLAlchemy models for all AutoSEO database tables."""
import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, SmallInteger, BigInteger,
    Numeric, ForeignKey, ARRAY, DateTime, Index
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from models.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    slug = Column(Text, unique=True, nullable=False)
    plan = Column(Text, nullable=False, default="starter")
    stripe_customer_id = Column(Text)
    stripe_subscription_id = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    users = relationship("User", back_populates="organization")
    sites = relationship("Site", back_populates="organization")


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"))
    role = Column(Text, nullable=False, default="member")
    email = Column(Text, nullable=False)
    full_name = Column(Text)
    avatar_url = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    organization = relationship("Organization", back_populates="users")


class Site(Base):
    __tablename__ = "sites"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(Text, nullable=False)
    domain = Column(Text, nullable=False)
    connection_type = Column(Text, nullable=False, default="crawler")
    cms_token_encrypted = Column(Text)
    cms_token_iv = Column(Text)
    cms_endpoint = Column(Text)
    github_installation_id = Column(BigInteger)
    github_repo = Column(Text)
    github_branch = Column(Text, default="main")
    snippet_token = Column(UUID(as_uuid=True), default=uuid.uuid4)
    gsc_property_url = Column(Text)
    gsc_token_encrypted = Column(Text)
    crawl_frequency = Column(Text, default="weekly")
    crawl_max_pages = Column(Integer, default=500)
    respect_robots_txt = Column(Boolean, default=True)
    crawl_delay_ms = Column(Integer, default=1000)
    status = Column(Text, default="pending")
    last_crawled_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    organization = relationship("Organization", back_populates="sites")
    crawls = relationship("Crawl", back_populates="site")


class Crawl(Base):
    __tablename__ = "crawls"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(UUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    status = Column(Text, default="queued")
    trigger = Column(Text, default="scheduled")
    pages_crawled = Column(Integer, default=0)
    pages_total = Column(Integer)
    issues_found = Column(Integer, default=0)
    seo_score = Column(SmallInteger)
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    duration_ms = Column(Integer)
    error_message = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    site = relationship("Site", back_populates="crawls")
    pages = relationship("Page", back_populates="crawl")
    issues = relationship("Issue", back_populates="crawl")

    __table_args__ = (
        Index("idx_crawls_site_id", "site_id"),
        Index("idx_crawls_org_id", "org_id"),
    )


class Page(Base):
    __tablename__ = "pages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    crawl_id = Column(UUID(as_uuid=True), ForeignKey("crawls.id"), nullable=False)
    site_id = Column(UUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    url = Column(Text, nullable=False)
    status_code = Column(SmallInteger)
    redirect_url = Column(Text)
    redirect_chain = Column(JSONB)
    crawl_depth = Column(SmallInteger)
    response_time_ms = Column(Integer)
    title = Column(Text)
    title_length = Column(SmallInteger)
    meta_description = Column(Text)
    meta_description_length = Column(SmallInteger)
    canonical_url = Column(Text)
    canonical_chain = Column(JSONB)
    robots_directive = Column(Text)
    h1_count = Column(SmallInteger)
    h1_text = Column(ARRAY(Text))
    h2_count = Column(SmallInteger)
    h3_count = Column(SmallInteger)
    heading_structure = Column(JSONB)
    word_count = Column(Integer)
    content_hash = Column(Text)
    internal_links_count = Column(Integer)
    external_links_count = Column(Integer)
    broken_links_count = Column(Integer)
    incoming_links_count = Column(Integer)
    images_count = Column(Integer)
    images_missing_alt = Column(Integer)
    images_large = Column(Integer)
    og_title = Column(Text)
    og_description = Column(Text)
    og_image = Column(Text)
    twitter_card = Column(Text)
    schema_types = Column(ARRAY(Text))
    schema_valid = Column(Boolean)
    schema_errors = Column(JSONB)
    lcp_ms = Column(Integer)
    fid_ms = Column(Integer)
    cls_score = Column(Numeric(4, 3))
    ttfb_ms = Column(Integer)
    performance_score = Column(SmallInteger)
    hreflang_tags = Column(JSONB)
    hreflang_errors = Column(ARRAY(Text))
    seo_score = Column(SmallInteger)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    crawl = relationship("Crawl", back_populates="pages")
    issues = relationship("Issue", back_populates="page")

    __table_args__ = (
        Index("idx_pages_crawl_id", "crawl_id"),
        Index("idx_pages_site_id", "site_id"),
        Index("idx_pages_org_id", "org_id"),
    )


class Issue(Base):
    __tablename__ = "issues"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    crawl_id = Column(UUID(as_uuid=True), ForeignKey("crawls.id"), nullable=False)
    site_id = Column(UUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    page_id = Column(UUID(as_uuid=True), ForeignKey("pages.id"))
    type = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    severity = Column(Text, nullable=False)
    impact_score = Column(SmallInteger, nullable=False)
    current_value = Column(Text)
    fix_type = Column(Text, nullable=False, default="manual")
    fix_status = Column(Text, default="pending")
    proposed_fix = Column(Text)
    proposed_fix_metadata = Column(JSONB)
    ai_confidence = Column(Numeric(3, 2))
    applied_at = Column(DateTime(timezone=True))
    applied_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    verified_at = Column(DateTime(timezone=True))
    verified_score = Column(SmallInteger)
    rollback_value = Column(Text)
    rolled_back_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    crawl = relationship("Crawl", back_populates="issues")
    page = relationship("Page", back_populates="issues")

    __table_args__ = (
        Index("idx_issues_site_id", "site_id"),
        Index("idx_issues_org_id", "org_id"),
        Index("idx_issues_fix_status", "fix_status"),
        Index("idx_issues_site_status", "site_id", "fix_status"),
    )


class ChangeLog(Base):
    __tablename__ = "change_log"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    site_id = Column(UUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    issue_id = Column(UUID(as_uuid=True), ForeignKey("issues.id"))
    action = Column(Text, nullable=False)
    actor_type = Column(Text, nullable=False)
    actor_id = Column(UUID(as_uuid=True))
    old_value = Column(Text)
    new_value = Column(Text)
    metadata = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (
        Index("idx_change_log_site_id", "site_id"),
    )


class SnippetEvent(Base):
    __tablename__ = "snippet_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site_id = Column(UUID(as_uuid=True), ForeignKey("sites.id"), nullable=False)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    page_url = Column(Text, nullable=False)
    title = Column(Text)
    meta_description = Column(Text)
    canonical_url = Column(Text)
    h1_text = Column(Text)
    schema_json = Column(Text)
    lcp_ms = Column(Integer)
    cls_score = Column(Numeric(4, 3))
    ttfb_ms = Column(Integer)
    user_agent = Column(Text)
    viewport_width = Column(SmallInteger)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (
        Index("idx_snippet_events_site_id", "site_id", "created_at"),
    )


class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(Text, nullable=False)
    key_hash = Column(Text, nullable=False, unique=True)
    key_prefix = Column(Text, nullable=False)
    scopes = Column(ARRAY(Text), nullable=False)
    last_used_at = Column(DateTime(timezone=True))
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
