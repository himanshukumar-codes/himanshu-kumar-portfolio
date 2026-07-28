import { motion } from 'framer-motion'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { certificates } from '../constants/portfolioData'

const certificateCategory = (name) => {
  if (name.includes('C++')) return 'C++'
  if (name.includes('C Programming')) return 'C'
  if (name.includes('React.js')) return 'React'
  if (name.includes('Python')) return 'Python'
  if (name.includes('Time Management')) return 'Time Management'
  return 'Cert'
}

const certificateImageMap = {
  'Programming Using C++ – Infosys Springboard': '/images/certificateimages/C++.jpg',
  'C Programming – Lovely Professional University': '/images/certificateimages/C.jpg',
  'React.js Certification – Tech Veda': '/images/certificateimages/React.jpg',
  'Basic Python Certification – Skillera': '/images/certificateimages/Python.jpg',
  'Time Management Certification – Master Union': '/images/certificateimages/Time.jpg',
}

function Certificates() {
  return (
    <SectionShell id="certificates">
      <SectionHeading title="Certificates" subtitle="Credentials" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {certificates.map((item, index) => {
          const [title, issuer] = item.split(' – ')
          const category = certificateCategory(item)
          const imageHref = certificateImageMap[item]
          return (
            <motion.a
              key={item}
              href={imageHref}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group"
            >
              <article className="certificate-card glass-card p-5 sm:p-6 transition duration-200">
                <div className="mb-4 inline-flex max-w-full items-center justify-center rounded-[12px] bg-[#EEF2FF] px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4F46E5]">
                    {category}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug text-[#0F172A] md:text-lg">
                  {title?.trim() ?? item}
                </h3>
                {issuer && (
                  <p className="mt-3 text-sm text-[#475569]">
                    {issuer.trim()}
                  </p>
                )}
              </article>
            </motion.a>
          )
        })}
      </div>
    </SectionShell>
  )
}

export default Certificates
