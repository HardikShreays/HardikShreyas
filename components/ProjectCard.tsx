'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-semibold text-white">
            Featured
          </div>
        )}

        {/* Action Buttons - Always Visible */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-black/70 backdrop-blur-md rounded-full hover:bg-purple-600/80 transition-colors border border-white/20"
              aria-label="View on GitHub"
              title="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} className="text-white" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-black/70 backdrop-blur-md rounded-full hover:bg-pink-600/80 transition-colors border border-white/20"
              aria-label="View live site"
              title="View live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} className="text-white" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs glass rounded-full text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-3 py-1 text-xs glass rounded-full text-gray-300">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links at Bottom - Always Visible */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-4 pt-3 border-t border-white/10 mt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors z-10 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} className="text-purple-400" />
                <span>GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors z-10 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} className="text-pink-400" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.div>
  )
}

