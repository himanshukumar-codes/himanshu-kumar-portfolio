function SectionShell({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={`section-shell relative mx-auto w-[min(1100px,92%)] py-16 sm:py-20 md:py-24 lg:py-[120px] ${className}`}
    >
      {children}
    </section>
  )
}

export default SectionShell
