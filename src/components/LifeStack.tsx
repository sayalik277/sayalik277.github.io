import type { SeasonTheme } from '../types'
import { SectionHeader } from './About'
import { QUEST_CATEGORIES, QUEST_YEAR, HOBBIES } from '../data/goals'
import type { QuestCategory } from '../data/goals'

interface Props { theme: SeasonTheme }

export default function SideQuests({ theme }: Props) {
  return (
    <section id="side-quests" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          theme={theme}
          tag="// side_quests"
          title="Side Quests"
        />
        <p className="mt-4 text-base max-w-2xl" style={{ color: theme.textMuted }}>
          Things I'm learning, building, and exploring — beyond the codebase. Every engineer
          is more than their stack.
        </p>

        {/* ── 2026 Quest Log ──────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="font-serif text-xl font-bold" style={{ color: theme.textPrimary }}>
              {QUEST_YEAR} Quest Log
            </h3>
            <span
              className="font-mono text-xs px-2 py-1 rounded-full border"
              style={{ borderColor: theme.border, color: theme.textMuted }}
            >
              in progress
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUEST_CATEGORIES.map(cat => (
              <QuestColumn key={cat.title} cat={cat} theme={theme} />
            ))}
          </div>
        </div>

        {/* ── Hobbies ─────────────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-serif text-xl font-bold" style={{ color: theme.textPrimary }}>
              Off-Screen
            </h3>
          </div>
          <p className="text-sm mb-8" style={{ color: theme.textMuted }}>
            Current hobbies — and what each one quietly says about how I think as an engineer.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {HOBBIES.map(hobby => (
              <HobbyCard key={hobby.name} hobby={hobby} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function QuestColumn({ cat, theme }: { cat: QuestCategory; theme: SeasonTheme }) {
  const done  = cat.items.filter(i => i.done).length
  const total = cat.items.length
  const pct   = Math.round((done / total) * 100)

  const accentColor =
    cat.color === 'primary'   ? theme.primary :
    cat.color === 'secondary' ? theme.secondary :
    cat.color === 'accent'    ? theme.accent :
    theme.textMuted

  return (
    <div
      className="p-5 rounded-2xl border flex flex-col gap-4"
      style={{ background: theme.bgCard, borderColor: theme.border }}
    >
      {/* Header */}
      <div>
        <div className="text-2xl mb-2">{cat.emoji}</div>
        <div className="font-semibold text-sm" style={{ color: theme.textPrimary }}>
          {cat.title}
        </div>

        {/* Progress bar */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ background: `${accentColor}20` }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: accentColor }}
            />
          </div>
          <span className="text-xs font-mono" style={{ color: accentColor }}>
            {done}/{total}
          </span>
        </div>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-2.5">
        {cat.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-0.5 text-sm flex-shrink-0"
              style={{ color: item.done ? accentColor : theme.border }}
            >
              {item.done ? '✓' : '○'}
            </span>
            <div className="min-w-0">
              <span
                className="text-xs leading-snug"
                style={{
                  color: item.done ? theme.textMuted : theme.textSecondary,
                  textDecoration: item.done ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </span>
              {item.note && (
                <div className="text-xs mt-0.5 opacity-50" style={{ color: theme.textMuted }}>
                  {item.note}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HobbyCard({ hobby, theme }: { hobby: (typeof HOBBIES)[0]; theme: SeasonTheme }) {
  return (
    <div
      className="p-6 rounded-2xl border transition-all hover:-translate-y-0.5"
      style={{ background: theme.bgCard, borderColor: theme.border }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{hobby.emoji}</span>
          <div>
            <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>
              {hobby.name}
            </div>
            <div
              className="text-xs mt-0.5 font-mono px-1.5 py-0.5 rounded inline-block"
              style={{ background: `${theme.primary}18`, color: theme.primary }}
            >
              {hobby.level}
            </div>
          </div>
        </div>

        {/* SE quality badge */}
        <div
          className="text-xs px-2.5 py-1 rounded-full border whitespace-nowrap flex-shrink-0"
          style={{
            borderColor: theme.border,
            color: theme.textMuted,
            background: `${theme.secondary}12`,
          }}
        >
          ⚙ {hobby.seQuality}
        </div>
      </div>

      <p className="text-sm italic mb-3 leading-snug" style={{ color: theme.primary }}>
        "{hobby.tagline}"
      </p>

      <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
        {hobby.description}
      </p>
    </div>
  )
}
