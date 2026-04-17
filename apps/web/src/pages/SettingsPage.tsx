import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Building2, CreditCard, Key, Bell, Shield,
  Copy, Check, ExternalLink, RefreshCw
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [copied, setCopied] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Settings</h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Manage your account, organization, and integrations
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
              style={{
                background: activeTab === tab.id ? 'var(--color-brand-glow)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-brand-light)' : 'var(--color-text-secondary)',
                border: activeTab === tab.id ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && (
              <div className="rounded-xl p-6 border space-y-6"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Profile Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Full Name</label>
                    <input type="text" placeholder="John Smith" defaultValue=""
                      className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
                      style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Email</label>
                    <input type="email" placeholder="you@company.com" defaultValue="" disabled
                      className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none opacity-60"
                      style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }} />
                  </div>
                </div>
                <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: 'var(--color-brand)' }}>
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'organization' && (
              <div className="rounded-xl p-6 border space-y-6"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Organization</h2>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Organization Name</label>
                  <input type="text" placeholder="Acme Inc." defaultValue=""
                    className="w-full max-w-md px-4 py-2.5 rounded-lg text-sm border outline-none"
                    style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Current Plan</label>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-lg text-sm font-semibold"
                      style={{ background: 'var(--color-brand-glow)', color: 'var(--color-brand-light)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                      Starter (Free)
                    </span>
                    <button className="text-sm font-medium flex items-center gap-1"
                      style={{ color: 'var(--color-brand-light)' }}>
                      Upgrade <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: 'var(--color-brand)' }}>
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="rounded-xl p-6 border space-y-6"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Billing & Subscription</h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Manage your subscription and payment methods via Stripe.
                </p>
                <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center gap-2"
                  style={{ background: 'var(--color-brand)' }}>
                  <CreditCard className="w-4 h-4" /> Open Billing Portal
                </button>
              </div>
            )}

            {activeTab === 'api-keys' && (
              <div className="rounded-xl p-6 border space-y-6"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>API Keys</h2>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ background: 'var(--color-brand)' }}>
                    Generate New Key
                  </button>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  API keys allow programmatic access to AutoSEO. Available on Pro and Agency plans.
                </p>
                <div className="flex flex-col items-center justify-center py-10" style={{ color: 'var(--color-text-muted)' }}>
                  <Key className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm">No API keys created yet</p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="rounded-xl p-6 border space-y-6"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Notification Preferences</h2>
                {[
                  { label: 'Crawl completed', description: 'When a site crawl finishes', checked: true },
                  { label: 'Critical issues found', description: 'When critical SEO issues are detected', checked: true },
                  { label: 'Fix applied', description: 'When an AI fix is applied to your site', checked: true },
                  { label: 'Weekly digest', description: 'Weekly summary of SEO performance', checked: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{pref.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{pref.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                      <div className="w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:rounded-full after:h-4 after:w-4 after:transition-all"
                        style={{
                          background: pref.checked ? 'var(--color-brand)' : 'var(--color-border)',
                          ...({ '--tw-ring-color': 'var(--color-brand)' } as any),
                        }}>
                        <div className="absolute top-[2px] left-[2px] w-4 h-4 rounded-full transition-transform"
                          style={{ background: 'white', transform: pref.checked ? 'translateX(16px)' : 'translateX(0)' }} />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="rounded-xl p-6 border space-y-6"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Security</h2>
                <div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Two-Factor Authentication</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    Add an extra layer of security to your account.
                  </p>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium border"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    Enable 2FA
                  </button>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Active Sessions</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    You are currently signed in on this device.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
