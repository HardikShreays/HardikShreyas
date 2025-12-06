'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ScrollingSectionWrapper from './ScrollingSectionWrapper'
import { DisplayCard } from '@/components/ui/display-cards'
import {
  Code2,
  Brain,
  Database,
  Cloud,
  Globe,
  Zap,
  Layers,
  Terminal,
} from 'lucide-react'

import BlurTextAnimation from '@/components/ui/blur-text-animation'
import { TiltWrapper } from '@/components/ui/tilt-wrapper'


const techStackCards = [
  {
    icon: <Code2 className="size-4 text-purple-300" />,
    title: "Frontend",
    description: "Next.js, React, TypeScript, Tailwind, Radix UI",
    date: "Expert",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-400",
  },
  {
    icon: <Terminal className="size-4 text-cyan-300" />,
    title: "Backend",
    description: "Node.js, Express, Prisma",
    date: "Expert",
    iconClassName: "text-cyan-500",
    titleClassName: "text-cyan-400",
  },
  {
    icon: <Database className="size-4 text-blue-300" />,
    title: "Databases",
    description: "PostgreSQL, MongoDB, SQL",
    date: "Expert",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-400",
  },
  {
    icon: <Brain className="size-4 text-pink-300" />,
    title: "AI/ML",
    description: "LangChain, LangGraph, OpenCV, Python",
    date: "Advanced",
    iconClassName: "text-pink-500",
    titleClassName: "text-pink-400",
  },
  {
    icon: <Zap className="size-4 text-yellow-300" />,
    title: "Languages",
    description: "JavaScript, Python, C++",
    date: "Expert",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-400",
  },
  {
    icon: <Cloud className="size-4 text-orange-300" />,
    title: "DevOps",
    description: "Docker, Git",
    date: "Advanced",
    iconClassName: "text-orange-500",
    titleClassName: "text-orange-400",
  },
  {
    icon: <Globe className="size-4 text-green-300" />,
    title: "Full Stack",
    description: "End-to-end Solutions",
    date: "Expert",
    iconClassName: "text-green-500",
    titleClassName: "text-green-400",
  },
  {
    icon: <Layers className="size-4 text-indigo-300" />,
    title: "Tools & Libraries",
    description: "Modern Web Stack",
    date: "Expert",
    iconClassName: "text-indigo-500",
    titleClassName: "text-indigo-400",
  },
]

export default function About() {
  return (
    <ScrollingSectionWrapper>
      <section id="about" className="py-24 sm:py-32 relative">
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
              <span className="text-white">About</span>{' '}
              <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          {/* Content Container */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16 max-w-6xl mx-auto">
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 z-10"
            >
              <TiltWrapper className="w-full h-full rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-50 animate-pulse -z-10" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src="/profile.jpg"
                    alt="Hardik Shreyas - Software Developer & AI Engineer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </TiltWrapper>
            </motion.div>

            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 text-center md:text-left"
            >
              <BlurTextAnimation
                text="I'm a Computer Science student who builds clean, fast, and functional products. I work with Next.js, TypeScript, Node.js, and AI tools to turn ideas into working systems—dashboards, automation flows, smart delivery logic, resume generators, you name it. I also grind algorithms, compete in ICPC, and keep sharpening my problem-solving edge. I like shipping things that actually work and cutting out everything that doesn't."
                className="text-center md:text-left"
                fontSize="text-lg sm:text-xl"
                textColor="text-gray-300"
                fontFamily=""
              />
            </motion.div>
          </div>

          {/* Tech Stack Display Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center"
          >
            {techStackCards.map((card, index) => (
              <DisplayCard
                key={index}
                {...card}
                className="w-full min-h-40 max-h-48 skew-y-0 hover:scale-105 transition-transform duration-300"
              />
            ))}
          </motion.div>
        </div>
      </section>
    </ScrollingSectionWrapper>
  )
}


