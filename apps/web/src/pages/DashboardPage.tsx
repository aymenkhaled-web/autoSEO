import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import {
  Globe, Bug, Wrench, TrendingUp, ArrowUpRight,
  BarChart3, Clock, CheckCircle2, AlertTriangle, XCircle,
  ArrowRight, Sparkles, Activity, Zap
} from 'lucide-react'

const stats = [
  {
    label: 'Sites Monitored',
    value: '0',
    icon: Globe,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.12)',
    border: 'rgba(129,140,248,0.2)',
    change: null,
    href: '/sites',
  },
  {
    label: 'Issues Found',
    value: '0',
    icon: Bug,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.18)',
    change: null,
    href: '/issues',
  },
  {
    label: 'Fixes Applied',
    value: '0',
    icon: Wrench,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.18)',
    change: null,
    href: '/fixes',
  },
  {
    label: 'Avg SEO Score',
    value: '--',
    icon: TrendingUp,
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.18)',
    change: null,
    href: '/reports',
  },
]

const severities = [
  { label: 'Critical', count: 0, color: '#ef4444', icon: XCircle, bg: 'rgba(239,68,68,0.1)' },
  { label: 'High',     count: 0, color: '#f97316', icon: AlertTriangle, bg: 'rgba(249,115,22,0.08)' },
  { label: 'Medium',   count: 0, color: '#eab308', icon: AlertTriangle, bg: 'rgba(234,179,8,0.08)' },
  { label: 'Low',      count: 0, color: '#22c55e', icon: CheckCircle2, bg: 'rgba(34,197,94,0.08)' },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.34, 1.2, 0.64, 1] }}
    >
      <Link to={stat.href} className="block">
        <div className="rounded-2xl p-5 border relative overflow-hidden group cursor-pointer transition-all duration-200"
          style={{
            background: `linear-gradient(145deg, ${stat.bg}, var(--color-bg-card))`,
            borderColor: stat.border,
            boxShadow: 'var(--shadow-card)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
            e.currentTarget.style.boxShadow = `0 0 0 1px ${stat.border}, 0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${stat.color}15`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = 'var(--shadow-card)'
          }}
        >
          {/* Corner glow */}
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${stat.color}20, transparent 70%)` }} />

          {/* Top beam */}
          <div className="absolute top-0 left-4 right-4 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${stat.color}40, transparent)` }} />

          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center relative"
              style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: stat.color }} />
          </div>

          <p className="text-3xl font-black mb-1 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            {stat.value}
          </p>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {stat.label}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function DashboardPage() {
  const periods = ['30d', '90d', '1y']

  return (
    <div className="space-y-6 max-w-full">

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Your SEO command center — all sites at a glance
          </p>
        </div>
        <Link to="/sites"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 20px rgba(99,102,241,0.35)' }}>
          <Zap className="w-4 h-4" />
          Add Site
        </Link>
      </motion.div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Score Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="lg:col-span-2 rounded-2xl border overflow-hidden"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card)' }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.2)' }}>
                <Activity className="w-4 h-4" style={{ color: '#818cf8' }} />
              </div>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>SEO Score Trend</h2>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Score history over time</p>
              </div>
            </div>
            <div className="flex gap-1">
              {periods.map((period, i) => (
                <button key={period}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                  style={{
                    background: i === 0 ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: i === 0 ? 'var(--color-brand-light)' : 'var(--color-text-muted)',
                    border: i === 0 ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                  }}>
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-20 px-6">
            {/* Decorative empty chart */}
            <div className="relative w-48 h-24 mb-6">
              <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[20, 40, 60].map((y) => (
                  <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
                ))}
                {/* Fake chart area */}
                <path d="M0 70 Q40 55 60 60 Q90 65 120 45 Q150 30 180 35 L200 38 L200 80 L0 80 Z"
                  fill="url(#chartGrad)" />
                <path d="M0 70 Q40 55 60 60 Q90 65 120 45 Q150 30 180 35 L200 38"
                  stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                  <BarChart3 className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>No data yet</p>
            <p className="text-xs text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              Add a site and run your first crawl to see score trends over time
            </p>
            <Link to="/sites"
              className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              Add your first site <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.42 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.18)' }}>
              <Clock className="w-4 h-4" style={{ color: '#34d399' }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h2>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Latest events</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-14 px-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
              <Sparkles className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>All quiet here</p>
            <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
              Activity will appear once you start your first crawl
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Issue Breakdown ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl border overflow-hidden"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.18)' }}>
            <Bug className="w-4 h-4" style={{ color: '#f97316' }} />
          </div>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Issue Breakdown</h2>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>By severity level</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'var(--color-border)' }}>
          {severities.map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center py-6 gap-2 transition-colors duration-150 cursor-default"
              style={{ background: 'var(--color-bg-card)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = item.bg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-bg-card)')}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: item.bg, border: `1px solid ${item.color}25` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{item.count}</p>
              <p className="text-xs font-medium" style={{ color: item.color }}>{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Onboarding CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.58 }}
        className="rounded-2xl p-6 border relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.05))',
          borderColor: 'rgba(99,102,241,0.25)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(34,211,238,0.3), transparent)' }} />
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)' }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
            <Zap className="w-6 h-6" style={{ color: '#818cf8' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
              Ready to start? Add your first site
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Connect via web crawler, WordPress, Shopify, Webflow, GitHub, or JS snippet. First crawl is instant.
            </p>
          </div>
          <Link to="/sites"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
