export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  current?: boolean
  logo?: string
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full Stack Developer Intern',
    company: 'Get Interview Confidence',
    location: 'Remote',
    period: 'Apr 2025 – May 2025',
    description: [
      'Built a full-stack web app using Next.js and Node.js',
      'Implemented responsive UI with reusable components',
      'Optimized page performance for better user experience',
      'Integrated backend APIs for seamless data flow',
    ],
    technologies: ['Next.js', 'Node.js', 'React', 'TypeScript', 'JavaScript'],
    current: false,
    logo: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2662&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Technical Mentor',
    company: 'OOPs Club, Rishihood University',
    location: 'Sonipat, India',
    period: '2024 – Present',
    description: [
      'Led peer-teaching sessions to help students understand complex concepts',
      'Explained concepts and solutions after coding contests',
      'Helped students analyze their solutions and improve problem-solving approach',
      'Fostered collaborative learning environment for algorithm practice',
    ],
    technologies: ['C++', 'Python', 'Algorithms', 'Data Structures', 'Problem Solving'],
    current: true,
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop',
  },
]




