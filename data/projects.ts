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

// NOTE: `image` values are still stock placeholders. Real screenshots can be
// uploaded per-project in the Sanity Studio at /studio, which overrides these.
export const projects: Project[] = [
  {
    id: '1',
    title: 'Bridg — Android ↔ Mac Ecosystem',
    description: 'Open-source screen mirroring, file transfer, clipboard sync and notification bridging between Android and macOS.',
    longDescription:
      'An open-source ecosystem that brings Android and macOS together: screen mirroring built on scrcpy, two-way file transfer, live clipboard sync and notification forwarding. Native Swift on the Mac side, Kotlin on Android, with Protobuf over the wire.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    techStack: ['Swift', 'Kotlin', 'Android', 'macOS', 'Protobuf', 'scrcpy'],
    githubUrl: 'https://github.com/HardikShreays/Bridg',
    featured: true,
  },
  {
    id: '2',
    title: 'AgentGate — Agentic Payment Consent',
    description: 'Re-verifies an AI agent’s spending mandate at the instant money moves, and honours revocation mid-transaction.',
    longDescription:
      'Built for Track 01 of the Razorpay AI Buildathon. Agent-payment protocols like AP2, ACP and x402 all stop at authorization — the mandate is checked at the door and never again. AgentGate scopes agent spend to an expiring, tamper-evident consent contract, re-checks it under a database row lock as late as possible before the order is created, and lets a human revoke consent while a transaction is still in flight. Every check is written to a deterministic, queryable audit trail rather than LLM-generated prose.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    techStack: ['Python', 'PostgreSQL', 'Razorpay API', 'CI/CD'],
    githubUrl: 'https://github.com/HardikShreays/AgentGate',
    liveUrl: 'https://agent-gate-delta.vercel.app',
    featured: true,
  },
  {
    id: '3',
    title: 'MedGuard — Self-Healing Price Tracker',
    description: 'Tracks medicine prices and stock across Indian pharmacies, and treats its own scraper breakage as the product.',
    longDescription:
      'Compares price and availability for chronic medications across 1mg, PharmEasy, Netmeds and Apollo. Public pharmacy listings are SPAs whose selectors drift on every frontend deploy, so a one-shot scraper is stale within days. MedGuard closes the loop: Bright Data Scraper Studio collects, a Guardian rule engine catches what self-healing misses, and a failed run triggers a collector heal, re-ingest and re-validate. Per-collector health scores, run timelines and threshold alerts via Discord or Slack. Built for Into the Scrape-Verse (WeMakeDevs × Bright Data).',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    techStack: ['Python', 'Bright Data', 'Web Scraping', 'Discord API', 'Slack API'],
    githubUrl: 'https://github.com/HardikShreays/MedGaurd',
    featured: true,
  },
  {
    id: '4',
    title: 'NovelGraph — Research Hypothesis Engine',
    description: 'Turns research papers into an explorable knowledge graph and generates evidence-backed hypotheses.',
    longDescription:
      'Transforms research papers into an explorable Cognee knowledge graph, automatically identifies untested Method/Dataset combinations, and generates evidence-backed hypotheses through a Cognee-powered Generator/Critic verification loop.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
    techStack: ['Cognee', 'Knowledge Graphs', 'LLM', 'Research Automation'],
    githubUrl: 'https://github.com/HardikShreays/NovelGraph',
    featured: true,
  },
  {
    id: '5',
    title: 'CodeForges — Code Execution Engine',
    description: 'A scalable online code execution and evaluation system.',
    longDescription:
      'Architecting a scalable online code execution and evaluation system — submission handling, sandboxed runs and result evaluation designed to hold up under concurrent load.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    techStack: ['TypeScript', 'Node.js', 'System Design'],
    githubUrl: 'https://github.com/HardikShreays/CodeForges',
    liveUrl: 'https://code-forges.vercel.app',
    featured: true,
  },
  {
    id: '6',
    title: 'Ryze AI — Deterministic UI Generator',
    description: 'Generates UI from prompts with deterministic, repeatable output rather than a different answer every run.',
    longDescription:
      'An AI-powered UI generator built for deterministic output — the same prompt produces the same interface. Next.js front end with an Express service layer, routing model calls through OpenRouter.',
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'TypeScript', 'Express', 'OpenRouter', 'LLM'],
    githubUrl: 'https://github.com/HardikShreays/Ryze-ai',
    liveUrl: 'https://ryze-ai-dara.vercel.app',
  },
  {
    id: '7',
    title: 'UniPool — Campus Ride Sharing',
    description: 'A student-to-student ride coordination board. Deliberately not Uber: no payments, no tracking.',
    longDescription:
      'A campus ride-sharing board where students post ride needs or offers, browse the feed and contact posters directly. Scoped on purpose — no payments, no live tracking, no cab management. Built on Supabase with email auth and Row Level Security enforcing access at the database.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'PostgreSQL'],
    githubUrl: 'https://github.com/HardikShreays/Unipool',
    liveUrl: 'https://unipool-ten.vercel.app',
  },
  {
    id: '8',
    title: 'REZOOM — AI Resume Builder',
    description: 'AI-driven resume builder using LangChain, LangGraph, Next.js, Prisma and PostgreSQL.',
    longDescription:
      'AI-driven resume builder that generates role-specific resumes, parses PDFs, manages user profiles, and provides real-time ATS-friendly previews. Built with LangChain and LangGraph for intelligent content generation.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'LangChain', 'LangGraph', 'Prisma', 'PostgreSQL', 'TypeScript'],
    githubUrl: 'https://github.com/HardikShreays/REZOOM-Ultimate-Resume-builder',
    liveUrl: 'https://rezoom-ultimate-resume-builder.vercel.app',
  },
  {
    id: '9',
    title: 'Contriverse — Open-Source Milestone Dashboard',
    description: 'Gamifies open-source contributions with achievements, badges, progress tracking and automated shoutouts.',
    longDescription:
      'A milestone celebration dashboard that gamifies open-source contributions through achievements, badges, progress tracking and automated community shoutouts — built to drive recognition, motivation and accountability in open-source ecosystems. Integrates GitHub webhooks with Discord and Slack.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    techStack: ['Next.js', 'Node.js', 'GitHub API', 'Discord API', 'Slack API', 'TypeScript'],
    githubUrl: 'https://github.com/HardikShreays/Contriverse',
    liveUrl: 'https://contriverse.vercel.app',
  },
  {
    id: '10',
    title: 'Saarthi — Mental Health Chatbot',
    description: 'Student-focused mental-health chatbot offering guided conversations and emotional check-ins.',
    longDescription:
      'A student-focused mental-health chatbot that offers guided conversations, emotional check-ins and support resources. Designed to help students manage stress and mental well-being through AI-powered conversations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    techStack: ['Python', 'AI/ML', 'Natural Language Processing', 'Flask'],
    githubUrl: 'https://github.com/HardikShreays/Saarthi',
    liveUrl: 'https://saarthi-2nru.onrender.com',
  },
]
