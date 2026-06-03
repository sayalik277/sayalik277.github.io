import { SectionHeader } from './About'
import { PROJECTS } from '../data/projects'
import type { SeasonTheme } from '../types'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const STATUS_LABELS: Record<string, string> = {
  live: 'Live',
  wip: 'WIP',
  archived: 'Archived',
}

interface Props { theme: SeasonTheme }

export default function Projects({ theme }: Props) {
  const featured = PROJECTS.filter(p => p.featured)
  const rest = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader theme={theme} tag="// projects" title="Things I've built" />

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {featured.map(project => (
            <ProjectCard key={project.id} project={project} theme={theme} large />
          ))}
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <h3
              className="font-mono text-sm mt-14 mb-6"
              style={{ color: theme.textMuted }}
            >
              other noteworthy projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {rest.map(project => (
                <ProjectCard key={project.id} project={project} theme={theme} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  theme,
  large = false,
}: {
  project: (typeof PROJECTS)[0]
  theme: SeasonTheme
  large?: boolean
}) {
  return (
    <div
      className="group relative p-6 rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: theme.bgCard,
        borderColor: theme.border,
        boxShadow: `0 4px 20px transparent`,
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${theme.shadowGlow}`
        ;(e.currentTarget as HTMLDivElement).style.borderColor = theme.primary
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px transparent'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = theme.border
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background:
                project.status === 'live'
                  ? `${theme.primary}22`
                  : `${theme.textMuted}22`,
              color: project.status === 'live' ? theme.primary : theme.textMuted,
            }}
          >
            {STATUS_LABELS[project.status]}
          </span>
          <span className="text-xs opacity-40" style={{ color: theme.textMuted }}>
            {project.year}
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-lg transition-colors hover:scale-110"
              style={{ color: theme.textSecondary }}
            >
              <FiGithub />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-lg transition-colors hover:scale-110"
              style={{ color: theme.textSecondary }}
            >
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      <h3
        className={`font-serif font-bold mb-2 ${large ? 'text-xl' : 'text-lg'}`}
        style={{ color: theme.textPrimary }}
      >
        {project.title}
      </h3>

      <p
        className="text-sm leading-relaxed flex-1 mb-4"
        style={{ color: theme.textSecondary }}
      >
        {large ? project.longDescription : project.description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-md font-mono"
            style={{
              background: `${theme.accent}18`,
              color: theme.accent,
              border: `1px solid ${theme.accent}30`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
