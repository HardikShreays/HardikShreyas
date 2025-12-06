export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'REZOOM — AI Resume Builder',
    description: 'AI-driven resume builder using LangChain, LangGraph, Next.js, Prisma, and PostgreSQL.',
    longDescription: 'AI-driven resume builder that generates role-specific resumes, parses PDFs, manages user profiles, and provides real-time ATS-friendly previews. Built with LangChain and LangGraph for intelligent content generation.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'LangChain', 'LangGraph', 'Prisma', 'PostgreSQL', 'TypeScript'],
    githubUrl: 'https://github.com/HardikShreays/REZOOM-Ultimate-Resume-builder',
    liveUrl: 'https://rezoom-ultimate-resume-builder.vercel.app',
    featured: true,
  },
  {
    id: '2',
    title: 'Contriverse — Gamified Open-Source Tracker',
    description: 'Gamifies open-source contributions with badges, automated celebrations, and analytics.',
    longDescription: 'Gamifies open-source contributions with badges, automated Discord/Slack celebrations, dual dashboards, advanced analytics, and GitHub webhook integration. Encourages developers to contribute more to open-source projects.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'Node.js', 'GitHub API', 'Discord API', 'Slack API', 'TypeScript'],
    githubUrl: 'https://github.com/HardikShreays/Contriverse',
    liveUrl: 'https://contriverse.vercel.app',
    featured: true,
  },
  {
    id: '3',
    title: 'Budgy — Personal Budget Tracker',
    description: 'Simple budgeting tool for tracking expenses, categories, and monthly limits with a clean UI.',
    longDescription: 'A clean and intuitive budgeting tool that helps users track expenses, manage categories, and set monthly limits. Features a simple UI for easy expense management and financial planning.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    githubUrl: 'https://github.com/HardikShreays/Budgy',
    liveUrl: 'https://budgy-two.vercel.app',
    featured: false,
  },
  {
    id: '4',
    title: 'Saarthi — Mental Health Chatbot',
    description: 'Student-focused mental-health chatbot offering guided conversations and emotional check-ins.',
    longDescription: 'A student-focused mental-health chatbot that offers guided conversations, emotional check-ins, and support resources. Designed to help students manage stress and mental well-being through AI-powered conversations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    techStack: ['Python', 'AI/ML', 'Natural Language Processing', 'Flask'],
    githubUrl: 'https://github.com/HardikShreays/Saarthi',
    liveUrl: 'https://saarthi-2nru.onrender.com',
    featured: false,
  },
]
