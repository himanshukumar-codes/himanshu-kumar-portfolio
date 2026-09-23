import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { education } from '../constants/portfolioData'

function Education() {
  return (
    <SectionShell id="education">
      <SectionHeading title="Education" subtitle="Academic" />
      <div className="education-grid grid items-stretch gap-5 md:grid-cols-2">
        {education.map((item, index) => {
          const isCurrent = item.period === '2024 - 2028'
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              className={`education-card glass-card h-full p-5 sm:p-6 ${index === education.length - 1 ? 'education-card-last md:col-span-2' : ''}`}
            >
              <div className="education-card-main">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="education-period text-xs font-semibold uppercase tracking-[0.2em]">{item.period}</p>
                  {isCurrent && <span className="education-current">Current</span>}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">{item.title}</h3>
                <p className="education-institute mt-2 inline-flex items-center gap-2 text-sm"><FiBookOpen aria-hidden="true" />{item.institute}</p>
              </div>
              <p className="education-details mt-4 text-sm leading-8 text-[#475569]">{item.details}</p>
            </motion.article>
          )
        })}
      </div>
    </SectionShell>
  )
}

export default Education
