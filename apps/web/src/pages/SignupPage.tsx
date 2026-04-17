import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { authApi } from '@/lib/api-client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [orgName, setOrgName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // Register with Supabase
      await signUp(email, password, fullName)
      // Create org in our DB
      await authApi.register({ email, password, full_name: fullName, org_name: orgName || fullName + "'s Org" })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[128px] opacity-20" style={{ background: 'var(--color-accent-violet)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[128px] opacity-10" style={{ background: 'var(--color-brand)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: 'var(--color-brand)' }}>
            <Zap className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold gradient-text">AutoSEO</span>
        </div>

        <div
          className="rounded-2xl p-8 border"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-elevated)' }}
        >
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Create your account</h1>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>Start optimizing your SEO in minutes</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm border" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--color-severity-critical)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Smith" required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border outline-none transition-all"
                  style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-brand)')} onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Organization</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Acme Inc."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border outline-none transition-all"
                  style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-brand)')} onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border outline-none transition-all"
                  style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-brand)')} onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm border outline-none transition-all"
                  style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-brand)')} onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
              style={{ background: loading ? 'var(--color-brand-dark)' : 'var(--color-brand)', opacity: loading ? 0.7 : 1 }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = 'var(--color-brand-dark)')}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.background = 'var(--color-brand)')}>
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-medium transition-colors" style={{ color: 'var(--color-brand-light)' }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
