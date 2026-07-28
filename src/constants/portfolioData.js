import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiExternalLink,
  FiCode,
  FiCpu,
  FiGlobe,
} from 'react-icons/fi'

export const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Himanshu-Kumar-LPU', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-kumar-4b87ab320/', icon: FiLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/himanshu_singh_chauhan_7.7.6/', icon: FiInstagram },
  { label: 'Email', href: 'mailto:kumarhimanshu995573@gmail.com', icon: FiMail },
]

export const stats = [
  { label: 'Projects', value: '7+' },
  { label: 'Skills', value: '35+' },
  { label: 'GitHub Repositories', value: '24+' },
  { label: 'Experience', value: '2+ Years' },
]

export const skills = {
  Frontend: [
    {name: 'Html', level: 95},
    {name: 'Css', level: 80},
    { name: 'React', level: 92 },
    { name: 'Tailwind CSS', level: 90 },
  ],
  Backend: [
    { name: 'Node.js', level: 82 },
    { name: 'Express', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'Firebase', level: 78 },
  ],
  Languages: [
    { name: 'JavaScript', level: 91 },
    { name: 'C', level: 84 },
    { name: 'C++', level: 79 },
    { name: 'Python', level: 77 },
  ],
  Tools: [
    { name: 'Git/GitHub', level: 90 },
    { name: 'Figma', level: 80 },
    { name: 'Postman', level: 83 },
    { name: 'Vercel', level: 85 },
  ],
  'Soft Skills': [
    { name: 'Leadership', level: 88 },
    { name: 'Communication', level: 86 },
    { name: 'Problem Solving', level: 93 },
    { name: 'Mentorship', level: 81 },
  ],
}

export const projectFilters = ['All', 'Full Stack', 'AI']

export const projects = [
  {
    title: 'Music Playlist Manager',
    category: 'Full Stack',
    description: 'A modern web application that helps users create, organize, and enjoy personalized music playlists in one place. The project includes a responsive UI, search and filtering options, favorites and recent-play tracking, and an interactive music player experience.',
    tech: ["React", "Node.js", "Express", "Tailwind CSS", "WebAssembly"],
    github: 'https://github.com/Himanshu-Kumar-LPU/Music-Playlist-Manager',
    demo: 'https://music-playlist-manager-6jsq.onrender.com/',
    icon: '/images/projectsimages/Music Playlist Manager.png',
  },

  {
    title: 'Friends Connections',
    category: 'Full Stack',
    description: 'A polished React + Vite app for browsing and connecting with friends through interactive profile cards.',
    tech: ['React', 'Vite', 'JavaScript / JSX', 'Vite React plugin', 'TypeScript type packages', 'oxlint'],
    github: 'https://github.com/Himanshu-Kumar-LPU/himanshu--friends--connections',
    demo: 'https://himanshu-friends-connections.vercel.app/',
    icon: '/images/projectsimages/friends-connections.jpg',
  },
  {
    title: 'Smart Farming Assistant - FarmAlert',
    category: 'AI',
    description: 'A real-time pest and disease detection system for farmers using AI/ML and IoT sensors.',
    tech: ['Frontend', 'Backend', 'Machine Learning', 'External APIs', 'DevOps & Deployment'],
    github: 'https://github.com/Himanshu-Kumar-LPU/Real-Time-Pest-and-Disease-Alert-System-for-Farmers',
    demo: 'https://farmalert-backend.onrender.com',
    icon: '/images/projectsimages/ai.jpg',
  },
]

export const experience = [
   {
    title: "AI Project Developer",
    company: "FarmAlert",
    period: "2026 - Present",
    details:
      "Built an AI-powered crop disease detection platform that helps farmers identify plant diseases, submit reports, and receive real-time guidance using Machine Learning and the MERN stack.",
  },
   {
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "2025",
    details:
      "Developing modern full-stack web applications using React, Node.js, Express.js, and MongoDB. Focused on responsive UI, REST APIs, authentication, and performance optimization.",
  },
]

export const education = [
  {
    title: 'B.Tech in Computer Science Engineering',
    institute: 'LOVELY PROFESSIONAL UNIVERSITY',
    period: '2024 - 2028',
    details: 'Currently pursuing B.Tech in Computer Science Engineering while actively developing full-stack applications, strengthening problem-solving skills, and exploring AI and modern web technologies.',
  },
  {
    title: 'Higher Secondary Education',
    institute: 'UTKRAMIT UCHCH MADHYAMIK VIDYALAY CHANDAWARA',
    period: '2022 - 2024',
    details: 'Completed Higher Secondary Education with Physics, Chemistry, and Mathematics, building a strong foundation for Computer Science and Engineering.',
  },
  {
  title: "Secondary Education",
  institute: "UTKRAMIT UCHCH MADHYAMIK VIDYALAY CHANDAWARA",
  period: "2021 - 2022",
  details: "Successfully completed Class X with a strong academic foundation."
}
]

export const certificates = [
  "Programming Using C++ – Infosys Springboard",
  "C Programming – Lovely Professional University",
  "React.js Certification – Tech Veda",
  "Basic Python Certification – Skillera",
  "Time Management Certification – Master Union",
];

export const achievements = [
  { label: 'Projects Completed', value: 8 },
  { label: 'Certificates Earned', value: 5 },
  { label: 'Technologies Learned', value: 15 },
  { label: 'GitHub Repositories', value: 24 },
]
