import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import {
  Globe, Bug, Wrench, TrendingUp, ArrowUpRight,
  BarChart3, Clock, CheckCircle2, AlertTriangle, XCircle,
  ArrowRight, Sparkles, Activity, Zap, Plus
} from 'lucide-react'

const stats = [
  { label: 'Sites Monitored', value: '0', icon: Globe,     color: '#818cf8', href: '/sites' },
  { label: 'Issues Found',    value: '0', icon: Bug,       color: '#f97316', href: '/issues' },
  { label: 'Fixes Applied',   value: '0', icon: Wrench,    color: '#34d399', href: '/fixes' },
  { label: 'Avg SEO Score',   value: '—', icon: TrendingUp,color: '#22d3ee', href: '/reports' },
]

const severities = [
  { label: 'Critical', count: 0, color: '#ef4444', icon: XCircle },
  { label: 'High',     count: 0, color: '#f97316', icon: AlertTriangle },
  { label: 'Medium',   count: 0, color: '#eab308', icon: AlertTriangle },
  { label: 'Low',      count: 0, color: '#22c55e', icon: CheckCircle2 },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}>
      <Link to={stat.href} className="block group">
        <div className="stat-card transition-all duration-200 group-hover:border-white/[0.12]"
          style={{ cursor: 'pointer' }}>
          <div className="flex items-start justify-between mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${stat.color}16`, border: `1px solid ${stat.color}28` }}>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ color: 'var(--text-3)' }} />
          </div>
          <p className="text-3xl font-black tracking-tight mb-1" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
            {stat.value}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>{stat.label}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState('30d')
  const periods = ['30d', '90d', '1y']

  return (
    <div className="space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-3)' }}>Your SEO command center</p>
        </div>
        <Link to="/sites" className="btn btn-primary" style={{ gap: '6px', padding: '8px 16px', fontSize: '13px' }}>
          <Plus className="w-3.5 h-3.5" />
          Add Site
        </Link>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

        {/* Score chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="lg:col-span-2 card">

          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.2)' }}>
                <Activity className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
              </div>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>SEO Score Trend</h2>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Score history over time</p>
              </div>
            </div>
            <div className="flex gap-0.5 p-0.5 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              {periods.map((p) => (
                <button key={p} onClick={() => setActivePeriod(p)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-100"
                  style={activePeriod === p
                    ? { background: 'var(--bg-overlay)', color: 'var(--text-1)' }
                    : { color: 'var(--text-3)' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-16 px-6">
            <svg viewBox="0 0 320 100" fill="none" className="w-64 h-20 mb-5 opacity-30">
              <defs>
                <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              ))}
              <path d="M0 85 Q60 75 90 78 Q140 84 180 62 Q230 42 270 48 L320 45 L320 100 L0 100 Z" fill="url(#cg)" />
              <path d="M0 85 Q60 75 90 78 Q140 84 180 62 Q230 42 270 48 L320 45"
                stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
            </svg>
            <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text-1)' }}>No data yet</p>
            <p className="text-xs text-center" style={{ color: 'var(--text-3)', maxWidth: 260 }}>
              Add a site and run your first crawl to see SEO score trends over time
            </p>
            <Link to="/sites" className="btn btn-primary mt-5" style={{ fontSize: '13px', padding: '8px 18px' }}>
              Add your first site <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.38 }}
          className="card">

          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <Clock className="w-3.5 h-3.5" style={{ color: '#34d399' }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Activity</h2>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>Latest events</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-14 px-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--text-3)' }} />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>All quiet</p>
            <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
              Events appear after your first crawl
            </p>
          </div>
        </motion.div>
      </div>

      {/* Issue breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.44 }}
        className="card">

        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
            <Bug className="w-3.5 h-3.5" style={{ color: '#f97316' }} />
          </div>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Issue Breakdown</h2>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>By severity</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {severities.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-8 gap-3 transition-colors duration-150 cursor-default"
              style={{ borderRight: i < 3 ? `1px solid var(--border)` : 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${s.color}06`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}14`, border: `1px solid ${s.color}22` }}>
                <s.icon className="w-4.5 h-4.5" style={{ color: s.color, width: 18, height: 18 }} />
              </div>
              <p className="text-2xl font-black" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>{s.count}</p>
              <p className="text-xs font-semibold" style={{ color: s.color }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Onboarding CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.5 }}
        className="rounded-2xl p-6 border relative overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderColor: 'rgba(99,102,241,0.3)' }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 80% at 100% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--brand-dim)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <Zap className="w-5 h-5" style={{ color: '#818cf8' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-1)' }}>
              Add your first site to get started
            </p>
            <p className="text-xs" style={{ color: 'var(--text-2)' }}>
              Connect via crawler, WordPress, Shopify, Webflow, GitHub, or JS snippet. First crawl is instant.
            </p>
          </div>
          <Link to="/sites" className="btn btn-primary flex-shrink-0" style={{ padding: '10px 20px', fontSize: '13px' }}>
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
