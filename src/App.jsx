import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import AnimatedCursor from './components/AnimatedCursor'
import InitialLoader from './components/InitialLoader'

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem('portfolio-theme-v2')
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
  return 'dark'
}

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Education = lazy(() => import('./sections/Education'))
const Certificates = lazy(() => import('./sections/Certificates'))
const Achievements = lazy(() => import('./sections/Achievements'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [lowPerformance] = useState(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4
    const isTouch = window.matchMedia('(pointer: coarse)').matches || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    return reducedMotion || lowCpu || lowMemory || isTouch
  })

  useEffect(() => {
    document.body.classList.toggle('low-perf-mode', lowPerformance)
    return () => document.body.classList.remove('low-perf-mode')
  }, [lowPerformance])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme-v2', theme)
  }, [theme])

  // Show loader on every full page load (including refresh). Previously this
  // was gated by sessionStorage so it only showed once per session.
  const [showInitialLoader, setShowInitialLoader] = useState(true)

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0F172A]">
        Skip to content
      </a>
      {showInitialLoader && (
        <InitialLoader duration={900} onFinish={() => setShowInitialLoader(false)} />
      )}
      <AnimatedCursor enabled={!lowPerformance} />
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
      <Suspense fallback={<div className="h-screen" />}>
        <main id="main-content">
          <Hero lowPerformance={lowPerformance} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certificates />
          <Achievements />
          <Contact />
          <Footer />
        </main>
      </Suspense>
    </>
  )
}

export default App
