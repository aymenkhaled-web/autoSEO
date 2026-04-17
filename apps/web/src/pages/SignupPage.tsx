import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const benefits = [
  'Free forever — no credit card',
  '1 site, unlimited crawls',
  'AI-powered issue detection',
  'Auto-fix with 1 click',
]

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, fullName)
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center mesh-bg" style={{ background: 'var(--color-bg-base)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm px-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: '#34d399' }} />
          </div>
          <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>Check your email</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            We've sent a confirmation link to <strong style={{ color: 'var(--color-text-primary)' }}>{email}</strong>.
            Click it to activate your account.
          </p>
          <Link to="/login" className="text-sm font-semibold" style={{ color: 'var(--color-brand-light)' }}>
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex mesh-bg" style={{ background: 'var(--color-bg-base)' }}>

      {/* Left — benefits panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.07), rgba(34,211,238,0.03))' }}>
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-0 right-0 bottom-0 w-px" style={{ background: 'var(--color-border)' }} />

        <div className="relative z-10 max-w-sm">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">AutoSEO</span>
          </Link>

          <h2 className="text-3xl font-black mb-4 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            The SEO agent that <span className="gradient-text">never sleeps</span>
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Start for free. AutoSEO crawls your site, finds every SEO issue, and fixes them automatically.
          </p>

          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <motion.li key={b} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-48 -right-48 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-sm relative z-10">

          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black gradient-text">AutoSEO</span>
          </Link>

          <h1 className="text-2xl font-black mb-1.5 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Create your account
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Free forever. No credit card required.
          </p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl text-sm border"
              style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)', color: '#fb7185' }}>
              {error}
            </motion.div>
          )}

          {/* Google */}
          <button onClick={signInWithGoogle}
            className="w-full py-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-3 mb-5 transition-all duration-150"
            style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.background = 'var(--color-bg-elevated)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'var(--color-bg-card)' }}>
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>or with email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: 'var(--color-text-muted)' }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }} />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith" required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border outline-none transition-all duration-150"
                  style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: 'var(--color-text-muted)' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border outline-none transition-all duration-150"
                  style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: 'var(--color-text-muted)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }} />
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8}
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm border outline-none transition-all duration-150"
                  style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-150 mt-2"
              style={{
                background: loading ? 'rgba(99,102,241,0.6)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: loading ? 'none' : '0 0 24px rgba(99,102,241,0.4)',
              }}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : <>Create Free Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-xs mt-5" style={{ color: 'var(--color-text-muted)' }}>
            By signing up, you agree to our{' '}
            <a href="#" className="underline" style={{ color: 'var(--color-brand-light)' }}>Terms</a>
            {' '}and{' '}
            <a href="#" className="underline" style={{ color: 'var(--color-brand-light)' }}>Privacy Policy</a>.
          </p>

          <p className="text-center text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: 'var(--color-brand-light)' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
