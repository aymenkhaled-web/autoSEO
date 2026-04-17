import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useAuth } from '@/hooks/use-auth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import DashboardPage from '@/pages/DashboardPage'
import SitesPage from '@/pages/SitesPage'
import IssuesPage from '@/pages/IssuesPage'
import FixesPage from '@/pages/FixesPage'
import SettingsPage from '@/pages/SettingsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: 'var(--color-bg-base)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'rgba(99,102,241,0.3)', borderTopColor: '#6366f1' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full animate-pulse" style={{ background: 'rgba(99,102,241,0.2)' }} />
            </div>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Loading AutoSEO…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected app */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout><DashboardPage /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/sites" element={
          <ProtectedRoute>
            <DashboardLayout><SitesPage /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/issues" element={
          <ProtectedRoute>
            <DashboardLayout><IssuesPage /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/fixes" element={
          <ProtectedRoute>
            <DashboardLayout><FixesPage /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <DashboardLayout>
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>Reports</h1>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    PDF reports, email digests and analytics — coming in the next phase.
                  </p>
                </div>
                <div className="rounded-2xl p-12 border flex flex-col items-center text-center"
                  style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Reports — Phase 6</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    SEO score history, PDF exports, weekly digests, and Slack notifications.
                  </p>
                </div>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <DashboardLayout><SettingsPage /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen" style={{ background: 'var(--color-bg-base)' }}>
            <div className="text-center">
              <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
              <p className="text-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>Page not found</p>
              <a href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}
