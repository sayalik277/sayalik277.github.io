import { useQuery } from '@tanstack/react-query'
import { visitorsApi } from '../api/client'
import type { SeasonTheme } from '../types'
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

const SOCIAL = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/sayalik277' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/sayalikamble' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com/sayalik277' },
  { icon: FiMail, label: 'Email', href: 'mailto:sayalik94@gmail.com' },
]

interface Props { theme: SeasonTheme }

export default function Footer({ theme }: Props) {
  const { data: countData } = useQuery({
    queryKey: ['visitor-count'],
    queryFn: visitorsApi.count,
  })

  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ borderColor: theme.border, background: theme.bgSecondary }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Brand */}
        <span className="font-serif text-2xl font-bold" style={{ color: theme.primary }}>
          Sayali Kamble
        </span>

        {/* Social links */}
        <div className="flex gap-5">
          {SOCIAL.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-xl transition-all hover:scale-110"
              style={{ color: theme.textMuted }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = theme.primary)}
              onMouseLeave={e =>
                ((e.currentTarget as HTMLAnchorElement).style.color = theme.textMuted)
              }
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Visitor count */}
        {countData && (
          <div
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border"
            style={{ borderColor: theme.border, color: theme.textSecondary }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: theme.primary }}
            />
            {countData.count.toLocaleString()} people have visited this portfolio
          </div>
        )}

        <p className="text-xs text-center opacity-40" style={{ color: theme.textMuted }}>
          Built with React · TypeScript · FastAPI · {theme.emoji} {theme.label} theme
          <br />© {new Date().getFullYear()} Sayali Kamble — Designed & developed with a lot of ☕
        </p>
      </div>
    </footer>
  )
}
