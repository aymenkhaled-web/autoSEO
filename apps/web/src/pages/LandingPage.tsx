import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Zap, Globe, Bug, Wrench, BarChart3, ArrowRight,
  CheckCircle2, TrendingUp, Shield, Code2, Cpu,
  Star, Activity, Layers, ChevronRight, Sparkles,
  Play, ArrowUpRight, Search, FileText, Bolt,
} from 'lucide-react'

/* ─── Animated counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const step = (to / duration) * 16
    let cur = 0
    const t = setInterval(() => {
      cur += step
      if (cur >= to) { setN(to); clearInterval(t) }
      else setN(Math.floor(cur))
    }, 16)
    return () => clearInterval(t)
  }, [inView, to])
  return <div ref={ref}>{n.toLocaleString()}{suffix}</div>
}

/* ─── 3D Hero Orb (kept, improved) ─── */
function HeroVisual() {
  return (
    <div className="relative w-[480px] h-[480px] flex-shrink-0 select-none" style={{ perspective: '1200px' }}>
      {/* Deep ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'glow-pulse 4s ease-in-out infinite',
        }} />
      </div>

      {/* Sphere */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-36 h-36 rounded-full" style={{
          background: 'radial-gradient(circle at 38% 32%, #818cf8 0%, #6366f1 35%, #312e81 70%, #1e1b4b 100%)',
          boxShadow: '0 0 0 1px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.3), inset 0 -16px 32px rgba(0,0,0,0.5), inset 0 8px 16px rgba(255,255,255,0.12)',
        }}>
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            <Zap className="w-12 h-12 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }} />
          </div>
        </div>
      </div>

      {/* Ring 1 */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
        <div className="w-64 h-64 rounded-full border relative" style={{ borderColor: 'rgba(99,102,241,0.25)', transform: 'rotateX(68deg)' }}>
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full" style={{ background: '#6366f1', boxShadow: '0 0 16px rgba(99,102,241,0.9)' }} />
        </div>
      </div>

      {/* Ring 2 */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-rev">
        <div className="w-[360px] h-[360px] rounded-full border relative" style={{ borderColor: 'rgba(167,139,250,0.18)', transform: 'rotateX(58deg) rotateZ(28deg)' }}>
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 18px rgba(167,139,250,0.9)' }} />
          <div className="absolute -bottom-2 left-1/3 w-3.5 h-3.5 rounded-full" style={{ background: '#22d3ee', boxShadow: '0 0 12px rgba(34,211,238,0.9)' }} />
        </div>
      </div>

      {/* Ring 3 (outermost) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spin-slow 35s linear infinite' }}>
        <div className="w-[430px] h-[430px] rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.04)', transform: 'rotateX(72deg) rotateZ(15deg)' }} />
      </div>

      {/* Floating pills */}
      {[
        { label: 'Meta Fixed', icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.25)', x: -200, y: -70, delay: 0 },
        { label: 'Score +18', icon: TrendingUp, color: '#818cf8', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', x: 175, y: -50, delay: 0.5 },
        { label: '247 Issues', icon: Bug, color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.25)', x: -178, y: 95, delay: 1 },
        { label: 'AI Fixed', icon: Cpu, color: '#22d3ee', bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.25)', x: 162, y: 105, delay: 1.4 },
      ].map((p) => (
        <motion.div key={p.label}
          className="absolute flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ left: '50%', top: '50%', x: p.x, y: p.y, background: p.bg, border: `1px solid ${p.border}`, backdropFilter: 'blur(12px)' }}
          animate={{ y: [p.y, p.y - 9, p.y] }}
          transition={{ duration: 3.5 + p.delay * 0.5, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <p.icon className="w-3.5 h-3.5" style={{ color: p.color }} />
          <span className="text-xs font-semibold" style={{ color: p.color }}>{p.label}</span>
        </motion.div>
      ))}

      {/* Ambient dots */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360
        const r = 195 + (i % 3) * 18
        const x = Math.cos((angle * Math.PI) / 180) * r + 240
        const y = Math.sin((angle * Math.PI) / 180) * r + 240
        const colors = ['#6366f1', '#a78bfa', '#22d3ee']
        return (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{ left: x, top: y, background: colors[i % 3], opacity: 0.35 + (i % 4) * 0.12, animation: `glow-pulse ${2.5 + i * 0.35}s ease-in-out infinite` }} />
        )
      })}
    </div>
  )
}

/* ─── Feature bento card ─── */
function FeatureCard({ icon: Icon, title, description, accent, span = 1 }: {
  icon: any; title: string; description: string; accent: string; span?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="card card-hover group p-8 cursor-default"
      style={{ gridColumn: span > 1 ? `span ${span}` : undefined }}>

      {/* Accent glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${accent}09 0%, transparent 70%)` }} />

      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative"
        style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}>
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>

      <h3 className="text-base font-semibold mb-2.5 tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', lineHeight: '1.65' }}>{description}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }} />
    </motion.div>
  )
}

/* ─── Pricing card ─── */
function PricingCard({ tier, price, freq, description, features, cta, featured }: {
  tier: string; price: string; freq?: string; description: string; features: string[]; cta: string; featured?: boolean
}) {
  return (
    <div className="relative flex flex-col rounded-2xl"
      style={{
        background: featured ? 'linear-gradient(145deg, #16181d, #1c1f27)' : 'var(--bg-surface)',
        border: featured ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)',
        boxShadow: featured ? '0 0 0 1px rgba(99,102,241,0.1), 0 24px 80px rgba(99,102,241,0.08)' : 'none',
      }}>

      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="badge" style={{ background: 'var(--brand)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 14px', boxShadow: '0 4px 16px rgba(99,102,241,0.5)' }}>
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-6">
          <p className="text-sm font-semibold mb-3" style={{ color: featured ? '#a5b4fc' : 'var(--text-2)' }}>{tier}</p>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-5xl font-black tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>{price}</span>
            {freq && <span className="text-sm pb-2" style={{ color: 'var(--text-3)' }}>{freq}</span>}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>{description}</p>
        </div>

        <div className="sep-h mb-6" />

        <ul className="space-y-3.5 flex-1 mb-8">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: featured ? '#818cf8' : 'var(--accent-emerald)' }} />
              <span className="text-sm" style={{ color: 'var(--text-2)' }}>{f}</span>
            </li>
          ))}
        </ul>

        <Link to="/signup"
          className="btn btn-lg w-full justify-center"
          style={featured
            ? { background: 'var(--brand)', color: '#fff', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }
            : { background: 'var(--bg-elevated)', color: 'var(--text-1)', border: '1px solid var(--border)' }}>
          {cta}
        </Link>
      </div>
    </div>
  )
}

