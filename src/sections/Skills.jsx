import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiGlobe, FiServer, FiTool, FiUsers } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { skills } from '../constants/portfolioData'

const categoryIcons = {
  Frontend: FiCode,
  Backend: FiServer,
  Languages: FiGlobe,
  Tools: FiTool,
  'Soft Skills': FiUsers,
}

const categoryClasses = {
  Frontend: 'skill-category-frontend',
  Backend: 'skill-category-backend',
  Languages: 'skill-category-languages',
  Tools: 'skill-category-tools',
  'Soft Skills': 'skill-category-soft',
}

function SkillRow({ skill, visible, index }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return undefined
    const delay = index * 90
    const duration = 900
    const startTime = performance.now() + delay
    let frame

    const updateCount = (now) => {
      if (now < startTime) {
        frame = requestAnimationFrame(updateCount)
        return
      }
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(skill.level * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(updateCount)
    }

    frame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(frame)
  }, [index, skill.level, visible])

  return (
    <div className="skill-row">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm text-[#475569]">
        <span className="min-w-0 truncate">{skill.name}</span>
        <span className="skill-percentage shrink-0 font-medium text-[#4F46E5]">{count}%</span>
      </div>
      <div
        className="skill-progress-track h-2 overflow-hidden rounded-full bg-[#EEF2FF]"
        role="progressbar"
        aria-label={`${skill.name} skill level`}
        aria-valuenow={count}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="skill-progress-fill h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0891B2]"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            transition: visible ? `width 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 90}ms` : 'none',
            willChange: 'width',
          }}
        />
      </div>
    </div>
  )
}

function SkillCard({ category, list, index }) {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const Icon = categoryIcons[category]

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`skill-card glass-card p-5 sm:p-6 ${categoryClasses[category]} ${category === 'Soft Skills' ? 'md:col-span-2' : ''}`}
    >
      <h3 className="skill-category-heading text-xl font-medium text-[#0F172A]">
        <span className="skill-category-icon" aria-hidden="true"><Icon /></span>
        {category}
      </h3>
      <div className={`skill-list mt-5 ${category === 'Soft Skills' ? 'skills-soft-list md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0' : 'space-y-5'}`}>
        {list.map((skill, skillIndex) => (
          <SkillRow key={skill.name} skill={skill} visible={visible} index={skillIndex} />
        ))}
      </div>
    </motion.article>
  )
}

function Skills() {
  return (
    <SectionShell id="skills">
      <SectionHeading title="Skills" subtitle="Capabilities" />
      <div className="skills-grid grid grid-cols-1 gap-5 md:grid-cols-2">
        {Object.entries(skills).map(([category, list], index) => (
          <SkillCard key={category} category={category} list={list} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}

export default Skills
