import { useQuery } from '@tanstack/react-query'
import { scrumApi } from '../api/client'
import { SectionHeader } from './About'
import type { ScrumItem, SeasonTheme } from '../types'

const COLUMNS: { key: ScrumItem['status']; label: string; emoji: string }[] = [
  { key: 'todo', label: 'To Do', emoji: '📋' },
  { key: 'in_progress', label: 'In Progress', emoji: '⚡' },
  { key: 'done', label: 'Done', emoji: '✅' },
]

const PRIORITY_DOT: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
}

const CATEGORY_COLORS: Record<string, string> = {
  Project: '#6366f1',
  Learning: '#0ea5e9',
  Cloud: '#06b6d4',
  Reading: '#ec4899',
  Default: '#8b5cf6',
}

interface Props { theme: SeasonTheme }

export default function ScrumBoard({ theme }: Props) {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['scrum'],
    queryFn: scrumApi.list,
    refetchInterval: 30_000,
  })

  const byStatus = (status: ScrumItem['status']) => items.filter(i => i.status === status)

  return (
    <section id="scrum" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          theme={theme}
          tag="// now"
          title="My daily track record"
        />
        <p className="mt-3 text-sm" style={{ color: theme.textMuted }}>
          Live scrum board — updated by me, visible to you.
        </p>

        {isLoading ? (
          <div className="mt-12 text-center py-12" style={{ color: theme.textMuted }}>
            Loading board…
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {COLUMNS.map(col => (
              <div key={col.key}>
                {/* Column header */}
                <div
                  className="flex items-center justify-between mb-4 pb-3 border-b"
                  style={{ borderColor: theme.border }}
                >
                  <div
                    className="flex items-center gap-2 font-semibold text-sm"
                    style={{ color: theme.textPrimary }}
                  >
                    <span>{col.emoji}</span>
                    {col.label}
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                  >
                    {byStatus(col.key).length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3">
                  {byStatus(col.key).length === 0 ? (
                    <div
                      className="text-center py-8 rounded-xl border border-dashed text-xs"
                      style={{ borderColor: theme.border, color: theme.textMuted }}
                    >
                      empty
                    </div>
                  ) : (
                    byStatus(col.key).map(item => (
                      <ScrumCard key={item.id} item={item} theme={theme} />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ScrumCard({ item, theme }: { item: ScrumItem; theme: SeasonTheme }) {
  const catColor = CATEGORY_COLORS[item.category ?? ''] ?? CATEGORY_COLORS.Default

  return (
    <div
      className="p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: theme.bgCard,
        borderColor: theme.border,
        borderLeft: item.is_pinned ? `3px solid ${theme.primary}` : `3px solid ${catColor}40`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          {item.is_pinned && (
            <span className="text-xs" title="Pinned">📌</span>
          )}
          {item.category && (
            <span
              className="text-xs px-1.5 py-0.5 rounded font-medium"
              style={{ background: `${catColor}20`, color: catColor }}
            >
              {item.category}
            </span>
          )}
        </div>
        <span
          className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
          title={`${item.priority} priority`}
          style={{ background: PRIORITY_DOT[item.priority] ?? '#999' }}
        />
      </div>

      <p className="text-sm font-medium mb-1" style={{ color: theme.textPrimary }}>
        {item.title}
      </p>
      {item.description && (
        <p className="text-xs leading-relaxed opacity-70" style={{ color: theme.textSecondary }}>
          {item.description}
        </p>
      )}
    </div>
  )
}
