'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { socialLinks } from '@/data/social'

const icons = { GitHub: Github, LinkedIn: Linkedin, Email: Mail }

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 text-sm"
          >
            © {currentYear} Hardik Shreyas. All rights reserved.
          </motion.p>

          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => {
              const Icon = icons[link.name as keyof typeof icons]
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 ${link.color} transition-colors`}
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center text-gray-500 text-xs"
        >
          Built with Next.js, Tailwind CSS & Framer Motion
        </motion.div>
      </div>
    </footer>
  )
}





