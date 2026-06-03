import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { visitorsApi } from '../api/client'
import type { SeasonTheme } from '../types'

const ROLES = [
  'Software Development Engineer',
  'AWS Cloud Architect',
  'Full-Stack Developer',
  'AI Agent Builder',
  'React & TypeScript Fan',
  'Book Devourer',
  'Psychology Nerd',
]

interface Props {
  theme: SeasonTheme
  visitorName: string | null
}

export default function Hero({ theme, visitorName }: Props) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  const { data: countData } = useQuery({
    queryKey: ['visitor-count'],
    queryFn: visitorsApi.count,
  })

  useEffect(() => {
    const target = ROLES[roleIndex]
    let i = typing ? displayed.length : displayed.length - 1
    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 80)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i)), 40)
        return () => clearTimeout(t)
      } else {
        setRoleIndex(r => (r + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 animate-spin-slow"
          style={{
            background: `radial-gradient(circle, ${theme.primary}, transparent 70%)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-8 animate-float-slow"
          style={{
            background: `radial-gradient(circle, ${theme.secondary}, transparent 70%)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${theme.accent}, transparent 60%)`,
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24">
        {/* Season greeting */}
        <div
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border mb-8 animate-fade-in"
          style={{
            borderColor: theme.border,
            color: theme.textSecondary,
            background: `${theme.bgCard}80`,
          }}
        >
          <span>{theme.emoji}</span>
          <span>{theme.greeting}</span>
        </div>

        {/* Main heading */}
        <h1
          className="font-serif font-black text-5xl md:text-7xl leading-tight mb-4 animate-slide-up"
          style={{ color: theme.textPrimary }}
        >
          Hey{visitorName ? `, ${visitorName}` : ''} 👋
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            I'm Sayali
          </span>
        </h1>

        {/* Typing role */}
        <div
          className="text-xl md:text-2xl font-mono mb-6 h-8 flex items-center justify-center gap-1"
          style={{ color: theme.textSecondary }}
        >
          <span style={{ color: theme.primary }}>$</span>
          <span className="ml-2">{displayed}</span>
          <span
            className="inline-block w-0.5 h-6 animate-blink ml-0.5"
            style={{ background: theme.primary }}
          />
        </div>

        {/* Bio */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 opacity-80"
          style={{ color: theme.textSecondary }}
        >
          Software Engineer with 5+ years of experience — ex{' '}
          <span style={{ color: theme.primary }}>Amazon AWS</span>. I build cloud-native apps,
          AI agents, and full-stack systems. M.S. Computer Science,{' '}
          <span style={{ color: theme.secondary }}>UT Arlington</span>. OCI Certified. I also read
          psychology books and occasionally understand people.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() =>
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
              color: '#fff',
              boxShadow: `0 8px 30px ${theme.shadowGlow}`,
            }}
          >
            View Projects
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 rounded-xl font-semibold text-sm border transition-all hover:opacity-80"
            style={{
              borderColor: theme.border,
              color: theme.textPrimary,
              background: `${theme.bgCard}60`,
            }}
          >
            About Me
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {[
            { label: 'Years Exp.', value: '5+' },
            { label: 'Companies', value: '4' },
            { label: 'Profile Visits', value: countData ? countData.count.toLocaleString() : '…' },
            { label: 'Books / Year', value: '12+' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold font-serif"
                style={{ color: theme.primary }}
              >
                {stat.value}
              </div>
              <div className="text-xs opacity-50" style={{ color: theme.textMuted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="mt-16 flex flex-col items-center gap-2 mx-auto opacity-40 hover:opacity-70 transition-opacity"
        >
          <span className="text-xs" style={{ color: theme.textMuted }}>scroll</span>
          <div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: theme.textMuted }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ background: theme.textMuted }}
            />
          </div>
        </button>
      </div>
    </section>
  )
}
