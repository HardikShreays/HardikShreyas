'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ShaderCanvas = dynamic(
  () => import('@/components/ui/shader-canvas-wrapper'),
  {
    ssr: false,
    loading: () => <div className="absolute top-0 left-0 w-full h-full bg-black" />,
  }
)

import { ParticleTextEffect } from "@/components/ui/particle-text-effect"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 1.11, 0.81, 0.99],
      },
    },
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Shader Animation Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <ShaderCanvas
          hue={260}
          speed={0.15}
          intensity={0.7}
          complexity={6.0}
          warp={0.4}
        />
      </div>

      {/* Dark overlay for better text readability - reduced opacity */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-[2]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-purple-400 text-sm sm:text-base font-medium tracking-wider uppercase"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold flex flex-col items-center gap-2"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            <div className="h-20 sm:h-24 md:h-28 lg:h-32 w-full flex justify-center items-center">
              <ParticleTextEffect
                text="Hardik"
                color="#ffffff"
                canvasHeight={150}
                canvasWidth={600}
                className="w-full h-full"
                density={3}
                size={1.5}
              />
            </div>
            <div className="h-20 sm:h-24 md:h-28 lg:h-32 w-full flex justify-center items-center">
              <ParticleTextEffect
                text="Shreyas"
                color="#a855f7"
                canvasHeight={150}
                canvasWidth={700}
                className="w-full h-full"
                density={3}
                size={1.5}
              />
            </div>
          </motion.h1>

          {/* Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
              Software Developer &{' '}
              <span className="gradient-text font-semibold">AI Engineer</span>
            </h2>

            {/* Motto */}
            <motion.p
              className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Crafting elegant solutions at the intersection of{' '}
              <motion.span
                className="text-purple-400 font-medium"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(147, 51, 234, 0.5)',
                    '0 0 20px rgba(147, 51, 234, 0.8)',
                    '0 0 10px rgba(147, 51, 234, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                code
              </motion.span>{' '}
              and{' '}
              <motion.span
                className="text-pink-400 font-medium"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(236, 72, 153, 0.5)',
                    '0 0 20px rgba(236, 72, 153, 0.8)',
                    '0 0 10px rgba(236, 72, 153, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                intelligence
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.a
              href="#contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={20} />
                Contact Me
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              className="group px-8 py-4 glass rounded-full text-white font-semibold flex items-center gap-2 hover:glass-strong transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              View Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  )
}
