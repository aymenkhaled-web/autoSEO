import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bug, Filter, ChevronDown, ExternalLink, AlertTriangle,
  XCircle, Info, CheckCircle2, Loader2, ArrowUpDown
} from 'lucide-react'

// Mock empty state — will be connected to API in Phase 2
const mockIssues: any[] = []

const severityConfig: Record<string, { color: string; icon: any; label: string }> = {
  critical: { color: 'var(--color-severity-critical)', icon: XCircle, label: 'Critical' },
  high: { color: 'var(--color-severity-high)', icon: AlertTriangle, label: 'High' },
  medium: { color: 'var(--color-severity-medium)', icon: AlertTriangle, label: 'Medium' },
  low: { color: 'var(--color-severity-low)', icon: Info, label: 'Low' },
  info: { color: 'var(--color-severity-info)', icon: Info, label: 'Info' },
}

const categoryLabels: Record<string, string> = {
  meta: 'Meta Tags',
  headings: 'Headings',
  images: 'Images',
  links: 'Links',
  schema: 'Schema',
  performance: 'Performance',
  social: 'Social',
  content: 'Content',
  technical: 'Technical',
}

export default function IssuesPage() {
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const issues = mockIssues

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Issues</h1>
          <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            SEO issues found across your sites, sorted by impact
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all"
          style={{
            borderColor: showFilters ? 'var(--color-brand)' : 'var(--color-border)',
            color: showFilters ? 'var(--color-brand-light)' : 'var(--color-text-secondary)',
            background: showFilters ? 'var(--color-brand-glow)' : 'transparent',
          }}
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Bar */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-3 p-4 rounded-xl border"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
        >
          {/* Severity */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Severity</label>
            <select
              value={filterSeverity || ''}
              onChange={(e) => setFilterSeverity(e.target.value || null)}
              className="px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
            >
              <option value="">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Category</label>
            <select
              value={filterCategory || ''}
              onChange={(e) => setFilterCategory(e.target.value || null)}
              className="px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
            >
              <option value="">All</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Fix Status</label>
            <select
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="px-3 py-2 rounded-lg text-sm border outline-none"
              style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="auto_fixable">Auto-Fixable</option>
              <option value="applied">Applied</option>
              <option value="rolled_back">Rolled Back</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(filterSeverity || filterCategory || filterStatus) && (
            <div className="flex items-end">
              <button
                onClick={() => { setFilterSeverity(null); setFilterCategory(null); setFilterStatus(null) }}
                className="px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: 'var(--color-brand-light)' }}
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Issues Table */}
      {issues.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 rounded-xl border"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
        >
          <Bug className="w-16 h-16 mb-4 opacity-20" style={{ color: 'var(--color-text-muted)' }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>No issues found</h3>
          <p className="text-sm max-w-md text-center" style={{ color: 'var(--color-text-muted)' }}>
            Run a crawl on one of your sites to discover SEO issues. Issues will appear here sorted by impact score.
          </p>
        </motion.div>
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
          {/* Table Header */}
          <div
            className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-medium uppercase tracking-wider border-b"
            style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)', background: 'var(--color-bg-elevated)' }}
          >
            <div className="col-span-1 flex items-center gap-1 cursor-pointer">
              Severity <ArrowUpDown className="w-3 h-3" />
            </div>
            <div className="col-span-3">Issue</div>
            <div className="col-span-3">Page</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1 flex items-center gap-1 cursor-pointer">
              Impact <ArrowUpDown className="w-3 h-3" />
            </div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Fix</div>
          </div>

          {/* Table Rows */}
          {issues.map((issue: any, i: number) => {
            const sev = severityConfig[issue.severity] || severityConfig.info
            const SevIcon = sev.icon
            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-12 gap-4 px-5 py-3.5 border-b items-center transition-colors cursor-pointer"
                style={{ borderColor: 'var(--color-border)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-elevated)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="col-span-1">
                  <span className="flex items-center gap-1.5">
                    <SevIcon className="w-4 h-4" style={{ color: sev.color }} />
                    <span className="text-xs font-medium" style={{ color: sev.color }}>{sev.label}</span>
                  </span>
                </div>
                <div className="col-span-3">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{issue.type}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>{issue.current_value}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm truncate" style={{ color: 'var(--color-text-secondary)' }}>{issue.page_url || '—'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs px-2 py-1 rounded-full border"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                    {categoryLabels[issue.category] || issue.category}
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{issue.impact_score}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs capitalize" style={{ color: issue.fix_status === 'applied' ? 'var(--color-accent-emerald)' : 'var(--color-text-muted)' }}>
                    {issue.fix_status}
                  </span>
                </div>
                <div className="col-span-1">
                  {issue.fix_type === 'auto' && issue.ai_confidence > 0.7 ? (
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--color-brand-glow)', color: 'var(--color-brand-light)' }}>
                      Auto-fix
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Manual</span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
