'use client'

import { motion } from 'framer-motion'
import ScrollingSectionWrapper from './ScrollingSectionWrapper'
import { projects } from '@/data/projects'
import { MorphingCardStack, CardData } from '@/components/ui/morphing-card-stack'
import { Code2, Globe, Database, Smartphone, Layout, Cpu } from 'lucide-react'
import BlurTextAnimation from '@/components/ui/blur-text-animation'

// Helper to get icon based on project type or tech
const getProjectIcon = (tech: string[]) => {
  if (tech.includes('React Native') || tech.includes('Flutter')) return <Smartphone size={24} />
  if (tech.includes('Python') || tech.includes('TensorFlow')) return <Cpu size={24} />
  if (tech.includes('PostgreSQL') || tech.includes('MongoDB')) return <Database size={24} />
  if (tech.includes('Next.js') || tech.includes('React')) return <Globe size={24} />
  return <Layout size={24} />
}

export default function ProjectsGrid() {
  const mappedProjects: CardData[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description, // Short description
    icon: getProjectIcon(p.techStack),
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    // Optional: could tint background based on ID/index for variety, but glass is cleaner
    // color: `rgba(${Math.random()*50}, ${Math.random()*50}, 50, 0.5)` 
  }))

  return (
    <ScrollingSectionWrapper>
      <section id="projects" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-white">Featured</span>{' '}
              <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8" />
            <BlurTextAnimation
              text="A collection of projects showcasing my expertise in software development, AI engineering, and modern web technologies."
              className="text-center"
              fontSize="text-lg"
              textColor="text-gray-400"
              fontFamily=""
            />
          </motion.div>

          {/* New Morphing Card Stack Layout */}
          <div className="w-full flex justify-center">
            <MorphingCardStack
              cards={mappedProjects}
              defaultLayout="stack"
              onCardClick={(card) => console.log('Clicked', card)}
            />
          </div>
        </div>
      </section>
    </ScrollingSectionWrapper>
  )
}
