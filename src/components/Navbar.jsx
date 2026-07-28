import { useEffect, useRef, useState } from 'react'
import { navItems } from '../constants/portfolioData'
import { useActiveSection } from '../hooks/useActiveSection'

function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const panelRef = useRef(null)
  const firstLinkRef = useRef(null)
  const activeSection = useActiveSection(navItems.map((item) => item.id))

  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 140)
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
        className={`fixed inset-x-0 top-0 z-40 mx-auto mt-4 w-[min(1100px,92%)] transition-all duration-300 ${
          hidden ? '-translate-y-[140px]' : 'translate-y-0'
        }`}
      >
        <nav className="glass-card flex items-center justify-between rounded-2xl border border-[#E2E7F5] bg-white/90 px-4 py-3 backdrop-blur md:px-6">
        <a href="#hero" className="text-lg font-semibold tracking-[0.25em] text-[#0F172A]">
          HK
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative rounded-full px-3 py-2 text-sm transition ${
                  activeSection === item.id ? 'text-[#4F46E5]' : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute inset-x-1.5 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0891B2]" />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-[#E2E7F5] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F172A] transition hover:border-[#4F46E5]/35 hover:text-[#4F46E5] md:inline-block"
        >
          Hire Me
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-md border border-[#E2E7F5] bg-white p-2 text-[#0F172A] md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {!mobileOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
          )}
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
            className={`fixed right-0 top-0 bottom-0 z-60 w-80 max-w-full transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold tracking-[0.2em] text-[#0F172A]">HK</div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-md border border-[#E2E7F5] bg-white p-2 text-[#0F172A]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
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
                      className={`block rounded px-3 py-2 text-sm transition ${activeSection === item.id ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-[#475569]'}`}
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
