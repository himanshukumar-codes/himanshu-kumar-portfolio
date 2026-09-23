import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiCode, FiFolder, FiGithub } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal from '../components/ScrollReveal'
import { stats } from '../constants/portfolioData'

const statIcons = {
  Projects: FiFolder,
  Skills: FiCode,
  'GitHub Repositories': FiGithub,
  Experience: FiClock,
}

const statAccents = ['about-stat-projects', 'about-stat-skills', 'about-stat-repositories', 'about-stat-experience']

function AnimatedStat({ item, index }) {
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const numericValue = Number.parseInt(item.value, 10)
  const suffix = item.value.slice(String(numericValue).length)
  const Icon = statIcons[item.label] ?? FiCode

  useEffect(() => {
    if (!started) return undefined
    const duration = 900
    const startTime = performance.now()
    let frame

    const updateCount = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(numericValue * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(updateCount)
    }

    frame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(frame)
  }, [numericValue, started])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`about-stat-card glass-card p-5 ${statAccents[index]}`}
    >
      <span className="about-stat-icon" aria-hidden="true"><Icon /></span>
      <data className="about-stat-value" value={item.value} aria-label={`${item.value} ${item.label}`}>
        {count}{suffix}
      </data>
      <p className="mt-1 text-sm text-[#475569]">{item.label}</p>
    </motion.article>
  )
}

function About() {
  return (
    <SectionShell id="about">
      <SectionHeading title="About Me" subtitle="Journey" />
      <div className="grid gap-8 items-stretch md:grid-cols-[1.05fr_1.3fr]">
        <ScrollReveal className="about-photo-card glass-card relative h-full overflow-hidden p-3 sm:p-4">
          <div className="about-photo-pattern" aria-hidden="true" />
          <img
            src="/images/himu.jpg"
            alt="Himanshu Kumar - Computer Science Engineering student"
            className="about-photo relative z-10 h-full w-full rounded-[2rem] object-cover"
            loading="lazy"
          />
        </ScrollReveal>

        <div className="about-timeline space-y-6">
          <ScrollReveal delay={0.05} className="about-timeline-item">
            <span className="about-timeline-marker" aria-hidden="true">01</span>
            I’m a Computer Science Engineering student with a strong passion for full-stack web development. I enjoy building responsive, modern, and user-friendly web applications while continuously learning new technologies.
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="about-timeline-item">
            <span className="about-timeline-marker" aria-hidden="true">02</span>
            My primary tech stack includes React, Node.js, Express.js, MongoDB, and JavaScript. I love solving real-world problems through clean, efficient, and scalable code.
          </ScrollReveal>
          <ScrollReveal delay={0.35} className="about-timeline-item">
            <span className="about-timeline-marker" aria-hidden="true">03</span>
            Beyond coding, I focus on improving my problem-solving skills, exploring new technologies, contributing to personal projects, and growing as a software developer every day.
          </ScrollReveal>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((item, index) => (
          <AnimatedStat key={item.label} item={item} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}

export default About
