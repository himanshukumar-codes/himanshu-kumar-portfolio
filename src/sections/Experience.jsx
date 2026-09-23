import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../constants/portfolioData'

function Experience() {
  const timelineRef = useRef(null)
  const [lineProgress, setLineProgress] = useState(0)
  const [lineBounds, setLineBounds] = useState({ top: 0, bottom: 0 })

  useEffect(() => {
    const updateLineProgress = () => {
      const timeline = timelineRef.current
      if (!timeline) return
      const rect = timeline.getBoundingClientRect()
      const dots = timeline.querySelectorAll('.experience-dot')
      if (!dots.length) return
      const firstDot = dots[0].getBoundingClientRect()
      const lastDot = dots[dots.length - 1].getBoundingClientRect()
      const top = firstDot.top + firstDot.height / 2 - rect.top
      const bottom = lastDot.top + lastDot.height / 2 - rect.top
      setLineBounds({ top, bottom })
      const viewportPoint = window.innerHeight * 0.62
      const progress = Math.min(Math.max((viewportPoint - (rect.top + top)) / (bottom - top), 0), 1)
      setLineProgress(progress)
    }

    updateLineProgress()
    window.addEventListener('scroll', updateLineProgress, { passive: true })
    window.addEventListener('resize', updateLineProgress)
    return () => {
      window.removeEventListener('scroll', updateLineProgress)
      window.removeEventListener('resize', updateLineProgress)
    }
  }, [])

  return (
    <SectionShell id="experience">
      <SectionHeading title="Experience" subtitle="Career" />
      <div ref={timelineRef} className="experience-timeline" style={{ '--experience-line-top': `${lineBounds.top}px`, '--experience-line-bottom': `${lineBounds.bottom}px` }}>
        <span className="experience-line-progress" aria-hidden="true" style={{ transform: `scaleY(${lineProgress})` }} />
        <ol className="relative space-y-10 pl-7 sm:pl-10">
          {experience.map((item, index) => {
            const isCurrent = item.period.toLowerCase().includes('present')
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="experience-item relative"
              >
                <span className={`experience-dot ${isCurrent ? 'experience-dot-current' : ''}`} aria-hidden="true" />
                <article className="experience-card glass-card p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="experience-period text-sm font-semibold uppercase tracking-[0.2em]">{item.period}</p>
                    {isCurrent && <span className="experience-current"><span aria-hidden="true" /> Current</span>}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="experience-company mt-1 inline-flex items-center gap-2 text-sm"><FiBriefcase aria-hidden="true" />{item.company}</p>
                  <p className="mt-4 text-sm leading-8 text-[#475569]">{item.details}</p>
                </article>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </SectionShell>
  )
}

export default Experience
