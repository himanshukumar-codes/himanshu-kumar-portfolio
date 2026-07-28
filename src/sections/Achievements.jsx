import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { achievements } from '../constants/portfolioData'

function Achievements() {
  return (
    <SectionShell id="achievements">
      <SectionHeading title="Achievements" subtitle="Impact" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item) => (
          <article key={item.label} className="glass-card p-5 sm:p-6 text-center">
            <p className="text-4xl font-semibold text-[#0F172A]">{item.value}</p>
            <p className="mt-2 text-sm text-[#475569]">{item.label}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export default Achievements
