import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Globe, ExternalLink, MoreVertical, Trash2, Settings, Play, Loader2, Wifi, WifiOff } from 'lucide-react'
import { useSites, useCreateSite, useDeleteSite, useTriggerCrawl } from '@/hooks/use-data'
import { formatRelativeTime } from '@/lib/utils'

export default function SitesPage() {
  const { data, isLoading } = useSites()
  const createSite = useCreateSite()
  const deleteSite = useDeleteSite()
  const triggerCrawl = useTriggerCrawl()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSite, setNewSite] = useState({ name: '', domain: '', connection_type: 'crawler' })
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const sites = data?.sites || []

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSite.mutateAsync(newSite)
      setShowAddModal(false)
      setNewSite({ name: '', domain: '', connection_type: 'crawler' })
    } catch (err) {
      console.error('Failed to add site:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--color-accent-emerald)'
      case 'crawling': return 'var(--color-accent-amber)'
      case 'error': return 'var(--color-severity-critical)'
      default: return 'var(--color-text-muted)'
    }
  }

  const connectionLabels: Record<string, string> = {
    crawler: 'Web Crawler',
    wordpress: 'WordPress',
    shopify: 'Shopify',
    webflow: 'Webflow',
    github: 'GitHub',
    snippet: 'JS Snippet',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Sites</h1>
          <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Manage and monitor your websites
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
          style={{ background: 'var(--color-brand)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-brand-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-brand)')}
        >
          <Plus className="w-4 h-4" />
          Add Site
        </button>
      </div>

      {/* Sites Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-brand)' }} />
        </div>
      ) : sites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 rounded-xl border"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
        >
          <Globe className="w-16 h-16 mb-4 opacity-20" style={{ color: 'var(--color-text-muted)' }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>No sites yet</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Add your first site to start monitoring its SEO health
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--color-brand)' }}
          >
            <Plus className="w-4 h-4" />
            Add Your First Site
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site: any, i: number) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-5 border transition-all duration-200 relative group"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-hover)'
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-brand-glow)' }}>
                    <Globe className="w-5 h-5" style={{ color: 'var(--color-brand-light)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{site.name}</h3>
                    <a href={site.domain} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {site.domain.replace('https://', '')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Menu */}
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === site.id ? null : site.id)}
                    className="p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    style={{ color: 'var(--color-text-muted)' }}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {menuOpen === site.id && (
                    <div className="absolute right-0 mt-1 w-40 rounded-lg border py-1 z-50"
                      style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-elevated)' }}>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onClick={() => { triggerCrawl.mutate(site.id); setMenuOpen(null) }}>
                        <Play className="w-4 h-4" /> Run Crawl
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}>
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors"
                        style={{ color: 'var(--color-severity-critical)' }}
                        onClick={() => { deleteSite.mutate(site.id); setMenuOpen(null) }}>
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status + Connection */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: getStatusColor(site.status) }} />
                  <span className="text-xs capitalize" style={{ color: 'var(--color-text-secondary)' }}>{site.status}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full border"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                  {connectionLabels[site.connection_type] || site.connection_type}
                </span>
              </div>

              {/* Last crawled */}
              {site.last_crawled_at && (
                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
                  Last crawled {formatRelativeTime(site.last_crawled_at)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Site Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl p-6 border"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-elevated)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Add New Site</h2>

              <form onSubmit={handleAddSite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Site Name</label>
                  <input type="text" value={newSite.name} onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                    placeholder="My Blog" required
                    className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none transition-all"
                    style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-brand)')} onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Domain</label>
                  <input type="text" value={newSite.domain} onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                    placeholder="example.com" required
                    className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none transition-all"
                    style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-brand)')} onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Connection Method</label>
                  <select value={newSite.connection_type} onChange={(e) => setNewSite({ ...newSite, connection_type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none transition-all"
                    style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}>
                    <option value="crawler">Web Crawler (default)</option>
                    <option value="wordpress">WordPress API</option>
                    <option value="shopify">Shopify API</option>
                    <option value="webflow">Webflow API</option>
                    <option value="github">GitHub App</option>
                    <option value="snippet">JS Snippet</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={createSite.isPending}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2"
                    style={{ background: 'var(--color-brand)' }}>
                    {createSite.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    {createSite.isPending ? 'Adding...' : 'Add Site'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
