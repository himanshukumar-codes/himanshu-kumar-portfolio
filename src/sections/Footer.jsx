import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { socialLinks } from '../constants/portfolioData'
import SectionShell from '../components/SectionShell'

function Footer() {
  const [showTopButton, setShowTopButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > window.innerHeight * 0.65)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SectionShell id="footer" className="pb-12 pt-12">
      <motion.footer
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="footer-bar glass-card flex flex-col items-center justify-between gap-5 p-6 sm:flex-row"
      >
        <p className="text-sm text-[#475569]">© {new Date().getFullYear()} Himanshu Kumar. All rights reserved.</p>
        <div className="footer-socials flex items-center gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={`footer-social social-pill social-${item.label.toLowerCase()}`} aria-label={`${item.label === 'Email' ? 'Send email' : `${item.label} profile`}`}>
                <Icon aria-hidden="true" />
              </a>
            )
          })}
        </div>
        <AnimatePresence>
          {showTopButton && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="footer-top-button social-pill"
              aria-label="Back to top"
            >
              <FiArrowUp aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.footer>
    </SectionShell>
  )
}

export default Footer
