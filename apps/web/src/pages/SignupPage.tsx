import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const perks = [
  'Free forever — 1 site, no credit card',
  'AI-powered issue detection',
  'One-click CMS auto-fix',
  'Unlimited crawls on free plan',
]

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
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
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-root)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: '#34d399' }} />
          </div>
          <h2 className="text-xl font-black mb-2.5" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Check your email</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-2)', lineHeight: '1.6' }}>
            We sent a confirmation link to{' '}
            <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{email}</span>.
            Click it to activate your account.
          </p>
          <Link to="/login" className="text-sm font-semibold" style={{ color: '#a5b4fc' }}>
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-root)' }}>

      {/* Left — brand panel */}
      <div className="hidden lg:flex w-[420px] flex-shrink-0 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>

        <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--brand)', boxShadow: '0 0 16px rgba(99,102,241,0.5)' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>AutoSEO</span>
        </Link>

        <div className="relative z-10">
          <p className="text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            The SEO agent that<br />
            <span style={{ color: '#a5b4fc' }}>never sleeps.</span>
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
            Start for free. AutoSEO crawls your site, identifies every SEO problem, and fixes them automatically.
          </p>

          <ul className="space-y-3.5">
            {perks.map((p, i) => (
              <motion.li key={p} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <CheckCircle2 className="w-3 h-3" style={{ color: '#818cf8' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-2)' }}>{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="text-xs relative z-10" style={{ color: 'var(--text-3)' }}>
          Trusted by 847+ teams worldwide
        </p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[360px] relative z-10">

          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--brand)' }}>
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>AutoSEO</span>
          </Link>

          <h1 className="text-2xl font-black mb-1 tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
            Create your account
          </h1>
          <p className="text-sm mb-7" style={{ color: 'var(--text-2)' }}>
            Free forever. No credit card required.
          </p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl text-sm border"
              style={{ background: 'rgba(244,63,94,0.08)', borderColor: 'rgba(244,63,94,0.2)', color: '#fb7185' }}>
              {error}
            </motion.div>
          )}

          <button onClick={signInWithGoogle}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-medium border flex items-center justify-center gap-3 mb-5 transition-all duration-150"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-1)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-surface)' }}>
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-3)' }} />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith" required autoComplete="name"
                  className="input input-icon" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-3)' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" required autoComplete="email"
                  className="input input-icon" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-3)' }} />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters" required minLength={8} autoComplete="new-password"
                  className="input input-icon pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded"
                  style={{ color: 'var(--text-3)' }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full justify-center"
              style={{ padding: '11px 20px', fontSize: '14px', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : <>Create Free Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-xs mt-5" style={{ color: 'var(--text-3)', lineHeight: '1.6' }}>
            By signing up you agree to our{' '}
            <a href="#" style={{ color: '#a5b4fc' }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: '#a5b4fc' }}>Privacy Policy</a>.
          </p>

          <p className="text-center text-sm mt-4" style={{ color: 'var(--text-3)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: '#a5b4fc' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
