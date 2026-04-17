import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useAuth } from '@/hooks/use-auth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import DashboardPage from '@/pages/DashboardPage'
import SitesPage from '@/pages/SitesPage'
import IssuesPage from '@/pages/IssuesPage'
import FixesPage from '@/pages/FixesPage'
import SettingsPage from '@/pages/SettingsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--color-brand)', borderTopColor: 'transparent' }}
          />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // For development, allow access without auth
  // In production, uncomment the redirect:
  // if (!isAuthenticated) return <Navigate to="/login" replace />

  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout><DashboardPage /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sites"
          element={
            <ProtectedRoute>
              <DashboardLayout><SitesPage /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <DashboardLayout><IssuesPage /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fixes"
          element={
            <ProtectedRoute>
              <DashboardLayout><FixesPage /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Reports</h1>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Coming in Phase 6 — PDF reports, email digests, and analytics.</p>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout><SettingsPage /></DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen" style={{ background: 'var(--color-bg-primary)' }}>
              <div className="text-center">
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Page not found</p>
                <a href="/dashboard" className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--color-brand)' }}>
                  Go to Dashboard
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
