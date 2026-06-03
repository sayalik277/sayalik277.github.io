import { SectionHeader } from './About'
import { EXPERIENCE } from '../data/experience'
import type { SeasonTheme } from '../types'

interface Props { theme: SeasonTheme }

export default function Experience({ theme }: Props) {
  return (
    <section
      id="experience"
      className="py-24 px-6"
      style={{ background: theme.bgSecondary }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader theme={theme} tag="// experience" title="Where I've worked" />

        <div className="mt-16 relative">
          {/* Timeline spine */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary}, transparent)`,
            }}
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="relative md:pl-16">
                {/* Timeline dot */}
                <div
                  className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 hidden md:block"
                  style={{
                    background: item.current ? theme.primary : theme.bgCard,
                    borderColor: item.current ? theme.primary : theme.border,
                    boxShadow: item.current ? `0 0 12px ${theme.shadowGlow}` : 'none',
                  }}
                />

                <div
                  className="p-6 rounded-2xl border transition-all hover:shadow-lg"
                  style={{
                    background: theme.bgCard,
                    borderColor: item.current ? theme.primary : theme.border,
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="font-serif text-xl font-bold"
                        style={{ color: theme.textPrimary }}
                      >
                        {item.role}
                      </h3>
                      <div className="text-sm font-medium mt-0.5" style={{ color: theme.primary }}>
                        {item.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.current && (
                        <span
                          className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                          style={{
                            background: `${theme.primary}20`,
                            color: theme.primary,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: theme.primary }}
                          />
                          Current
                        </span>
                      )}
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full border"
                        style={{ borderColor: theme.border, color: theme.textMuted }}
                      >
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2 mb-5">
                    {item.description.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm" style={{ color: theme.textSecondary }}>
                        <span style={{ color: theme.primary }} className="mt-0.5 flex-shrink-0">
                          ▹
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map(t => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md font-mono border"
                        style={{
                          borderColor: theme.border,
                          color: theme.textMuted,
                          background: `${theme.bgSecondary}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
