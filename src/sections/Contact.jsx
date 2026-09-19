import { useEffect, useState } from 'react'
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
  }

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
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
      setToast({ type: 'success', message: 'Thanks for reaching out. I will reply soon.' })
      setFormState(initialState)
    } catch {
      window.location.href = mailtoUrl
      setStatus({ type: 'success', message: 'Your email client has been opened. Please send the message from there if needed.' })
      setToast({ type: 'info', message: 'I opened your email app so you can send the message directly.' })
      setFormState(initialState)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionShell id="contact">
      <SectionHeading title="Contact" subtitle="Let&apos;s Build" />
      <div className="grid gap-8 md:grid-cols-[1fr_1.15fr]">
        <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} className="glass-card p-6 sm:p-8">
          <h3 className="text-2xl text-[#0F172A]">Ready for impactful work?</h3>
          <p className="mt-4 text-sm leading-7 text-[#475569]">
            Let&apos;s collaborate to design and build premium user experiences that drive measurable results.
          </p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#E2E7F5] bg-[#F8FAFF] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.03)]">
            <img
              src="/images/himu.jpg"
              alt="Contact illustration"
              className="w-full h-40 sm:h-56 md:h-72 object-cover object-center"
            />
          </div>
        </motion.article>

        <motion.form initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} onSubmit={onSubmit} noValidate className="glass-card space-y-5 p-6 sm:p-8">
          <div className="border-b border-[#E2E7F5] pb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F46E5]">Start a conversation</p>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Tell me what you&apos;re building and I&apos;ll get back to you soon.</p>
          </div>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-[#475569]">
              Name
            </label>
            <div className="relative">
              <FiUser aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#64748B]" />
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={formState.name}
                onChange={onChange}
                className="input leading-icon"
                placeholder="Your full name"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-[#475569]">
              Email
            </label>
            <div className="relative">
              <FiMail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#4F46E5]" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formState.email}
                onChange={onChange}
                aria-invalid={Boolean(errors.email)}
                className={`input email-input ${errors.email ? 'input-error' : ''}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-[#475569]">
              Message
            </label>
            <div className="relative">
              <FiMessageSquare aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-lg text-[#64748B]" />
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                value={formState.message}
                onChange={onChange}
                className="input leading-icon min-h-36"
                placeholder="Tell me about your project"
              />
            </div>
            {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
          </div>

          <MagneticButton type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </MagneticButton>

          {status.message && (
            <p className={`rounded-lg border p-3 text-sm ${status.type === 'success' ? 'border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-[#2DD4BF]' : 'border-red-300/40 bg-red-400/10 text-red-200'}`}>
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
