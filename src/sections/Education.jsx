import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { education } from '../constants/portfolioData'

function Education() {
  return (
    <SectionShell id="education">
      <SectionHeading title="Education" subtitle="Academic" />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item) => (
          <article key={item.title} className="glass-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0891B2]">{item.period}</p>
            <h3 className="mt-2 text-xl text-[#0F172A]">{item.title}</h3>
            <p className="mt-1 text-sm text-[#475569]">{item.institute}</p>
            <p className="mt-3 text-sm leading-7 text-[#475569]">{item.details}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export default Education
