function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0891B2]">{subtitle}</p>
      <h2 className="mt-2 text-3xl font-semibold text-[#0F172A] sm:text-4xl">{title}</h2>
    </div>
  )
}

export default SectionHeading
