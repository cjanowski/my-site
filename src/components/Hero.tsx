'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, MapPin, Code, Layers, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32 pb-20 relative overflow-hidden">

      {/* Subtle floating glass decorators */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-32 h-32 glass-panel rounded-2xl hidden lg:block z-0 blur-[2px]"
      />
      <motion.div
        animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-1/4 w-24 h-24 glass-panel rounded-full hidden lg:block z-0 blur-[1px]"
      />

      <div className="container-max relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Portrait Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-2 lg:order-2 relative"
          >
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-[-20px] rounded-[3rem] border border-white/40 bg-white/20 backdrop-blur-md shadow-glass-heavy -z-10 rotate-3 transition-transform hover:rotate-6 duration-700" />

              <div className="w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative group bg-white">
                <Image
                  src="/portrait.jpeg"
                  alt="Cory Janowski"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: '50% 15%' }}
                  priority
                />

                {/* Subtle overlay glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" />
              </div>

            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-1"
          >
            <div className="inline-block glass-panel px-4 py-1.5 rounded-full mb-6">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 tracking-wide">
                HELLO WORLD
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight text-gray-900 drop-shadow-sm"
            >
              Hi, I'm <span className="gradient-text">Cory</span>
              <br className="hidden sm:block" />
              <span> Janowski</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <Code className="w-5 h-5 text-secondary-500" />
              <span className="text-2xl lg:text-3xl font-medium text-gray-600">
                Software Engineer
                <span className="animate-pulse text-primary-500 font-light hidden sm:inline-block"> |</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start mb-10 text-gray-500 font-medium"
            >
              <div className="flex items-center gap-2 glass-panel-subtle px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-accent-500" />
                <span className="text-sm">Fort Wayne, Indiana, US</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {/* Action Buttons */}
              <motion.a
                href="mailto:coryjanowski@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-primary-600" />
                <span>Email me</span>
              </motion.a>

              {/* Action Buttons Removed */}

              <div className="w-full flex justify-center lg:justify-start gap-4 mt-2 lg:w-auto lg:mt-0">
                <motion.a
                  href="https://www.linkedin.com/in/coryjanowski/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 glass-panel flex items-center justify-center rounded-full text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://github.com/coryjanowski"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 glass-panel flex items-center justify-center rounded-full text-gray-800 hover:text-gray-900 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}