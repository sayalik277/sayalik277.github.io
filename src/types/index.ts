export type Season = 'spring' | 'summer' | 'fall' | 'winter'

export interface SeasonTheme {
  season: Season
  label: string
  bgPrimary: string
  bgSecondary: string
  bgCard: string
  bgCardHover: string
  primary: string
  primaryLight: string
  secondary: string
  accent: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  border: string
  shadowGlow: string
  gradientFrom: string
  gradientTo: string
  emoji: string
  greeting: string
}

export interface Visitor {
  id: number
  name: string | null
  ip_address: string | null
  visited_at: string
}

export interface ScrumItem {
  id: number
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done'
  category: string | null
  priority: 'low' | 'medium' | 'high'
  is_pinned: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  status: 'live' | 'wip' | 'archived'
  year: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string[]
  tech: string[]
  current: boolean
}
