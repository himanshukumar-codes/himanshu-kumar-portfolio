import { useRef } from 'react'
import clsx from 'clsx'

function MagneticButton({ children, className = '', ...props }) {
  const buttonRef = useRef(null)

  const handleMove = (event) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    button.style.transform = `translate(${x * 0.18}px, ${y * 0.2}px) scale(1.03)`
  }

  const handleLeave = () => {
    const button = buttonRef.current
    if (!button) return
    button.style.transform = 'translate(0px, 0px) scale(1)'
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={clsx(
        'magnetic-btn relative inline-flex items-center justify-center rounded-full border border-violet-300/40 px-6 py-3 text-sm font-semibold text-white transition duration-300 will-change-transform',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default MagneticButton
