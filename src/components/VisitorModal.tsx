import { useState } from 'react'
import type { SeasonTheme } from '../types'

interface Props {
  theme: SeasonTheme
  onSubmit: (name: string | null) => void
}

export default function VisitorModal({ theme, onSubmit }: Props) {
  const [name, setName] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onSubmit(null)}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 shadow-2xl border animate-slide-up"
        style={{
          background: theme.bgCard,
          borderColor: theme.border,
          boxShadow: `0 25px 60px ${theme.shadowGlow}`,
        }}
      >
        {/* Season badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{theme.emoji}</span>
          <span className="text-sm font-medium opacity-60" style={{ color: theme.textSecondary }}>
            {theme.greeting}
          </span>
        </div>

        <h2
          className="font-serif text-2xl font-bold mb-2"
          style={{ color: theme.textPrimary }}
        >
          Welcome to my corner of the internet
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: theme.textSecondary }}>
          I'm a developer who reads too many psychology books and drinks too much coffee.
          Mind sharing your name so I know who stopped by?{' '}
          <span className="opacity-60">(totally optional)</span>
        </p>

        <input
          type="text"
          placeholder="Your name…"
          value={name}
          maxLength={60}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit(name || null)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all mb-4 font-sans"
          style={{
            background: theme.bgSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
          autoFocus
        />

        <div className="flex gap-3">
          <button
            onClick={() => onSubmit(name || null)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
              color: '#fff',
            }}
          >
            {name.trim() ? `Hey, I'm ${name.trim()} 👋` : 'Sign the guestbook'}
          </button>
          <button
            onClick={() => onSubmit(null)}
            className="px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-70"
            style={{ color: theme.textMuted }}
          >
            Skip
          </button>
        </div>

        <p className="text-xs mt-4 opacity-40 text-center" style={{ color: theme.textMuted }}>
          Your name is only visible to me in my admin panel.
        </p>
      </div>
    </div>
  )
}
