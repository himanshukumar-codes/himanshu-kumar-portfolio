import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMessageSquare, FiUser } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import MagneticButton from '../components/MagneticButton'

const initialState = { name: '', email: '', message: '' }

function Contact() {
  const [formState, setFormState] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [shakeForm, setShakeForm] = useState(false)
  const textareaRef = useRef(null)
  const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formsubmit.co/ajax/kumarhimanshu995573@gmail.com'

  const validate = () => {
    const nextErrors = {}
    if (!formState.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) nextErrors.email = 'Please provide a valid email.'
    if (!formState.message.trim()) nextErrors.message = 'Message is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    if (status.message) setStatus({ type: '', message: '' })

    if (name === 'message' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 240)}px`
    }
  }

  const validateField = (name, value) => {
    if (name === 'name' && !value.trim()) return 'Name is required.'
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Please provide a valid email.'
    if (name === 'message' && !value.trim()) return 'Message is required.'
    return ''
  }

  const onBlur = (event) => {
    const { name, value } = event.target
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) {
      setShakeForm(true)
      window.setTimeout(() => setShakeForm(false), 450)
      return
    }

    setIsSubmitting(true)
    setShowSuccess(false)
    setStatus({ type: '', message: '' })

    const message = `Name: ${formState.name}\nEmail: ${formState.email}\nMessage: ${formState.message}`
    const mailtoUrl = `mailto:kumarhimanshu995573@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry from ${formState.name}`)}&body=${encodeURIComponent(message)}`

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Message: formState.message,
          _subject: `Portfolio inquiry from ${formState.name}`,
          _replyto: formState.email,
          _template: 'table',
        }),
      })

      if (!response.ok) throw new Error('Form endpoint unavailable')

      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you shortly.' })
      setShowSuccess(true)
      setToast({ type: 'success', message: 'Thanks for reaching out. I will reply soon.' })
      setFormState(initialState)
    } catch {
      window.location.href = mailtoUrl
      setStatus({ type: 'success', message: 'Your email client has been opened. Please send the message from there if needed.' })
      setShowSuccess(true)
      setToast({ type: 'info', message: 'I opened your email app so you can send the message directly.' })
      setFormState(initialState)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!showSuccess) return undefined
    const timer = window.setTimeout(() => setShowSuccess(false), 2400)
    return () => window.clearTimeout(timer)
  }, [showSuccess])

  return (
    <SectionShell id="contact">
      <SectionHeading title="Contact" subtitle="Let&apos;s Build" />
      <div className="grid gap-8 md:grid-cols-[1fr_1.15fr]">
        <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} className="contact-info-card glass-card p-6 sm:p-8">
          <h3 className="text-2xl text-[#0F172A]">Ready for impactful work?</h3>
          <p className="mt-4 text-sm leading-7 text-[#475569]">
            Let&apos;s collaborate to design and build premium user experiences that drive measurable results.
          </p>
          <div className="contact-photo-card mt-8 overflow-hidden rounded-[2rem] border border-[#E2E7F5] bg-[#F8FAFF] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.03)]">
            <img
              src="/images/himu.jpg"
              alt="Himanshu Kumar"
              className="contact-photo h-40 w-full object-cover object-center sm:h-56 md:h-72"
            />
          </div>
          <p className="mt-5 text-sm italic leading-6 text-[#64748B]">“Good products begin with thoughtful conversations.”</p>
        </motion.article>

        <motion.form initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: 0.1 }} onSubmit={onSubmit} noValidate className={`contact-form glass-card space-y-5 p-6 sm:p-8 ${shakeForm ? 'contact-form-shake' : ''}`}>
          <div className="border-b border-[#E2E7F5] pb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F46E5]">Start a conversation</p>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Tell me what you&apos;re building and I&apos;ll get back to you soon.</p>
          </div>
          <div>
            <div className="floating-field relative">
              <FiUser aria-hidden="true" className="field-icon pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-[#64748B]" />
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={formState.name}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(errors.name)}
                className={`input leading-icon ${errors.name ? 'input-error' : ''}`}
                placeholder=" "
              />
              <label htmlFor="name">Name</label>
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
          </div>

          <div>
            <div className="floating-field relative">
              <FiMail aria-hidden="true" className="field-icon pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-[#64748B]" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formState.email}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(errors.email)}
                className={`input email-input ${errors.email ? 'input-error' : ''}`}
                placeholder=" "
              />
              <label htmlFor="email">Email</label>
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
          </div>

          <div>
            <div className="floating-field relative">
              <FiMessageSquare aria-hidden="true" className="field-icon pointer-events-none absolute left-4 top-4 z-10 text-lg text-[#64748B]" />
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                value={formState.message}
                onChange={onChange}
                onBlur={onBlur}
                ref={textareaRef}
                aria-invalid={Boolean(errors.message)}
                className={`input leading-icon min-h-36 resize-none ${errors.message ? 'input-error' : ''}`}
                placeholder=" "
              />
              <label htmlFor="message">Message</label>
            </div>
            {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
          </div>

          <MagneticButton type="submit" className="contact-submit btn-primary w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? <><span className="contact-spinner" aria-hidden="true" /> Sending...</> : showSuccess ? <><span className="contact-check" aria-hidden="true">✓</span> Sent</> : 'Send Message'}
          </MagneticButton>

          {status.message && (
            <p role="status" aria-live="polite" className={`rounded-lg border p-3 text-sm ${status.type === 'success' ? 'border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-[#2DD4BF]' : 'border-red-300/40 bg-red-400/10 text-red-200'}`}>
              {status.message}
            </p>
          )}
        </motion.form>
      </div>

      {toast && (
        <div className="toast fixed bottom-4 right-4 z-[80] rounded-[12px] border border-[#E2E7F5] bg-white px-4 py-3 text-sm text-[#0F172A] shadow-lg">
          {toast.message}
        </div>
      )}
    </SectionShell>
  )
}

export default Contact
