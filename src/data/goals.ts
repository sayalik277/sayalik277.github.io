// ─────────────────────────────────────────────────────────────────────────────
// 2026 Quest Log — edit freely, tick items done, add new categories.
// ─────────────────────────────────────────────────────────────────────────────

export interface QuestItem {
  text: string
  done: boolean
  note?: string
}

export interface QuestCategory {
  emoji: string
  title: string
  color: 'primary' | 'secondary' | 'accent' | 'muted'
  items: QuestItem[]
}

export const QUEST_YEAR = '2026'

export const QUEST_CATEGORIES: QuestCategory[] = [
  {
    emoji: '📚',
    title: 'Books to Read',
    color: 'primary',
    items: [
      { text: 'Atomic Habits',                        done: false, note: 'James Clear' },
      { text: 'Designing Data-Intensive Applications', done: false, note: 'Martin Kleppmann' },
      { text: 'The Pragmatic Programmer',              done: false, note: 'Hunt & Thomas' },
      { text: 'A Little Life',                         done: false, note: 'Fiction pick' },
      { text: 'The Psychology of Money',               done: true,  note: 'Morgan Housel' },
    ],
  },
  {
    emoji: '🍳',
    title: 'Kitchen Goals',
    color: 'secondary',
    items: [
      { text: 'Homemade pasta from scratch',      done: false },
      { text: 'Classic French Onion Soup',         done: false, note: 'a French goal too' },
      { text: 'Sourdough bread',                   done: false, note: '100% hydration loaf' },
      { text: 'Sushi rolls at home',               done: false },
      { text: 'Miso ramen broth (6-hr simmer)',    done: false },
    ],
  },
  {
    emoji: '🌍',
    title: 'Languages',
    color: 'accent',
    items: [
      { text: 'French — reach A2 by December',     done: false, note: 'Duolingo streak + lessons' },
      { text: 'Read a French children\'s book',     done: false, note: 'Le Petit Prince 🌹' },
      { text: '5-min conversation in French',       done: false, note: 'stretch goal' },
    ],
  },
  {
    emoji: '🎯',
    title: 'Habits to Build',
    color: 'muted',
    items: [
      { text: 'Daily yoga — 90-day streak',         done: false },
      { text: 'Morning journal (5 min)',             done: false },
      { text: 'No phone for first 30 min',          done: false },
      { text: 'Weekly long outdoor walk',            done: false },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Hobbies — shows current hobbies + how each reflects an SE quality.
// seQuality: the engineering trait this hobby mirrors.
// Edit descriptions to keep them fresh and personal.
// ─────────────────────────────────────────────────────────────────────────────

export interface Hobby {
  emoji: string
  name: string
  level: string
  seQuality: string
  tagline: string
  description: string
}

export const HOBBIES: Hobby[] = [
  {
    emoji: '🍳',
    name: 'Cooking',
    level: 'Intermediate',
    seQuality: 'Iterative Development',
    tagline: 'A recipe is just an algorithm with tastier outputs.',
    description:
      'Every dish is a sprint. I plan the mise en place (architecture), execute the recipe (implementation), taste and adjust (debugging), then serve (ship). When a dish fails, I trace it back to root cause — wrong ratio, wrong heat, wrong timing. Cooking trained me to be systematic before being creative.',
  },
  {
    emoji: '🧘‍♀️',
    name: 'Yoga',
    level: 'Beginner',
    seQuality: 'Performance Optimization',
    tagline: 'Optimizing the hardware that runs the software.',
    description:
      'Yoga taught me that the body and mind are the same system. 15 minutes on the mat clears the stack, reduces context-switch latency, and sharpens focus for the next deep-work block. Flexibility in code and in posture is a feature, not a default — and both require consistent practice to maintain.',
  },
  {
    emoji: '📖',
    name: 'Reading',
    level: 'Enthusiast',
    seQuality: 'Knowledge Architecture',
    tagline: 'Books are open-source wisdom — curated commits from the world\'s best thinkers.',
    description:
      'I read across domains: psychology, systems thinking, economics, fiction. The best engineering insight I had this year came from Kahneman\'s System 1 vs System 2 thinking — it changed how I approach code reviews. Reading is how I import dependencies I didn\'t know I needed.',
  },
  {
    emoji: '🇫🇷',
    name: 'Learning French',
    level: 'A1 → A2',
    seQuality: 'New Language Runtime',
    tagline: 'Every engineer should be fluent in more than one language — human or machine.',
    description:
      'Learning French because staying a beginner sharpens empathy for junior devs. French grammar is surprisingly typed — gendered nouns feel like typed variables, verb conjugations like overloaded methods. Also, "débogage" is literally just debugging in French, which feels about right.',
  },
]
