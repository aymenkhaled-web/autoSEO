import { motion } from 'framer-motion'
import { Wrench, Clock, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router'

const MOCK_RECENT_FIXES: any[] = []

export default function FixesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Fixes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-generated fixes ready for your review and deployment</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Clock,         label: 'Pending Review', value: 0, color: 'bg-amber-500/10 text-amber-500' },
          { icon: CheckCircle2,  label: 'Applied',        value: 0, color: 'bg-green-500/10 text-green-500' },
          { icon: RotateCcw,     label: 'Reverted',       value: 0, color: 'bg-slate-500/10 text-slate-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-xl p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="h-4 w-4" />
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Empty state / Fixes list */}
      {MOCK_RECENT_FIXES.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 bg-card border border-dashed border-border rounded-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">No fixes generated yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Once AutoSEO detects issues, it will automatically generate AI-powered fixes ready for your one-click approval.
          </p>
          <Link to="/dashboard/sites"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 transition-all">
            <Zap className="h-4 w-4" /> Add a Site to Start
          </Link>
        </motion.div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Pending Fixes</h2>
          </div>
          <div className="divide-y divide-border">
            {MOCK_RECENT_FIXES.map((fix: any, i: number) => (
              <motion.div key={fix.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{fix.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate">{fix.url}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="h-8 px-3 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Review
                  </button>
                  <button className="h-8 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-semibold shadow-sm shadow-cyan-500/25 transition-all flex items-center gap-1">
                    Apply <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Wrench, title: 'AI Generates Fix', desc: 'Claude analyzes each issue and writes the exact change needed — code, content, or config.' },
          { icon: CheckCircle2, title: 'You Review', desc: 'Preview every change in a diff view. Approve, modify, or reject each fix individually.' },
          { icon: Zap, title: 'AutoSEO Deploys', desc: 'Approved fixes are pushed directly to your CMS. AutoSEO re-crawls to verify the fix worked.' },
        ].map((step, i) => (
          <div key={step.title} className="bg-card border border-border rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <step.icon className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
