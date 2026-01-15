"use client";
import { motion } from 'framer-motion'
import Image from 'next/image'
import ScrollingSectionWrapper from './ScrollingSectionWrapper'
import { experiences } from '@/data/experience'
import { Briefcase } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'


export default function ExperienceTimeline() {
  return (
    <ScrollingSectionWrapper>
      <section id="experience" className="py-24 sm:py-32 relative">
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
              <span className="text-white">Work</span>{' '}
              <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <TimelineItem
                  key={experience.id}
                  experience={experience}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollingSectionWrapper>
  )
}

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
          className={`w-4 h-4 rounded-full ${experience.current
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-purple-500/30'
            : 'bg-gray-600'
            }`}
        />
      </div>

      {/* Content Card */}
      <div
        className={`ml-20 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
          }`}
      >
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="rounded-2xl relative"
        >
          <GlowCard
            className="p-6 block" // Override grid with block to maintain simple flow
            glowColor="purple"
            customSize
          >
            {/* Current Badge */}
            {experience.current && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-semibold text-white z-20">
                Current
              </div>
            )}

            {/* Content Wrapper */}
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  {experience.logo ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                      <Image
                        src={experience.logo}
                        alt={experience.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <Briefcase className="text-purple-400" size={24} />
                  )}
                  <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                  <span className="font-semibold text-purple-400">
                    {experience.company}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>{experience.location}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{experience.period}</p>
              </div>

              {/* Description */}
              <ul className="space-y-2 mb-4">
                {experience.description.map((item, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-purple-400 mt-1.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs glass rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </motion.div>
  )
}





