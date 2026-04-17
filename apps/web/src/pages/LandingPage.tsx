import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Zap, Globe, Bug, Wrench, BarChart3, ArrowRight,
  CheckCircle2, TrendingUp, Shield, Code2, Cpu,
  ChevronRight, Star, Users, Activity, Layers
} from 'lucide-react'

/* ── Animated counter ── */
function Counter({ to, duration = 2000 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = (to / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])
  return <span ref={ref}>{count.toLocaleString()}</span>
}

/* ── 3D Orbit Hero ── */
function HeroOrb() {
  return (
    <div className="relative w-[520px] h-[520px] flex-shrink-0" style={{ perspective: '1000px' }}>
      {/* Core glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(34,211,238,0.12) 50%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }} />
      </div>

      {/* Sphere core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full relative"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(129,140,248,0.9), rgba(99,102,241,0.6) 40%, rgba(34,211,238,0.3) 80%, transparent)',
            boxShadow: '0 0 60px rgba(99,102,241,0.5), inset 0 -20px 40px rgba(0,0,0,0.4), inset 0 10px 20px rgba(255,255,255,0.1)',
          }}>
          {/* Inner grid lines on sphere */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.15) 18px, rgba(255,255,255,0.15) 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.15) 18px, rgba(255,255,255,0.15) 19px)',
              borderRadius: '50%',
            }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-14 h-14 text-white" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.6))' }} />
          </div>
        </div>
      </div>

      {/* Orbit ring 1 */}
      <div className="absolute inset-0 flex items-center justify-center animate-rotate-slow">
        <div className="w-72 h-72 rounded-full border relative"
          style={{ borderColor: 'rgba(99,102,241,0.2)', transform: 'rotateX(72deg)' }}>
          {/* Orbital dot */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
            style={{ background: 'var(--color-brand)', boxShadow: '0 0 12px rgba(99,102,241,0.8)' }} />
        </div>
      </div>

      {/* Orbit ring 2 */}
      <div className="absolute inset-0 flex items-center justify-center animate-rotate-reverse">
        <div className="w-96 h-96 rounded-full border relative"
          style={{ borderColor: 'rgba(34,211,238,0.15)', transform: 'rotateX(60deg) rotateZ(30deg)' }}>
          <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 rounded-full"
            style={{ background: 'var(--color-cyan)', boxShadow: '0 0 16px rgba(34,211,238,0.9)' }} />
          <div className="absolute -bottom-2 left-1/3 w-3 h-3 rounded-full"
            style={{ background: 'var(--color-violet)', boxShadow: '0 0 10px rgba(167,139,250,0.8)' }} />
        </div>
      </div>

      {/* Floating feature pills */}
      {[
        { label: 'Meta Fixed', icon: CheckCircle2, color: '#34d399', x: -180, y: -80, delay: 0 },
        { label: 'Score +18', icon: TrendingUp, color: '#818cf8', x: 180, y: -60, delay: 0.4 },
        { label: '247 Issues', icon: Bug, color: '#f97316', x: -160, y: 100, delay: 0.8 },
        { label: 'AI Fixed', icon: Cpu, color: '#22d3ee', x: 160, y: 110, delay: 1.2 },
      ].map((pill) => (
        <motion.div
          key={pill.label}
          className="absolute flex items-center gap-2 px-3 py-2 rounded-xl glass-heavy"
          style={{ left: '50%', top: '50%', x: pill.x, y: pill.y, border: `1px solid ${pill.color}25` }}
          animate={{ y: [pill.y, pill.y - 8, pill.y] }}
          transition={{ duration: 3 + pill.delay, delay: pill.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <pill.icon className="w-3.5 h-3.5" style={{ color: pill.color }} />
          <span className="text-xs font-semibold whitespace-nowrap" style={{ color: pill.color }}>{pill.label}</span>
        </motion.div>
      ))}

      {/* Ambient particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360
        const radius = 200 + Math.random() * 60
        const x = Math.cos((angle * Math.PI) / 180) * radius + 260
        const y = Math.sin((angle * Math.PI) / 180) * radius + 260
        return (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              left: x, top: y,
              background: i % 3 === 0 ? 'var(--color-brand)' : i % 3 === 1 ? 'var(--color-cyan)' : 'var(--color-violet)',
              opacity: 0.4 + Math.random() * 0.4,
              animation: `glow-pulse ${2 + i * 0.3}s ease-in-out infinite`,
            }} />
        )
      })}
    </div>
  )
}

/* ── Feature Card ── */
function FeatureCard({
  icon: Icon, title, description, color, delay
}: {
  icon: any; title: string; description: string; color: string; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="card-3d rounded-2xl p-6 border relative overflow-hidden group cursor-default"
      style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card)' }}
    >
      {/* Ambient corner glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` }} />

      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
        <Icon className="w-6 h-6" style={{ color }} />
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: `0 0 16px ${color}40` }} />
      </div>

      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>

      {/* Bottom beam on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
    </motion.div>
  )
}

/* ── Pricing Card ── */
function PricingCard({
  plan, price, description, features, popular, cta, delay
}: {
  plan: string; price: string; description: string; features: string[]; popular?: boolean; cta: string; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl p-8 border relative overflow-hidden ${popular ? 'plan-popular' : ''}`}
      style={{
        background: popular ? 'linear-gradient(160deg, rgba(99,102,241,0.1), rgba(34,211,238,0.04))' : 'var(--color-bg-card)',
        borderColor: popular ? 'rgba(99,102,241,0.35)' : 'var(--color-border)',
        boxShadow: popular ? '0 0 0 1px rgba(99,102,241,0.15), 0 0 60px rgba(99,102,241,0.08)' : 'var(--shadow-card)',
      }}
    >
      {popular && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', color: '#fff' }}>
          Most Popular
        </div>
      )}
      <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-brand-light)' }}>{plan}</p>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-black" style={{ color: 'var(--color-text-primary)' }}>{price}</span>
        {price !== 'Free' && <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>/mo</span>}
      </div>
      <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
      <div className="separator-beam mb-6" />
      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: popular ? 'var(--color-brand-light)' : 'var(--color-emerald)' }} />
            {f}
          </li>
        ))}
      </ul>
      <Link to="/signup"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        style={popular
          ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', boxShadow: '0 0 24px rgba(99,102,241,0.4)' }
          : { background: 'var(--color-bg-elevated)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }
        }
      >
        {cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

/* ── Main Landing Page ── */
export default function LandingPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: Globe, title: '4-Layer Smart Crawler',
      description: 'Jina AI → Crawl4AI + Camoufox → ScrapFly fallback. Crawls any site, bypasses anti-bot protection automatically.',
      color: '#818cf8', delay: 0,
    },
    {
      icon: Cpu, title: 'Claude-Powered Analysis',
      description: 'Every SEO issue is analyzed by Claude AI. Get actionable fixes with confidence scores, not generic recommendations.',
      color: '#22d3ee', delay: 0.1,
    },
    {
      icon: Wrench, title: 'One-Click Auto-Fix',
      description: 'Connect WordPress, Shopify, Webflow, or GitHub. AutoSEO writes the fix directly to your CMS — you just approve.',
      color: '#34d399', delay: 0.2,
    },
    {
      icon: Shield, title: 'Enterprise Security',
      description: 'AES-256-GCM encrypted CMS credentials, RLS on every DB row, append-only audit trail, GDPR-ready from day one.',
      color: '#f472b6', delay: 0.3,
    },
    {
      icon: BarChart3, title: 'SEO Score Tracking',
      description: 'Track score trends across 30/90/365 days. Identify what moved the needle and prove ROI to stakeholders.',
      color: '#fbbf24', delay: 0.4,
    },
    {
      icon: Code2, title: 'JS Snippet Monitoring',
      description: 'Install a 3KB script once. Get real-user Core Web Vitals, live metadata snapshots, and instant alerts.',
      color: '#a78bfa', delay: 0.5,
    },
  ]

  const stats = [
    { value: 12400, label: 'Issues Fixed', suffix: '+' },
    { value: 847, label: 'Sites Monitored', suffix: '' },
    { value: 98, label: 'Fix Success Rate', suffix: '%' },
    { value: 4, label: 'Crawler Layers', suffix: '' },
  ]

  const plans = [
    {
      plan: 'Starter', price: 'Free', cta: 'Start Free',
      description: '1 site, audit only. No credit card required.',
      features: ['1 site monitored', '500 pages / crawl', 'Weekly scheduled crawl', 'Issue detection', 'Email reports'],
    },
    {
      plan: 'Pro', price: '$49', cta: 'Start Pro', popular: true,
      description: 'For agencies and growing teams.',
      features: ['10 sites monitored', '5,000 pages / crawl', 'Daily crawls', 'AI auto-fix (WP, Shopify)', 'GitHub PR integration', 'PDF reports', 'Slack alerts'],
    },
    {
      plan: 'Agency', price: '$149', cta: 'Start Agency',
      description: 'White-glove for large-scale SEO.',
      features: ['Unlimited sites', '50,000 pages / crawl', 'Hourly crawls', 'All CMS integrations', 'API access', 'Priority support', 'Custom reports'],
    },
  ]

  return (
    <div className="min-h-screen mesh-bg">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-heavy border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 16px rgba(99,102,241,0.5)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold gradient-text">AutoSEO</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-brand-light)', border: '1px solid rgba(99,102,241,0.2)' }}>Beta</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Docs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-text-primary)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-text-secondary)')}>
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium transition-colors px-4 py-2 rounded-lg"
              style={{ color: 'var(--color-text-secondary)' }}>
              Sign In
            </Link>
            <Link to="/signup"
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 20px rgba(99,102,241,0.35)' }}>
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 grid-pattern-animated opacity-60" />

        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <div className="status-dot active" style={{ background: 'var(--color-emerald)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--color-brand-light)' }}>
                AI-Powered SEO Automation — Now in Beta
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6">
              <span style={{ color: 'var(--color-text-primary)' }}>SEO on </span>
              <span className="gradient-text">Autopilot.</span>
              <br />
              <span style={{ color: 'var(--color-text-primary)' }}>You Stay </span>
              <span className="gradient-text-warm">Focused.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              AutoSEO crawls your site with a 4-layer intelligent engine, identifies every SEO issue with Claude AI,
              and automatically writes the fix to your CMS — with your approval.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all group"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 32px rgba(99,102,241,0.45)' }}>
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dashboard"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
                style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                <Activity className="w-5 h-5" style={{ color: 'var(--color-brand-light)' }} />
                View Dashboard
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {['#6366f1', '#22d3ee', '#34d399', '#f472b6'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{ background: c, borderColor: 'var(--color-bg-base)', color: '#fff' }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3" style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Loved by 847 SEO teams</p>
              </div>
            </motion.div>
          </div>

          {/* Right — 3D orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="hidden lg:flex flex-shrink-0">
            <HeroOrb />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg-base))' }} />
      </section>

      {/* ── Stats ── */}
      <section className="py-20 border-y" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <p className="text-4xl font-black mb-1 gradient-text">
                <Counter to={stat.value} />{stat.suffix}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-brand-light)' }}>
              Everything you need
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Autonomous SEO — <span className="gradient-text">End to End</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              From intelligent crawling to AI-generated fixes pushed directly to your CMS, AutoSEO handles the full loop.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Three steps to <span className="gradient-text">zero SEO issues</span>
            </motion.h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-[calc(100%-6rem)] hidden lg:block"
              style={{ background: 'linear-gradient(to bottom, var(--color-brand), var(--color-cyan), transparent)' }} />

            {[
              {
                step: '01', title: 'Connect your site',
                desc: 'Add a domain — AutoSEO crawls it with a 4-layer engine. Or connect via WordPress, Shopify, Webflow, GitHub, or JS snippet for deep integration.',
                icon: Globe, color: '#818cf8',
              },
              {
                step: '02', title: 'AI analyzes every issue',
                desc: 'Claude examines each page and generates precise fixes — not generic advice. Confidence score, expected impact, and rollback plan included.',
                icon: Cpu, color: '#22d3ee',
              },
              {
                step: '03', title: 'One click to apply',
                desc: 'Review AI-proposed fixes in the dashboard. Approve individually or in bulk. AutoSEO writes directly to your CMS, then verifies the change applied.',
                icon: CheckCircle2, color: '#34d399',
              },
            ].map((step, i) => (
              <motion.div key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-black font-mono" style={{ color: `${step.color}30` }}>{step.step}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                      <step.icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>{step.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
                </div>

                {/* Visual block */}
                <div className="flex-1 max-w-md">
                  <div className="rounded-2xl p-6 border relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${step.color}08, transparent)`, borderColor: `${step.color}20` }}>
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${step.color}50, transparent)` }} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: '#fbbf24' }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                    </div>
                    <div className="space-y-2">
                      {[0.9, 0.6, 0.75, 0.45].map((w, j) => (
                        <div key={j} className="h-2 rounded-full"
                          style={{ width: `${w * 100}%`, background: j === 0 ? `${step.color}40` : 'var(--color-bg-elevated)' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Simple, <span className="gradient-text">transparent</span> pricing
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Start free. Scale when you need it. Cancel anytime.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => <PricingCard key={p.plan} {...p} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-16 relative overflow-hidden gradient-border">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2), transparent 70%)' }} />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.15))', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Zap className="w-8 h-8" style={{ color: 'var(--color-brand-light)' }} />
              </div>
              <h2 className="text-4xl font-black mb-4">
                <span style={{ color: 'var(--color-text-primary)' }}>Ready to automate </span>
                <span className="gradient-text">your SEO?</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Join hundreds of teams who let AutoSEO handle the SEO grind while they focus on building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}>
                  Start Free Today <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--color-brand)' }}>
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">AutoSEO</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © 2026 AutoSEO. Autonomous SEO Agent.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Docs'].map((link) => (
              <a key={link} href="#" className="text-sm transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
