export type ReadingStatus = 'reading' | 'want-to-read' | 'done'

export interface Book {
  title: string
  author: string
  emoji: string
  status: ReadingStatus
  note?: string        // optional one-liner on why you want to read it
}

// ─────────────────────────────────────────────────────────────────────────────
// Edit this list freely — add, remove, reorder.
// status options:  'reading' | 'want-to-read' | 'done'
// ─────────────────────────────────────────────────────────────────────────────
export const BOOKS: Book[] = [
  // Currently reading
  { title: 'Thinking, Fast and Slow',      author: 'Daniel Kahneman',        emoji: '🧠', status: 'reading'       },
  { title: 'The Phoenix Project',          author: 'Kim, Behr & Spafford',   emoji: '🔥', status: 'reading'       },

  // Want to read
  { title: 'The Psychology of Money',      author: 'Morgan Housel',          emoji: '💰', status: 'want-to-read', note: 'Behavior > intelligence in investing'    },
  { title: 'Deep Work',                    author: 'Cal Newport',            emoji: '🎯', status: 'want-to-read', note: 'Focused work as a superpower'            },
  { title: 'The Pragmatic Programmer',     author: 'Hunt & Thomas',          emoji: '💻', status: 'want-to-read', note: 'Timeless engineering craft'              },
  { title: 'Designing Data-Intensive Apps',author: 'Martin Kleppmann',       emoji: '🗄️', status: 'want-to-read', note: 'Systems design bible'                   },

  // Done
  { title: 'Atomic Habits',                author: 'James Clear',            emoji: '⚡', status: 'done'          },
  { title: 'Clean Code',                   author: 'Robert C. Martin',       emoji: '🛠', status: 'done'          },
]
