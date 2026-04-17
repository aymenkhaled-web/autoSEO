import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Globe, Bug, Wrench, BarChart3,
  Settings, LogOut, ChevronLeft, ChevronRight, Search,
  Zap, Bell, Layers
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useAppStore } from '@/stores/app-store'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/sites',     icon: Globe,           label: 'Sites' },
  { path: '/issues',    icon: Bug,             label: 'Issues' },
  { path: '/fixes',     icon: Wrench,          label: 'Fixes' },
  { path: '/reports',   icon: BarChart3,       label: 'Reports' },
  { path: '/settings',  icon: Settings,        label: 'Settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const initials = (user?.user_metadata?.full_name || user?.email || 'U')
    .split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const name = user?.user_metadata?.full_name || 'User'
  const email = user?.email || 'dev@autoseo.local'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-root)' }}>

      {/* ── Sidebar ── */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 232 : 60 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col h-full relative z-20 flex-shrink-0"
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>

        {/* Logo area */}
        <div className="flex items-center gap-3 px-3.5 h-[57px] flex-shrink-0 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--brand)', boxShadow: '0 0 12px rgba(99,102,241,0.45)' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }} className="min-w-0">
                <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>AutoSEO</p>
                <p className="text-[11px] leading-tight mt-0.5" style={{ color: 'var(--text-3)' }}>SEO Automation</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            return (
              <Link key={item.path} to={item.path} title={!sidebarOpen ? item.label : undefined}
                className="sidebar-item"
                style={isActive ? {
                  background: 'var(--bg-overlay)',
                  color: 'var(--text-1)',
                } : {}}>
                {isActive && (
                  <motion.div layoutId="nav-pill"
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
                    style={{ background: 'var(--brand)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                  />
                )}
                <item.icon className="w-[18px] h-[18px] flex-shrink-0 relative z-10"
                  style={{ color: isActive ? 'var(--text-1)' : 'var(--text-3)' }} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="text-sm relative z-10">{item.label}</motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          {/* User row */}
          <div className="px-2 pt-2 pb-1">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl" style={{ minHeight: 44 }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ background: 'var(--brand)', color: '#fff', boxShadow: '0 0 8px rgba(99,102,241,0.4)' }}>
                {initials}
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }} className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-1)' }}>{name}</p>
                    <p className="text-[11px] truncate" style={{ color: 'var(--text-3)' }}>{email}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Sign out */}
          <div className="px-2 pb-2">
            <button onClick={signOut}
              className="sidebar-item w-full"
              style={{ color: 'var(--text-3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-rose)'; e.currentTarget.style.background = 'rgba(244,63,94,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.background = '' }}>
              <LogOut className="w-[16px] h-[16px] flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }} className="text-sm">Sign out</motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Collapse toggle */}
        <button onClick={toggleSidebar}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full border flex items-center justify-center z-30 transition-colors"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border-hover)',
            color: 'var(--text-3)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}>
          {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 h-[57px] flex-shrink-0"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>

          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: 'var(--text-3)' }} />
            <input type="text" placeholder="Search…"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              className="input input-icon text-sm"
              style={{ height: 34, padding: '0 12px 0 34px', fontSize: 13 }} />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: 'var(--bg-overlay)', color: 'var(--text-3)', border: '1px solid var(--border)', fontFamily: 'inherit' }}>
              ⌘K
            </kbd>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: 'var(--brand-dim)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Layers className="w-3 h-3" />
              Starter
            </span>
            <button className="relative p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.color = 'var(--text-2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--text-3)' }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: 'var(--bg-root)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              className="p-6 max-w-[1400px]">
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
