import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { navItems } from '../constants/portfolioData'
import { useActiveSection } from '../hooks/useActiveSection'

function Navbar({ theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const panelRef = useRef(null)
  const firstLinkRef = useRef(null)
  const activeSection = useActiveSection(navItems.map((item) => item.id))

  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 140)
      setScrolled(y > 24)
      lastY = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Manage focus and body scroll when mobile panel opens
  useEffect(() => {
    if (mobileOpen) {
      // lock scroll
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      // focus first link
      setTimeout(() => firstLinkRef.current && firstLinkRef.current.focus(), 50)

      const onKey = (e) => {
        if (e.key === 'Escape') setMobileOpen(false)
        // simple focus trap: if TAB pressed and activeElement is last child, loop to first
        if (e.key === 'Tab' && panelRef.current) {
          const focusable = panelRef.current.querySelectorAll('a,button')
          if (focusable.length) {
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault(); first.focus()
            }
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault(); last.focus()
            }
          }
        }
      }

      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = prevOverflow
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`site-navbar fixed inset-x-0 top-0 z-40 mx-auto mt-4 w-[min(1100px,92%)] transition-all duration-300 ${
          hidden ? '-translate-y-[140px]' : 'translate-y-0'
        }`}
      >
        <nav aria-label="Primary navigation" className={`glass-card flex items-center justify-between rounded-2xl border border-[#E2E7F5] bg-white/75 px-4 backdrop-blur-xl md:px-6 ${scrolled ? 'navbar-scrolled py-2' : 'py-3'}`}>
        <a href="#hero" className="rounded-lg text-lg font-semibold tracking-[0.25em] text-[#0F172A]">
          HK
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link relative rounded-full px-3 py-2 text-sm transition ${
                  activeSection === item.id ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#475569] hover:bg-[#F8FAFF] hover:text-[#0F172A]'
                }`}
              >
                {item.label}
                <span className={`nav-link-underline absolute inset-x-1.5 -bottom-[2px] h-[2px] origin-center rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0891B2] transition-transform duration-300 ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="navbar-hire btn-outline hidden px-4 py-2 text-xs uppercase tracking-[0.2em] md:inline-flex"
        >
          Hire Me
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle ml-auto mr-2 inline-flex items-center justify-center rounded-xl border border-[#E2E7F5] bg-white p-2 text-[#0F172A] transition hover:border-[#4F46E5]/35 hover:text-[#4F46E5] md:ml-0"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              {theme === 'dark' ? <FiSun aria-hidden="true" className="h-5 w-5" /> : <FiMoon aria-hidden="true" className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-xl border border-[#E2E7F5] bg-white p-2 text-[#0F172A] transition hover:border-[#4F46E5]/35 hover:text-[#4F46E5] md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX aria-hidden="true" className="h-5 w-5" /> : <FiMenu aria-hidden="true" className="h-5 w-5" />}
        </button>
        </nav>
      </header>

      {/* Slide-over panel for mobile (rendered outside header so overlay can appear above) */}
      <div aria-hidden={!mobileOpen}>
        <div className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}>
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileOpen(false)}
          />

          <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className={`fixed right-0 top-0 bottom-0 z-60 w-80 max-w-full transform border-l border-[#E2E7F5] bg-[#F8FAFF] p-6 shadow-xl transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold tracking-[0.2em] text-[#0F172A]">HK</div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-[#E2E7F5] bg-white p-2 text-[#0F172A] transition hover:border-[#4F46E5]/35 hover:text-[#4F46E5]"
              >
                <FiX aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6">
              <ul className="flex flex-col gap-3">
                {navItems.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      ref={idx === 0 ? firstLinkRef : null}
                      href={`#${item.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${activeSection === item.id ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#475569] hover:bg-white hover:text-[#0F172A]'}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6">
              <a href="#contact" onClick={() => setMobileOpen(false)} className="block rounded bg-[#4F46E5]/10 px-3 py-2 text-sm font-semibold text-[#4F46E5]">
                Hire Me
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Navbar
