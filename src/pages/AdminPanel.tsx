import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scrumApi, visitorsApi } from '../api/client'
import type { ScrumItem, SeasonTheme } from '../types'
import { Link } from 'react-router-dom'

const TOKEN_KEY = 'portfolio_admin_token'

interface Props { theme: SeasonTheme }

export default function AdminPanel({ theme }: Props) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? '')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<'visitors' | 'scrum'>('visitors')
  const [newItem, setNewItem] = useState<Partial<ScrumItem>>({ status: 'todo', priority: 'medium' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const qc = useQueryClient()

  const handleLogin = async () => {
    try {
      await scrumApi.verifyToken(token)
      localStorage.setItem(TOKEN_KEY, token)
      setAuthed(true)
      setAuthError('')
    } catch {
      setAuthError('Invalid token. Check your backend .env ADMIN_TOKEN.')
    }
  }

  const { data: visitors = [] } = useQuery({
    queryKey: ['admin-visitors', token],
    queryFn: () => visitorsApi.list(token),
    enabled: authed,
  })

  const { data: scrum = [] } = useQuery({
    queryKey: ['scrum'],
    queryFn: scrumApi.list,
    enabled: authed,
  })

  const createMutation = useMutation({
    mutationFn: () => scrumApi.create(token, newItem),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scrum'] })
      setNewItem({ status: 'todo', priority: 'medium' })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ScrumItem> }) =>
      scrumApi.update(token, id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scrum'] })
      setEditingId(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => scrumApi.remove(token, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['scrum'] }),
  })

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: theme.bgPrimary }}
      >
        <div
          className="w-full max-w-sm p-8 rounded-2xl border"
          style={{ background: theme.bgCard, borderColor: theme.border }}
        >
          <Link to="/" className="text-sm mb-6 block opacity-50 hover:opacity-80" style={{ color: theme.textMuted }}>
            ← Back to portfolio
          </Link>
          <h1 className="font-serif text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>
            Admin Panel
          </h1>
          <p className="text-xs mb-6" style={{ color: theme.textMuted }}>
            Enter your ADMIN_TOKEN from the backend .env
          </p>
          <input
            type="password"
            placeholder="Admin token…"
            value={token}
            onChange={e => setToken(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 rounded-xl text-sm border outline-none mb-3"
            style={{
              background: theme.bgSecondary,
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
          />
          {authError && (
            <p className="text-xs text-red-400 mb-3">{authError}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl text-sm font-semibold"
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
              color: '#fff',
            }}
          >
            Unlock
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: theme.bgPrimary }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="text-sm opacity-50 hover:opacity-80 mb-2 block" style={{ color: theme.textMuted }}>
              ← Back to portfolio
            </Link>
            <h1 className="font-serif text-3xl font-bold" style={{ color: theme.textPrimary }}>
              Admin Panel
            </h1>
          </div>
          <button
            onClick={() => { setAuthed(false); localStorage.removeItem(TOKEN_KEY) }}
            className="text-xs px-3 py-1.5 rounded-lg border"
            style={{ borderColor: theme.border, color: theme.textMuted }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['visitors', 'scrum'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={
                tab === t
                  ? {
                      background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                      color: '#fff',
                    }
                  : { background: theme.bgCard, color: theme.textSecondary, border: `1px solid ${theme.border}` }
              }
            >
              {t === 'visitors' ? `Visitors (${visitors.length})` : `Scrum Board (${scrum.length})`}
            </button>
          ))}
        </div>

        {/* Visitors tab */}
        {tab === 'visitors' && (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: theme.border }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: theme.bgCard }}>
                  {['#', 'Name', 'IP', 'Visited At'].map(h => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold"
                      style={{ color: theme.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visitors.map(v => (
                  <tr
                    key={v.id}
                    className="border-t transition-colors"
                    style={{ borderColor: theme.border }}
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = theme.bgCard)}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                  >
                    <td className="px-4 py-3 font-mono opacity-40" style={{ color: theme.textMuted }}>{v.id}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: theme.textPrimary }}>
                      {v.name ?? <span className="opacity-30 italic">anonymous</span>}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: theme.textMuted }}>{v.ip_address ?? '—'}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: theme.textSecondary }}>
                      {new Date(v.visited_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visitors.length === 0 && (
              <div className="text-center py-12 text-sm" style={{ color: theme.textMuted }}>
                No visitors yet — share your portfolio!
              </div>
            )}
          </div>
        )}

        {/* Scrum tab */}
        {tab === 'scrum' && (
          <div className="space-y-4">
            {/* Add item */}
            <div
              className="p-5 rounded-2xl border"
              style={{ background: theme.bgCard, borderColor: theme.border }}
            >
              <h3 className="font-semibold text-sm mb-4" style={{ color: theme.textPrimary }}>
                Add new item
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input theme={theme} placeholder="Title*" value={newItem.title ?? ''} onChange={v => setNewItem(p => ({ ...p, title: v }))} />
                <Input theme={theme} placeholder="Description" value={newItem.description ?? ''} onChange={v => setNewItem(p => ({ ...p, description: v }))} />
                <Input theme={theme} placeholder="Category (Project / Learning / Cloud / Reading)" value={newItem.category ?? ''} onChange={v => setNewItem(p => ({ ...p, category: v }))} />
                <div className="flex gap-2">
                  <Select theme={theme} value={newItem.status ?? 'todo'} onChange={v => setNewItem(p => ({ ...p, status: v as ScrumItem['status'] }))}>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </Select>
                  <Select theme={theme} value={newItem.priority ?? 'medium'} onChange={v => setNewItem(p => ({ ...p, priority: v as ScrumItem['priority'] }))}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </div>
              </div>
              <button
                onClick={() => newItem.title && createMutation.mutate()}
                disabled={!newItem.title}
                className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                  color: '#fff',
                }}
              >
                {createMutation.isPending ? 'Adding…' : '+ Add Item'}
              </button>
            </div>

            {/* Item list */}
            {scrum.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl border flex items-start justify-between gap-4"
                style={{ background: theme.bgCard, borderColor: theme.border }}
              >
                {editingId === item.id ? (
                  <EditRow
                    item={item}
                    theme={theme}
                    onSave={data => updateMutation.mutate({ id: item.id, data })}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs opacity-50" style={{ color: theme.textMuted }}>[{item.status}]</span>
                        <span className="font-medium text-sm" style={{ color: theme.textPrimary }}>{item.title}</span>
                      </div>
                      {item.description && (
                        <p className="text-xs opacity-60 truncate" style={{ color: theme.textSecondary }}>{item.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="text-xs px-2 py-1 rounded border"
                        style={{ borderColor: theme.border, color: theme.textSecondary }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        className="text-xs px-2 py-1 rounded border border-red-500/30 text-red-400"
                      >
                        Del
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EditRow({
  item,
  theme,
  onSave,
  onCancel,
}: {
  item: ScrumItem
  theme: SeasonTheme
  onSave: (data: Partial<ScrumItem>) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState<Partial<ScrumItem>>({ ...item })
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="grid sm:grid-cols-2 gap-2">
        <Input theme={theme} placeholder="Title" value={draft.title ?? ''} onChange={v => setDraft(p => ({ ...p, title: v }))} />
        <Input theme={theme} placeholder="Description" value={draft.description ?? ''} onChange={v => setDraft(p => ({ ...p, description: v }))} />
        <Input theme={theme} placeholder="Category" value={draft.category ?? ''} onChange={v => setDraft(p => ({ ...p, category: v }))} />
        <div className="flex gap-2">
          <Select theme={theme} value={draft.status ?? 'todo'} onChange={v => setDraft(p => ({ ...p, status: v as ScrumItem['status'] }))}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
          <Select theme={theme} value={draft.priority ?? 'medium'} onChange={v => setDraft(p => ({ ...p, priority: v as ScrumItem['priority'] }))}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(draft)} className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: theme.primary, color: '#fff' }}>Save</button>
        <button onClick={onCancel} className="text-xs px-3 py-1.5 rounded-lg border" style={{ borderColor: theme.border, color: theme.textMuted }}>Cancel</button>
      </div>
    </div>
  )
}

function Input({ theme, placeholder, value, onChange }: { theme: SeasonTheme; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
      style={{ background: theme.bgSecondary, borderColor: theme.border, color: theme.textPrimary }}
    />
  )
}

function Select({ theme, value, onChange, children }: { theme: SeasonTheme; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="flex-1 px-3 py-2 rounded-lg text-sm border outline-none"
      style={{ background: theme.bgSecondary, borderColor: theme.border, color: theme.textPrimary }}
    >
      {children}
    </select>
  )
}
