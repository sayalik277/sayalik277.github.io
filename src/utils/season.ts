import type { Season, SeasonTheme } from '../types'

export function getSeason(): Season {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'fall'
  return 'winter'
}

export const SEASON_THEMES: Record<Season, SeasonTheme> = {
  summer: {
    season: 'summer',
    label: 'Summer',
    emoji: '☀️',
    greeting: "It's summer — warm vibes, cool code.",
    bgPrimary: '#030b14',
    bgSecondary: '#071426',
    bgCard: '#0d2035',
    bgCardHover: '#112844',
    primary: '#f97316',
    primaryLight: '#fb923c',
    secondary: '#eab308',
    accent: '#0ea5e9',
    textPrimary: '#f9fafb',
    textSecondary: '#93c5fd',
    textMuted: '#6b7280',
    border: '#1e3a5f',
    shadowGlow: 'rgba(249,115,22,0.35)',
    gradientFrom: '#f97316',
    gradientTo: '#eab308',
  },
  fall: {
    season: 'fall',
    label: 'Fall',
    emoji: '🍂',
    greeting: "Autumn is here — deep thoughts, deeper coffee.",
    bgPrimary: '#0a0300',
    bgSecondary: '#160700',
    bgCard: '#241000',
    bgCardHover: '#331700',
    primary: '#ea580c',
    primaryLight: '#f97316',
    secondary: '#ca8a04',
    accent: '#dc2626',
    textPrimary: '#fef3c7',
    textSecondary: '#fcd34d',
    textMuted: '#a16207',
    border: '#3d1900',
    shadowGlow: 'rgba(234,88,12,0.4)',
    gradientFrom: '#ea580c',
    gradientTo: '#ca8a04',
  },
  winter: {
    season: 'winter',
    label: 'Winter',
    emoji: '❄️',
    greeting: "Winter nights — best time to ship code.",
    bgPrimary: '#020609',
    bgSecondary: '#060d1a',
    bgCard: '#0b1629',
    bgCardHover: '#111f38',
    primary: '#38bdf8',
    primaryLight: '#7dd3fc',
    secondary: '#818cf8',
    accent: '#e879f9',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#475569',
    border: '#1e293b',
    shadowGlow: 'rgba(56,189,248,0.3)',
    gradientFrom: '#38bdf8',
    gradientTo: '#818cf8',
  },
  spring: {
    season: 'spring',
    label: 'Spring',
    emoji: '🌸',
    greeting: "Spring — new beginnings, fresh commits.",
    bgPrimary: '#f0fdf4',
    bgSecondary: '#dcfce7',
    bgCard: '#ffffff',
    bgCardHover: '#f0fdf4',
    primary: '#16a34a',
    primaryLight: '#22c55e',
    secondary: '#ec4899',
    accent: '#8b5cf6',
    textPrimary: '#14532d',
    textSecondary: '#166534',
    textMuted: '#4ade80',
    border: '#bbf7d0',
    shadowGlow: 'rgba(22,163,74,0.2)',
    gradientFrom: '#16a34a',
    gradientTo: '#ec4899',
  },
}

export function applySeasonTheme(theme: SeasonTheme) {
  const root = document.documentElement
  root.style.setProperty('--color-bg-primary', theme.bgPrimary)
  root.style.setProperty('--color-bg-secondary', theme.bgSecondary)
  root.style.setProperty('--color-bg-card', theme.bgCard)
  root.style.setProperty('--color-bg-card-hover', theme.bgCardHover)
  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-primary-light', theme.primaryLight)
  root.style.setProperty('--color-secondary', theme.secondary)
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--color-text-primary', theme.textPrimary)
  root.style.setProperty('--color-text-secondary', theme.textSecondary)
  root.style.setProperty('--color-text-muted', theme.textMuted)
  root.style.setProperty('--color-border', theme.border)
  root.style.setProperty('--color-shadow-glow', theme.shadowGlow)
  root.style.setProperty('--color-gradient-from', theme.gradientFrom)
  root.style.setProperty('--color-gradient-to', theme.gradientTo)
}
