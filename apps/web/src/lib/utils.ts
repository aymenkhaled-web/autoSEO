import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diff = now.getTime() - target.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  return formatDate(date)
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: 'var(--color-severity-critical)',
    high: 'var(--color-severity-high)',
    medium: 'var(--color-severity-medium)',
    low: 'var(--color-severity-low)',
    info: 'var(--color-severity-info)',
  }
  return colors[severity] || colors.info
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'var(--color-score-excellent)'
  if (score >= 70) return 'var(--color-score-good)'
  if (score >= 50) return 'var(--color-score-needs-work)'
  return 'var(--color-score-poor)'
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Needs Work'
  return 'Poor'
}
