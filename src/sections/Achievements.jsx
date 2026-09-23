import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiAward, FiFolder, FiGithub, FiLayers } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { achievements } from '../constants/portfolioData'

const achievementIcons = {
  'Projects Completed': FiFolder,
  'Certificates Earned': FiAward,
  'Technologies Learned': FiLayers,
  'GitHub Repositories': FiGithub,
}

const achievementAccents = [
  'achievement-projects',
  'achievement-certificates',
  'achievement-technologies',
  'achievement-repositories',
]

function AchievementCard({ item, index }) {
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const Icon = achievementIcons[item.label] ?? FiAward

  useEffect(() => {
    if (!started) return undefined
    const delay = index * 100
    const duration = 1100
    const startTime = performance.now() + delay
    let frame

    const updateCount = (now) => {
      if (now < startTime) {
        frame = requestAnimationFrame(updateCount)
        return
      }
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(item.value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(updateCount)
    }

    frame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(frame)
  }, [index, item.value, started])

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className={`achievement-card glass-card p-6 text-center sm:p-7 ${achievementAccents[index]}`}
      aria-label={`${item.value} ${item.label}`}
    >
      <span className="achievement-icon" aria-hidden="true"><Icon /></span>
      <data className="achievement-value" value={item.value}>{count}</data>
      <p className="mt-2 text-sm text-[#475569]">{item.label}</p>
    </motion.article>
  )
}

function Achievements() {
  return (
    <SectionShell id="achievements">
      <SectionHeading title="Achievements" subtitle="Impact" />
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {achievements.map((item, index) => (
          <AchievementCard key={item.label} item={item} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}

export default Achievements
