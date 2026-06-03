export interface Skill {
  name: string
  level: number        // 0–100
  note?: string        // e.g. 'learning', 'certified', 'ex-Amazon'
}

export interface SkillGroup {
  title: string
  icon: string
  skills: Skill[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Edit freely — add skills you're learning, bump levels as you improve.
// level guide:  1–40 exploring · 41–65 learning · 66–80 proficient · 81–100 strong
// ─────────────────────────────────────────────────────────────────────────────
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Languages & Frontend',
    icon: '🖥',
    skills: [
      { name: 'Python',         level: 92 },
      { name: 'Java',           level: 85 },
      { name: 'TypeScript',     level: 82 },
      { name: 'JavaScript',     level: 85 },
      { name: 'React',          level: 80 },
      { name: 'HTML / CSS',     level: 88 },
    ],
  },
  {
    title: 'Backend & Frameworks',
    icon: '⚙️',
    skills: [
      { name: 'Spring Boot',            level: 85 },
      { name: 'FastAPI / Flask',        level: 88 },
      { name: 'REST APIs',              level: 90 },
      { name: 'LangChain / LangGraph',  level: 78 },
      { name: 'Material UI',            level: 80 },
      { name: 'AWS Lambda + API GW',    level: 88 },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: '☁️',
    skills: [
      { name: 'AWS (Lambda, EC2, S3, DynamoDB)', level: 90, note: 'ex-Amazon SDE' },
      { name: 'AWS CDK (TypeScript)',             level: 85 },
      { name: 'CloudFormation / IaC',            level: 85 },
      { name: 'Docker / Docker Compose',         level: 88 },
      { name: 'Amazon ECS / EKS',                level: 80 },
      { name: 'OCI (Oracle Cloud)',              level: 75, note: 'certified' },
      // ↓ Add new cloud/infra skills below
      { name: 'Terraform',                       level: 72, note: 'learning' },
    ],
  },
  {
    title: 'DevOps, Databases & Testing',
    icon: '🛠',
    skills: [
      { name: 'AWS CodePipeline / CodeBuild', level: 85 },
      { name: 'Jenkins / GitHub Actions',     level: 82 },
      { name: 'MySQL / DynamoDB / NoSQL',     level: 85 },
      { name: 'Jest / PyTest',                level: 80 },
      { name: 'Git / GitHub',                 level: 92 },
      // ↓ Add new devops/testing skills below
    ],
  },
  // ↓ Uncomment and fill in to add a whole new group (e.g. AI/ML)
  // {
  //   title: 'AI & Machine Learning',
  //   icon: '🤖',
  //   skills: [
  //     { name: 'PyTorch',      level: 68, note: 'learning' },
  //     { name: 'OpenCV',       level: 65 },
  //     { name: 'LangChain',    level: 78 },
  //   ],
  // },
]
