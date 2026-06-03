import type { SeasonTheme } from '../types'
import { BOOKS } from '../data/books'
import type { ReadingStatus } from '../data/books'

const STATUS_LABEL: Record<ReadingStatus, string> = {
  'reading':      '📖 Reading',
  'want-to-read': '🔖 Up next',
  'done':         '✅ Done',
}

const TRAITS = [
  { label: 'Ambivert', desc: 'Energised by deep 1:1 conversations; recharges in a quiet room with a good book.', emoji: '🌗' },
  { label: 'Psych Reader', desc: 'Applies cognitive-bias frameworks to code reviews and team dynamics alike.', emoji: '🧩' },
  { label: 'Cloud Native', desc: 'Shipped to 300+ AWS teams at Amazon — infra is just code with good type safety.', emoji: '☁️' },
  { label: 'AI Builder', desc: 'Building agentic AI systems with LangChain, LangGraph, and Claude.', emoji: '🤖' },
]

interface Props { theme: SeasonTheme }

export default function About({ theme }: Props) {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader theme={theme} tag="// about_me" title="A bit about who I am" />

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {/* Left — bio */}
          <div>
            <p className="text-lg leading-relaxed mb-6" style={{ color: theme.textSecondary }}>
              I'm <Highlight theme={theme}>Sayali Kamble</Highlight> — a Software Engineer with 5+
              years across enterprise, cloud, and AI. I was an{' '}
              <Highlight theme={theme}>SDE at Amazon AWS</Highlight>, where I shipped a serverless
              platform used by 300+ internal teams. Before that, Accenture and CloudBig. Now I'm
              building AI agents and full-stack products of my own.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: theme.textSecondary }}>
              I hold an <Highlight theme={theme}>M.S. in Computer Science from UT Arlington</Highlight>{' '}
              and two <Highlight theme={theme}>Oracle Cloud Infrastructure certifications</Highlight>.
              My superpower is reading systems — and people. Growing up as an ambivert taught me
              when to listen, when to speak, and when to just ship it.
            </p>
            <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>
              Off-screen: I have a reading habit that borders on obsessive, a deep appreciation for
              cognitive psychology, and a non-negotiable relationship with good coffee ☕.
            </p>

            {/* Trait cards */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {TRAITS.map(t => (
                <div
                  key={t.label}
                  className="p-4 rounded-xl border transition-all hover:scale-105"
                  style={{
                    background: theme.bgCard,
                    borderColor: theme.border,
                  }}
                >
                  <div className="text-xl mb-1">{t.emoji}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                    {t.label}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: theme.textMuted }}>
                    {t.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — certs + bookshelf */}
          <div>
            {/* Certifications */}
            <h3
              className="font-serif text-lg font-bold mb-3 flex items-center gap-2"
              style={{ color: theme.textPrimary }}
            >
              <span>🏅</span> Certifications
            </h3>
            <div className="flex flex-col gap-2 mb-7">
              {[
                'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
                'Oracle Cloud Infrastructure 2023 Foundations Associate',
              ].map(cert => (
                <div
                  key={cert}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm"
                  style={{ background: theme.bgCard, borderColor: theme.border, color: theme.textSecondary }}
                >
                  <span className="text-base">✓</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            <h3
              className="font-serif text-lg font-bold mb-4 flex items-center gap-2"
              style={{ color: theme.textPrimary }}
            >
              <span>📖</span> Currently on my shelf
            </h3>
            <div className="flex flex-col gap-3">
              {BOOKS.map((book, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:translate-x-1"
                  style={{
                    background: theme.bgCard,
                    borderColor: theme.border,
                    borderLeft: `3px solid ${
                      book.status === 'reading' ? theme.primary :
                      book.status === 'done'    ? theme.accent :
                      theme.border
                    }`,
                  }}
                >
                  <span className="text-2xl">{book.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                        {book.title}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{ background: `${theme.primary}20`, color: theme.primary, whiteSpace: 'nowrap' }}>
                        {STATUS_LABEL[book.status]}
                      </span>
                    </div>
                    <div className="text-xs opacity-60 mt-0.5" style={{ color: theme.textMuted }}>
                      {book.author}{book.note ? ` · ${book.note}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlight({ theme, children }: { theme: SeasonTheme; children: React.ReactNode }) {
  return (
    <span
      className="font-semibold"
      style={{ color: theme.primary }}
    >
      {children}
    </span>
  )
}

export function SectionHeader({
  theme,
  tag,
  title,
}: {
  theme: SeasonTheme
  tag: string
  title: string
}) {
  return (
    <div>
      <span className="font-mono text-sm" style={{ color: theme.primary }}>
        {tag}
      </span>
      <h2
        className="font-serif text-3xl md:text-4xl font-bold mt-1"
        style={{ color: theme.textPrimary }}
      >
        {title}
      </h2>
      <div
        className="mt-3 h-0.5 w-16 rounded-full"
        style={{ background: `linear-gradient(90deg, ${theme.gradientFrom}, ${theme.gradientTo})` }}
      />
    </div>
  )
}
