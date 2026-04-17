import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Globe, Bug, Wrench, BarChart3,
  Settings, LogOut, ChevronLeft, ChevronRight, Search,
  Zap, Bell, Command, Layers
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useAppStore } from '@/stores/app-store'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#818cf8' },
  { path: '/sites',     icon: Globe,           label: 'Sites',     color: '#22d3ee' },
  { path: '/issues',    icon: Bug,             label: 'Issues',    color: '#f97316' },
  { path: '/fixes',     icon: Wrench,          label: 'Fixes',     color: '#34d399' },
  { path: '/reports',   icon: BarChart3,       label: 'Reports',   color: '#fbbf24' },
  { path: '/settings',  icon: Settings,        label: 'Settings',  color: '#94a3b8' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const initials = (user?.user_metadata?.full_name || user?.email || 'U')
    .split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg-base)' }}>

      {/* ── Sidebar ── */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col h-full relative z-20 flex-shrink-0"
        style={{
          background: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Inner top light */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              boxShadow: '0 0 20px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}>
            <Zap className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-xl animate-glow-pulse"
              style={{ boxShadow: '0 0 12px rgba(99,102,241,0.6)' }} />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}>
                <p className="font-bold text-base gradient-text leading-none">AutoSEO</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>SEO Automation</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="separator-beam mx-3" />

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 relative group"
                style={{
                  color: isActive ? '#fff' : 'var(--color-text-muted)',
                  minHeight: 44,
                }}
              >
                {/* Active bg */}
                {isActive && (
                  <motion.div layoutId="nav-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}22, ${item.color}10)`,
                      border: `1px solid ${item.color}30`,
                    }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}

                {/* Hover bg */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: 'rgba(99,102,241,0.06)' }} />

                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <item.icon className="w-4.5 h-4.5 transition-transform group-hover:scale-110"
                    style={{ color: isActive ? item.color : undefined, width: 18, height: 18 }} />
                </div>

                {/* Label */}
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="text-sm font-medium relative z-10 whitespace-nowrap">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active indicator line */}
                {isActive && (
                  <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Separator */}
        <div className="separator-beam mx-3" />

        {/* User section */}
        <div className="p-2 flex-shrink-0">
          <div className={cn(
            'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150',
            sidebarOpen ? 'bg-transparent' : ''
          )}>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                boxShadow: '0 0 12px rgba(99,102,241,0.4)',
                color: '#fff',
              }}>
              {initials}
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                    {user?.email || 'dev@autoseo.local'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign out */}
          <button onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-all duration-150 group"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fb7185'; e.currentTarget.style.background = 'rgba(251,113,133,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.background = 'transparent' }}>
            <LogOut className="w-4 h-4 flex-shrink-0" style={{ width: 16, height: 16 }} />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-xs font-medium">Sign Out</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse toggle */}
        <button onClick={toggleSidebar}
          className="absolute -right-3.5 top-[76px] w-7 h-7 rounded-full flex items-center justify-center border z-30 transition-all duration-150"
          style={{
            background: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-hover)',
            color: 'var(--color-text-secondary)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>
          {sidebarOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 h-16 flex-shrink-0 relative"
          style={{
            background: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border)',
          }}>
          {/* Beam */}
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(99,102,241,0.15) 50%, transparent 90%)' }} />

          {/* Search */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: searchFocused ? 'var(--color-brand-light)' : 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search sites, issues…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-10 pr-12 py-2 rounded-xl text-sm border outline-none transition-all duration-200"
              style={{
                background: searchFocused ? 'var(--color-bg-elevated)' : 'var(--color-bg-input)',
                borderColor: searchFocused ? 'rgba(99,102,241,0.4)' : 'var(--color-border)',
                color: 'var(--color-text-primary)',
                boxShadow: searchFocused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: 10 }}>
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Plan badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--color-brand-light)', border: '1px solid rgba(99,102,241,0.18)' }}>
              <Layers className="w-3 h-3" />
              Starter Plan
            </div>

            {/* Bell */}
            <button className="relative p-2.5 rounded-xl transition-all duration-150 group"
              style={{ color: 'var(--color-text-secondary)', background: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-elevated)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                style={{ background: '#ef4444', boxShadow: '0 0 6px rgba(239,68,68,0.8)' }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: 'var(--color-bg-primary)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="p-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
