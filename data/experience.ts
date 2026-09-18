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
    id: '0',
    title: 'AI Engineer Intern',
    company: 'Horrazon.in',
    location: 'Remote',
    period: 'Jun 2025 – Present',
    description: [
      'Designed a distributed, fault-tolerant evaluation pipeline on AWS using Celery workers with Redis as the task broker — 1,000+ profiles processed concurrently, with horizontal scaling and automated job-retry logic',
      'Integrated three external REST APIs (Meta Graph, Google Ads, PageSpeed) into a unified data-ingestion layer, aggregating multi-source signals into structured scoring artifacts for downstream ranking models',
      'Fine-tuned a language model with LoRA (PEFT) on domain-specific data, and exposed pipeline results through asynchronous FastAPI endpoints backed by task-queue deferred execution',
      'Helped architect a LangGraph orchestration layer for a multi-agent marketing-automation platform, routing between 11 specialist agents (analytics, marketing, SEO, automation, CRM, research, reporting, vision) behind a single conversational interface',
      'Built a plain-language-to-rule engine that runs at zero ongoing LLM cost, plus production models (LightGBM, XGBoost, Isolation Forest, KMeans) for anomaly detection and churn/LTV prediction, served over REST',
    ],
    technologies: ['Python', 'Celery', 'Redis', 'AWS', 'FastAPI', 'LangGraph', 'LoRA / PEFT', 'LightGBM', 'XGBoost', 'scikit-learn'],
    current: true,
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
  },
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




