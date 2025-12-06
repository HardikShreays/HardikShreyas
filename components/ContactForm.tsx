'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollingSectionWrapper from './ScrollingSectionWrapper'
import { Mail, Github, Linkedin, Send } from 'lucide-react'
import BlurTextAnimation from '@/components/ui/blur-text-animation'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Initialize EmailJS with your public key
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error message when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.')
      }

      // Validate that service ID and template ID are different
      if (serviceId === templateId) {
        throw new Error('Service ID and Template ID cannot be the same. Please check your EmailJS configuration.')
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email, // Add reply_to for better email handling
      }

      // Use the newer EmailJS API format
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      console.log('EmailJS response:', response)

      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: any) {
      console.error('EmailJS error:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')

      // Default error message suggesting alternative contact methods
      const errorMsg = 'Unable to send message. Please try contacting me directly via email at hardikshreyas8@gmail.com or through the social links below.'

      setErrorMessage(errorMsg)
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 8000)
    }
  }

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:hardikshreyas8@gmail.com',
      color: 'hover:text-purple-400',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/HardikShreays',
      color: 'hover:text-gray-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/hardik-shreyas/',
      color: 'hover:text-blue-400',
    },
  ]

  return (
    <ScrollingSectionWrapper>
      <section id="contact" className="py-24 sm:py-32 relative">
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
              <span className="text-white">Get In</span>{' '}
              <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8" />
            <BlurTextAnimation
              text="Have a project in mind or want to collaborate? I'd love to hear from you."
              className="text-center"
              fontSize="text-lg"
              textColor="text-gray-400"
              fontFamily=""
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Let&apos;s Connect
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  I&apos;m always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision. Feel free to reach out
                  through any of the channels below.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 8 }}
                      className={`flex items-center gap-4 glass rounded-xl p-4 text-gray-300 ${link.color} transition-colors group`}
                    >
                      <div className="p-2 glass-strong rounded-lg group-hover:scale-110 transition-transform">
                        <Icon size={20} />
                      </div>
                      <span className="font-medium">{link.name}</span>
                      {link.name === 'Email' && (
                        <span className="ml-auto text-sm text-gray-500">
                          hardikshreyas8@gmail.com
                        </span>
                      )}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
                  >
                    Name
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
                  >
                    Email
                  </label>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors peer resize-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
                  >
                    Message
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </span>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-green-500 flex items-center justify-center rounded-lg"
                    >
                      <span className="flex items-center gap-2">
                        <Send size={20} />
                        Message Sent!
                      </span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-red-500 flex items-center justify-center rounded-lg"
                    >
                      <span>Failed to Send</span>
                    </motion.div>
                  )}
                </motion.button>
                {errorMessage && submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errorMessage}
                  </motion.p>
                )}
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm mt-2"
                  >
                    Thank you! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </ScrollingSectionWrapper>
  )
}



