import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { skills } from '../constants/portfolioData'

function Skills() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('skills')
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.15) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: [0.15, 0.5] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionShell id="skills">
      <SectionHeading title="Skills" subtitle="Capabilities" />
      <div className="grid gap-5 md:grid-cols-2">
        {Object.entries(skills).map(([category, list], index) => (
          <motion.article
            key={category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="skill-card glass-card p-5 sm:p-6"
          >
            <h3 className="text-xl font-medium text-[#0F172A]">{category}</h3>
            <div className="mt-5 space-y-4">
              {list.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between text-sm text-[#475569]">
                    <span>{skill.name}</span>
                    <span className="font-medium text-[#4F46E5]">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#EEF2FF]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0891B2]"
                      style={{
                        width: visible ? `${skill.level}%` : '0%',
                        transition: visible ? 'width 1.8s ease-out 0.12s' : 'none',
                        willChange: 'width',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  )
}

export default Skills
