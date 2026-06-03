import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { visitorsApi } from '../api/client'
import type { SeasonTheme } from '../types'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Side Quests', href: '#side-quests' },
  { label: 'Now', href: '#scrum' },
]

interface Props {
  theme: SeasonTheme
  visitorName: string | null
}

export default function Navbar({ theme, visitorName }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const { data: countData } = useQuery({
    queryKey: ['visitor-count'],
    queryFn: visitorsApi.count,
    refetchInterval: 60_000,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? `${theme.bgPrimary}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif font-bold text-xl tracking-tight"
          style={{ color: theme.primary }}
        >
          Sayali.dev
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {pathname === '/' &&
            NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium transition-colors hover:opacity-100 opacity-70"
                style={{ color: theme.textPrimary }}
              >
                {link.label}
              </button>
            ))}
          <Link
            to="/admin"
            className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-90"
            style={{ borderColor: theme.border, color: theme.textMuted }}
          >
            Admin
          </Link>
        </div>

        {/* Visitor badge + mobile menu toggle */}
        <div className="flex items-center gap-3">
          {countData && (
            <div
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: theme.border, color: theme.textSecondary }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: theme.primary }}
              />
              {countData.count.toLocaleString()} visit{countData.count !== 1 ? 's' : ''}
              {visitorName && <span className="opacity-50">· hi {visitorName}!</span>}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(o => !o)}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="block w-5 h-0.5 transition-all"
                style={{ background: theme.textPrimary }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-4"
          style={{ background: theme.bgPrimary }}
        >
          {pathname === '/' &&
            NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-left opacity-80"
                style={{ color: theme.textPrimary }}
              >
                {link.label}
              </button>
            ))}
          <Link
            to="/admin"
            className="text-xs opacity-50"
            style={{ color: theme.textMuted }}
            onClick={() => setMenuOpen(false)}
          >
            Admin panel
          </Link>
        </div>
      )}
    </nav>
  )
}