/* ─── Main ─── */
export default function LandingPage() {

  const features = [
    { icon: Globe, title: '4-Layer Intelligent Crawler', accent: '#818cf8', description: 'Jina AI → Crawl4AI + Camoufox → ScrapFly fallback. Crawls any site reliably, bypasses anti-bot protection automatically. Zero configuration required.' },
    { icon: Cpu, title: 'Claude AI Analysis', accent: '#22d3ee', description: 'Every page, every issue analyzed by Claude. Confidence scores, exact fix instructions, and business impact scoring — not generic recommendations.' },
    { icon: Wrench, title: 'One-Click Auto-Fix', accent: '#34d399', description: 'WordPress, Shopify, Webflow, and GitHub integrations built-in. AutoSEO writes the fix directly to your CMS. You review, then approve.' },
    { icon: Shield, title: 'Enterprise Security', accent: '#a78bfa', description: 'AES-256-GCM encrypted credentials, row-level security on every table, append-only audit logs, and full GDPR compliance from day one.' },
    { icon: BarChart3, title: 'Score Trend Tracking', accent: '#f59e0b', description: 'Track SEO health across 30, 90, and 365 days per site. See exactly what moved the needle and generate client-ready PDF reports in seconds.' },
    { icon: Code2, title: 'JS Snippet Monitor', accent: '#f43f5e', description: 'A 3KB embed captures real-user Core Web Vitals, live metadata snapshots, and sends instant alerts the moment something breaks.' },
  ]

  const steps = [
    { n: '01', icon: Globe, title: 'Connect your site', body: 'Paste your URL and select your CMS. AutoSEO supports WordPress, Shopify, Webflow, and GitHub out of the box. Setup takes under 60 seconds.' },
    { n: '02', icon: Cpu, title: 'AI finds every issue', body: 'Our 4-layer crawler maps every page. Claude AI scores each issue by impact, generates a human-readable explanation, and prepares the exact fix code.' },
    { n: '03', icon: Bolt, title: 'Apply fixes in one click', body: 'Review AI-drafted fixes in your dashboard. With a single approval, AutoSEO pushes the change to your CMS, then re-crawls to verify it worked.' },
  ]

  const plans = [
    {
      tier: 'Starter', price: 'Free', description: '1 site, full audit — no credit card required.',
      features: ['1 site', '500 pages per crawl', 'Weekly scheduled crawls', 'Issue detection & scoring', 'Email reports'],
      cta: 'Start for Free',
    },
    {
      tier: 'Pro', price: '$49', freq: '/mo', description: 'Full AI automation for agencies and teams.', featured: true,
      features: ['10 sites', '5,000 pages per crawl', 'Daily crawls', 'AI auto-fix (WP, Shopify, Webflow)', 'GitHub PR integration', 'PDF reports', 'Slack & email alerts'],
      cta: 'Start Pro Trial',
    },
    {
      tier: 'Agency', price: '$149', freq: '/mo', description: 'White-glove automation at scale.',
      features: ['Unlimited sites', '50,000 pages per crawl', 'Hourly crawls', 'All CMS integrations', 'Full API access', 'Priority support', 'Custom branded reports'],
      cta: 'Contact Sales',
    },
  ]

  const logos = ['Shopify', 'WordPress', 'Webflow', 'GitHub', 'Slack', 'Notion']

  return (
    <div style={{ background: 'var(--bg-root)', color: 'var(--text-1)' }}>

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 surface-glass" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container-xl h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--brand)', boxShadow: '0 0 12px rgba(99,102,241,0.5)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>AutoSEO</span>
            <span className="badge badge-brand ml-1" style={{ fontSize: '10px', padding: '2px 8px' }}>Beta</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[['#features', 'Features'], ['#how', 'How it works'], ['#pricing', 'Pricing']].map(([href, label]) => (
              <a key={label} href={href} className="btn btn-ghost text-sm">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost text-sm">Sign in</Link>
            <Link to="/signup" className="btn btn-primary text-sm" style={{ padding: '8px 18px' }}>
              Get started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-texture opacity-80 grid-scroll" />

        {/* Top ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.1) 0%, transparent 65%)', filter: 'blur(1px)' }} />

        <div className="container-xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[calc(100vh-4rem)] py-20">

            {/* Left — copy */}
            <div className="flex-1 lg:max-w-[54%]">

              {/* Eyebrow */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2.5 mb-8">
                <span className="badge badge-brand">
                  <span className="status-dot active relative" style={{ width: 6, height: 6, background: '#34d399', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(52,211,153,0.2)' }} />
                  AI-Powered SEO Automation
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
                className="font-black leading-[1.04] tracking-tight mb-6"
                style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', letterSpacing: '-0.035em' }}>
                <span style={{ color: 'var(--text-1)' }}>SEO on </span>
                <span className="text-brand-gradient">Autopilot.</span>
                <br />
                <span style={{ color: 'var(--text-1)' }}>You Stay </span>
                <span style={{ color: 'var(--text-2)' }}>Focused.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
                className="mb-10 leading-relaxed"
                style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', color: 'var(--text-2)', maxWidth: '520px' }}>
                AutoSEO crawls every page with a 4-layer intelligent engine, analyzes issues with Claude AI,
                and writes the fix directly to your CMS — with your approval.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
                className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link to="/signup" className="btn btn-primary btn-xl group">
                  Start for Free
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-xl">
                  <Activity className="w-4 h-4" style={{ color: 'var(--text-2)' }} />
                  View Dashboard
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-5">
                <div className="flex -space-x-2.5">
                  {[
                    { char: 'A', bg: '#6366f1' }, { char: 'K', bg: '#22d3ee' },
                    { char: 'M', bg: '#34d399' }, { char: 'J', bg: '#a78bfa' },
                    { char: 'S', bg: '#f59e0b' },
                  ].map((u, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black"
                      style={{ background: u.bg, borderColor: 'var(--bg-root)', color: '#fff', letterSpacing: 0 }}>
                      {u.char}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5" style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>Loved by 847 SEO teams</p>
                </div>
              </motion.div>
            </div>

            {/* Right — 3D visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="hidden lg:flex flex-shrink-0">
              <HeroVisual />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-root))' }} />
      </section>

      {/* ─── Stats ─── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-xl py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x" style={{ '--tw-divide-opacity': 1, '--divide-color': 'var(--border)' } as any}>
            {[
              { to: 12400, suffix: '+', label: 'Issues auto-fixed' },
              { to: 847, suffix: '', label: 'Sites monitored' },
              { to: 98, suffix: '%', label: 'Fix success rate' },
              { to: 4, suffix: '', label: 'Crawler layers' },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center lg:px-8">
                <div className="text-4xl font-black mb-1.5 text-brand-gradient" style={{ letterSpacing: '-0.03em' }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-3)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Logo bar ─── */}
      <section className="py-14" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container-xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: 'var(--text-3)' }}>
            Auto-fix for every major CMS
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {logos.map((logo) => (
              <span key={logo} className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container-xl">

          {/* Section header */}
          <div className="mb-16 max-w-2xl">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--brand)' }}>
              Platform
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-black mb-5 tracking-tight"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.1 }}>
              Autonomous SEO,<br />end to end.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.65' }}>
              From intelligent crawling to AI-crafted fixes applied directly to your CMS — AutoSEO handles the complete loop.
            </motion.p>
          </div>

          {/* Feature grid — bento style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.07, duration: 0.5 }}>
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="dot-texture absolute inset-0 opacity-30 pointer-events-none" />
        <div className="container-xl relative z-10">
          <div className="text-center mb-20 max-w-xl mx-auto">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--brand)' }}>
              How it works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-black tracking-tight"
              style={{ fontSize: 'clamp(30px, 3.5vw, 50px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-1)' }}>
              Three steps to zero SEO issues
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, var(--brand), rgba(167,139,250,0.6), var(--accent-cyan))' }} />

            {steps.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative">

                {/* Step number circle */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center relative flex-shrink-0 z-10"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid rgba(99,102,241,0.4)',
                      boxShadow: '0 0 0 4px var(--bg-root), 0 0 20px rgba(99,102,241,0.2)',
                    }}>
                    <span className="text-sm font-black" style={{ color: 'var(--brand)' }}>{s.n}</span>
                  </div>
                </div>

                <div className="card p-7">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <s.icon className="w-5 h-5" style={{ color: '#818cf8' }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2.5" style={{ color: 'var(--text-1)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', lineHeight: '1.65' }}>{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container-xl">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--brand)' }}>
              Pricing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-black tracking-tight mb-4"
              style={{ fontSize: 'clamp(30px, 3.5vw, 50px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-1)' }}>
              Simple, transparent pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              style={{ color: 'var(--text-2)', fontSize: '17px' }}>
              Start free forever. Upgrade when you need automation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <motion.div key={p.tier}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <PricingCard {...p} />
              </motion.div>
            ))}
          </div>

          {/* Feature comparison hint */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-10 text-sm" style={{ color: 'var(--text-3)' }}>
            All plans include SSL crawling, issue history, API access, and free onboarding.
          </motion.p>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section style={{ borderTop: '1px solid var(--border)', paddingTop: '120px', paddingBottom: '120px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '400px', background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(1px)' }} />

        <div className="container-xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto">

            <div className="badge badge-brand mx-auto mb-8" style={{ width: 'fit-content' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Free forever plan available
            </div>

            <h2 className="font-black tracking-tight mb-6"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-1)' }}>
              Ready to automate<br />your SEO?
            </h2>

            <p className="mb-10 text-lg" style={{ color: 'var(--text-2)' }}>
              Join 847 teams already using AutoSEO to fix issues faster, rank higher, and reclaim their time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary btn-xl group">
                Start for Free Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-xl">
                <Play className="w-4 h-4" style={{ color: 'var(--text-2)' }} />
                See the Dashboard
              </Link>
            </div>

            <p className="mt-6 text-sm" style={{ color: 'var(--text-3)' }}>No credit card. 1 site free forever.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-xl py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--brand)' }}>
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>AutoSEO</span>
              <span className="text-sm" style={{ color: 'var(--text-3)' }}>© 2026</span>
            </div>
            <div className="flex items-center gap-6">
              {[['#', 'Privacy'], ['#', 'Terms'], ['#', 'Docs'], ['#', 'Status']].map(([href, label]) => (
                <a key={label} href={href} className="text-sm transition-colors"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-3)')}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
