import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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

      <div className="mb-8 flex flex-wrap gap-3">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? 'btn-primary'
                : 'btn-outline text-[#A0A8C0]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project, index) => {
          const Icon = project.icon
          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="project-card glass-card p-5 sm:p-6"
            >
              <div className="mb-6 overflow-hidden rounded-[18px] border border-[#E2E7F5] bg-[#F8FAFF] p-4">
                <div className="relative h-48 sm:h-56 md:h-[260px] w-full overflow-hidden rounded-[12px] bg-[#F3F6FF]">
                  {typeof Icon === 'string' ? (
                    <img
                      src={Icon}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover"
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
                    <li key={item} className="rounded-[12px] bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#4F46E5]">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3">
                  <a href={project.github} target="_blank" rel="noreferrer" className="social-pill">
                    <FiGithub /> GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer" className="social-pill">
                    <FiExternalLink /> Live Demo
                  </a>
                </div>
              </motion.article>
            )
          })}
      </div>
    </SectionShell>
  )
}

export default Projects
