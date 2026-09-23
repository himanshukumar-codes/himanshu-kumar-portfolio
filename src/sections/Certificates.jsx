import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import SectionShell from '../components/SectionShell'
import SectionHeading from '../components/SectionHeading'
import { certificates } from '../constants/portfolioData'

const certificateCategory = (name) => {
  if (name.includes('Oracle')) return 'Oracle'
  if (name.includes('C++')) return 'C++'
  if (name.includes('C Programming')) return 'C'
  if (name.includes('DSA')) return 'DSA'
  if (name.includes('React.js')) return 'React'
  if (name.includes('Python')) return 'Python'
  if (name.includes('Time Management')) return 'Time Management'
  return 'Cert'
}

const certificateImageMap = {
  'Oracle Cloud Infrastructure Certified AI Foundations Associate – Oracle University': '/images/certificateimages/Oracle.jpg',
  'Programming Using C++ – Infosys Springboard': '/images/certificateimages/C++.jpg',
  'C Programming – Lovely Professional University': '/images/certificateimages/C.jpg',
  'Basics of DSA – Lovely Professional University': '/images/certificateimages/DSA.jpg',
  'React.js Certification – Tech Veda': '/images/certificateimages/React.jpg',
  'Basic Python Certification – Skillera': '/images/certificateimages/Python.jpg',
  'Time Management Certification – Master Union': '/images/certificateimages/Time.jpg',
}

const certificateCategoryClasses = {
  Oracle: 'certificate-badge-oracle',
  'C++': 'certificate-badge-cpp',
  C: 'certificate-badge-c',
  DSA: 'certificate-badge-dsa',
  React: 'certificate-badge-react',
  Python: 'certificate-badge-python',
  'Time Management': 'certificate-badge-time',
  Cert: 'certificate-badge-default',
}

function CertificateCard({ item, index }) {
  const [title, issuer] = item.split(' – ')
  const [imageLoaded, setImageLoaded] = useState(false)
  const category = certificateCategory(item)
  const imageHref = certificateImageMap[item]
  const badgeClass = certificateCategoryClasses[category] ?? certificateCategoryClasses.Cert

  return (
    <motion.a
      href={imageHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${title?.trim() ?? item} certificate`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.985 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`group block rounded-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0891B2] ${badgeClass}`}
    >
      <article className="certificate-card glass-card h-full p-5 transition duration-300 sm:p-6">
        <div className={`certificate-image-frame relative mb-5 aspect-[16/10] overflow-hidden rounded-[18px] border border-[#E2E7F5] bg-[#F3F6FF] sm:aspect-[4/3] ${imageLoaded ? 'is-loaded' : ''}`}>
          <img
            src={imageHref}
            alt={`${title?.trim() ?? item} certificate`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          <div className="certificate-overlay pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/65 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">
            <span>View certificate</span>
            <FiExternalLink aria-hidden="true" className="text-base" />
          </div>
        </div>
        <div className={`certificate-badge mb-4 inline-flex max-w-full items-center justify-center rounded-[12px] px-3 py-2 ${badgeClass}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.22em]">
            {category}
          </span>
        </div>
        <h3 className="certificate-title text-base font-semibold leading-snug text-[#0F172A] md:text-lg">
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
}

function Certificates() {
  return (
    <SectionShell id="certificates">
      <SectionHeading title="Certificates" subtitle="Credentials" />

      <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {certificates.map((item, index) => (
          <CertificateCard key={item} item={item} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}

export default Certificates
