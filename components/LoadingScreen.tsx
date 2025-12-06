'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLoader } from '@/components/ui/dot-loader'

const game = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
]

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Prevent body scroll when loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Simulate loading time (2.5 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
    }, 2500)

    // Also hide when page is fully loaded (but ensure minimum 2.5 seconds)
    if (typeof window !== 'undefined') {
      const handleLoad = () => {
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = ''
        }, 2500)
      }

      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => {
          clearTimeout(timer)
          window.removeEventListener('load', handleLoad)
          document.body.style.overflow = ''
        }
      }
    }

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [isLoading])

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Loading Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* DotLoader Animation */}
            <div className="flex items-center justify-center">
              <DotLoader
                frames={game}
                className="gap-0.5"
                dotClassName="bg-white/20 [&.active]:bg-white w-1.5 h-1.5"
                duration={100}
                isPlaying={true}
              />
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                <span className="gradient-text">Hardik Shreyas</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Loading portfolio...
              </p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

