function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-[#4F46E5] to-[#0891B2]" />
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0891B2]">{subtitle}</p>
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">{title}</h2>
    </div>
  )
}

export default SectionHeading
