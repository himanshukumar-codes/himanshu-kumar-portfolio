import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../constants/portfolioData'

function Experience() {
  return (
    <SectionShell id="experience">
      <SectionHeading title="Experience" subtitle="Career" />
      <div className="relative space-y-8 border-l border-[#E2E7F5] pl-6">
        {experience.map((item) => (
          <article key={item.title} className="glass-card relative p-5 sm:p-6">
            <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0891B2]" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0891B2]">{item.period}</p>
            <h3 className="mt-1 text-xl text-[#0F172A]">{item.title}</h3>
            <p className="mt-1 text-sm text-[#475569]">{item.company}</p>
            <p className="mt-3 text-sm leading-7 text-[#475569]">{item.details}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export default Experience
