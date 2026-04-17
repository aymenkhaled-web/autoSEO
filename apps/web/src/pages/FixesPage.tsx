import { motion } from 'framer-motion'
import { Wrench, Clock, CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react'

export default function FixesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Fixes</h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          AI-generated fix suggestions and their application history
        </p>
      </div>

      {/* Fix Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Review', count: 0, icon: Clock, color: 'var(--color-accent-amber)' },
          { label: 'Applied', count: 0, icon: CheckCircle2, color: 'var(--color-accent-emerald)' },
          { label: 'Rolled Back', count: 0, icon: RotateCcw, color: 'var(--color-severity-high)' },
          { label: 'AI Confidence Avg', count: '--', icon: Sparkles, color: 'var(--color-accent-violet)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-5 border"
            style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.count}</p>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Fix Queue - Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border overflow-hidden"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-elevated)' }}>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Fix Queue</h2>
          <div className="flex gap-2">
            {['All', 'Pending', 'Applied', 'Rolled Back'].map((tab) => (
              <button key={tab}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: tab === 'All' ? 'var(--color-brand-glow)' : 'transparent',
                  color: tab === 'All' ? 'var(--color-brand-light)' : 'var(--color-text-muted)',
                }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <Wrench className="w-16 h-16 mb-4 opacity-20" style={{ color: 'var(--color-text-muted)' }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>No fixes yet</h3>
          <p className="text-sm max-w-md text-center mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Once the AI analyzes your crawl results, fix suggestions will appear here with diff previews and one-click apply/rollback.
          </p>

          {/* How it works */}
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-brand-glow)', color: 'var(--color-brand-light)' }}>1</span>
              Crawl
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-brand-glow)', color: 'var(--color-brand-light)' }}>2</span>
              AI Analyzes
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-brand-glow)', color: 'var(--color-brand-light)' }}>3</span>
              You Review
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-brand-glow)', color: 'var(--color-brand-light)' }}>4</span>
              Auto-Apply
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
