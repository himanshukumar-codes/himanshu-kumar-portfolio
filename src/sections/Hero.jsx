import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiFileText } from 'react-icons/fi'
import { socialLinks } from '../constants/portfolioData'
import SectionShell from '../components/SectionShell'
import MagneticButton from '../components/MagneticButton'

const titles = [
  'Full Stack Developer',
  'React Developer',
  'MERN Stack Developer',
  'Open Source Enthusiast',
  'Problem Solver',
]

const allParticles = Array.from({ length: 16 }, (_, i) => {
  const seed = (i * 37) % 100
  return {
    id: i,
    left: `${seed}%`,
    top: `${(seed * 1.7) % 100}%`,
    delay: `${(i % 7) * 0.5}s`,
    size: `${2 + (i % 4)}px`,
  }
})

function Hero({ lowPerformance = false }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  useEffect(() => {
    let cursor = 0
    let forward = true
    let timer

    const type = () => {
      const current = titles[titleIndex]
      if (forward) {
        cursor += 1
        setText(current.slice(0, cursor))
        if (cursor === current.length) {
          setTyping(false)
          timer = window.setTimeout(() => {
            forward = false
            setTyping(true)
            type()
          }, 1200)
          return
        }
      } else {
        cursor -= 1
        setText(current.slice(0, cursor))
        if (cursor === 0) {
          forward = true
          setTitleIndex((prev) => (prev + 1) % titles.length)
        }
      }
      timer = window.setTimeout(type, forward ? 100 : 50)
    }

    type()
    return () => window.clearTimeout(timer)
  }, [titleIndex])

  const glowStyle = useMemo(() => ({
    background: `radial-gradient(circle 260px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(6, 182, 212, 0.18), transparent 70%)`,
  }), [cursorPosition.x, cursorPosition.y])

  return (
    <SectionShell id="hero" className="min-h-screen pt-36">
      <div className="hero-bg" />
      {(lowPerformance ? allParticles.slice(0, 12) : allParticles).map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-[2]" style={glowStyle} />
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <div className="eyebrow">Hi, I&apos;m</div>
          <h1 className="mt-5 text-5xl font-semibold leading-tight text-[#0F172A] sm:text-6xl md:text-7xl">
            Himanshu Kumar
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#475569] sm:text-xl">
            Computer Science Engineering student passionate about building modern, fast, and user-friendly web applications with clean code and exceptional user experiences.
          </p>
          <p className="mt-6 text-xl font-medium text-[#4F46E5] sm:text-2xl">
            {text}
            <span className="typing-cursor">|</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#475569]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1.5 font-medium text-[#166534]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Available for opportunities
            </span>
            <span className="text-[#64748B]">Based in India</span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              type="button"
              className="btn-primary"
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/Himanshu_Kumar_Resume.pdf'
                link.click()
              }}
            >
              <FiFileText aria-hidden="true" />
              View Resume
            </MagneticButton>
            <a href="#contact" className="btn-outline" aria-label="Go to contact section">
              Let&apos;s work together
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="hover-target social-pill"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[430px]"
          style={{ transformPerspective: 1100 }}
        >
          <div className="hero-photo-frame glass-card relative overflow-hidden rounded-[3rem] p-4">
            <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#6366F1]/20" />
            <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#22D3EE]/15" />
            <div className="hero-photo-stage relative z-10 rounded-[2.5rem] overflow-hidden">
              <img
                src="/images/hh.jpg"
                alt="Himanshu Kumar"
                className="w-full h-56 sm:h-72 md:h-[420px] lg:h-[480px] rounded-[2.5rem] object-cover object-top"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <span />
      </a>
    </SectionShell>
  )
}

export default Hero
