import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { projectFilters, projects } from '../constants/portfolioData'

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <SectionShell id="projects">
      <SectionHeading title="Featured Projects" subtitle="Portfolio" />

      <div className="project-filters mb-8 flex max-w-full gap-2 overflow-x-auto p-1">
        {projectFilters.map((filter) => (
          <motion.button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            whileTap={{ scale: 0.95 }}
            aria-pressed={activeFilter === filter}
            className={`project-filter relative shrink-0 rounded-full px-4 py-2 text-sm transition ${activeFilter === filter ? 'is-active text-white' : 'text-[#475569]'}`}
          >
            {activeFilter === filter && <motion.span layoutId="project-filter-pill" className="project-filter-pill" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
            <span className="relative z-10">{filter}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={activeFilter} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="-mt-3 mb-6 text-sm text-[#64748B]" aria-live="polite">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </motion.p>
      </AnimatePresence>

      <motion.div layout className="project-grid grid items-stretch gap-6 md:grid-cols-2">
        {filteredProjects.map((project, index) => {
          const Icon = project.icon
          return (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.15, layout: { duration: 0.35 } }}
              className="project-card glass-card flex h-full flex-col p-5 sm:p-6"
            >
              <div className="project-mockup mb-6 overflow-hidden rounded-[18px] border border-[#E2E7F5] bg-[#F8FAFF] p-4">
                <div className="relative h-48 sm:h-56 md:h-[260px] w-full overflow-hidden rounded-[12px] bg-[#F3F6FF]">
                  {typeof Icon === 'string' ? (
                    <img
                      src={Icon}
                      alt={`${project.title} app interface screenshot`}
                      className="project-mockup-image h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-950">
                      <Icon className="text-5xl text-white/85" />
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-medium text-[#0F172A]">{project.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#475569]">{project.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li key={item} className="project-tech-tag rounded-[12px] bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#4F46E5]">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="project-actions mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <a href={project.github} target="_blank" rel="noreferrer" className="project-github social-pill" aria-label={`View ${project.title} on GitHub`}>
                    <FiGithub aria-hidden="true" /> GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer" className="project-demo social-pill" aria-label={`Open live demo for ${project.title}`}>
                    <FiExternalLink aria-hidden="true" className="project-external-icon" /> Live Demo
                  </a>
                </div>
              </motion.article>
            )
          })}
      </motion.div>
    </SectionShell>
  )
}

export default Projects
