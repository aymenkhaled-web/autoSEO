import { motion } from 'framer-motion'
import {
  Globe, Bug, Wrench, TrendingUp, ArrowUpRight,
  BarChart3, Clock, CheckCircle2, AlertTriangle, XCircle
} from 'lucide-react'

// Mock data for initial build
const stats = [
  { label: 'Sites Monitored', value: '0', icon: Globe, color: 'var(--color-brand-light)', change: null },
  { label: 'Issues Found', value: '0', icon: Bug, color: 'var(--color-severity-high)', change: null },
  { label: 'Fixes Applied', value: '0', icon: Wrench, color: 'var(--color-accent-emerald)', change: null },
  { label: 'Avg SEO Score', value: '--', icon: TrendingUp, color: 'var(--color-accent-cyan)', change: null },
]

const recentActivity: any[] = []

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Dashboard</h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Overview of your SEO performance across all sites
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-5 border transition-all duration-200 cursor-default"
            style={{
              background: 'var(--color-bg-card)',
              borderColor: 'var(--color-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-hover)'
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              {stat.change && (
                <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: 'var(--color-accent-emerald)' }}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {stat.value}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-xl p-6 border"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>SEO Score Trend</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Score history over time</p>
            </div>
            <div className="flex gap-2">
              {['30d', '90d', '1y'].map((period) => (
                <button
                  key={period}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: period === '30d' ? 'var(--color-brand-glow)' : 'transparent',
                    color: period === '30d' ? 'var(--color-brand-light)' : 'var(--color-text-muted)',
                    border: `1px solid ${period === '30d' ? 'rgba(99, 102, 241, 0.2)' : 'transparent'}`,
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16" style={{ color: 'var(--color-text-muted)' }}>
            <BarChart3 className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs mt-1">Add a site and run your first crawl to see score trends</p>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-6 border"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h2>

          {recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12" style={{ color: 'var(--color-text-muted)' }}>
              <Clock className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--color-bg-elevated)' }}>
                  <div className="mt-0.5">
                    {activity.type === 'crawl' && <Globe className="w-4 h-4" style={{ color: 'var(--color-brand-light)' }} />}
                    {activity.type === 'fix' && <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-accent-emerald)' }} />}
                    {activity.type === 'issue' && <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-severity-high)' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>{activity.message}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Issue Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl p-6 border"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Issue Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Critical', count: 0, color: 'var(--color-severity-critical)', icon: XCircle },
            { label: 'High', count: 0, color: 'var(--color-severity-high)', icon: AlertTriangle },
            { label: 'Medium', count: 0, color: 'var(--color-severity-medium)', icon: AlertTriangle },
            { label: 'Low', count: 0, color: 'var(--color-severity-low)', icon: CheckCircle2 },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-4 rounded-lg border"
              style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
              <div>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.count}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
