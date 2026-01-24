'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, MapPin, Cpu, Zap, Activity } from 'lucide-react'
import Image from 'next/image'
import CircuitTrace from './CircuitTrace'
import ComponentChip from './ComponentChip'
import LEDIndicator from './LEDIndicator'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32 pb-20 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full z-0 opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full z-0 opacity-30 pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Main CPU Complex */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* CPU Core (Profile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start order-2 lg:order-1 relative"
          >
            {/* Connection Traces - Decorations */}
            <div className="absolute -right-8 top-1/2 w-16 hidden lg:block">
              <CircuitTrace width={64} height={2} color="#b8860b" />
            </div>

            <ComponentChip
              className="max-w-md"
              label="CPU-CORE-i9"
              id="CJ-2026-X"
              pins="all"
            >
              <div className="relative z-10">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl mx-auto relative group">
                  <Image
                    src="/portrait.jpeg"
                    alt="Cory Janowski"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ objectPosition: '50% 15%' }}
                    priority
                  />

                  {/* Holographic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/10 opacity-50 group-hover:opacity-20 transition-opacity" />

                  {/* Scanline */}
                  <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-30 pointer-events-none" />
                </div>

                {/* Status Indicators */}
                <div className="mt-6 flex justify-center gap-4">
                  <div className="bg-black/40 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-mono text-green-400">ONLINE</span>
                  </div>
                  <div className="bg-black/40 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-mono text-amber-400">OPTIMIZED</span>
                  </div>
                </div>
              </div>
            </ComponentChip>
          </motion.div>

          {/* Logic & Interaction Unit (Content) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            {/* System Header */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <LEDIndicator color="green" state="pulse" />
              <div className="h-px w-12 bg-gray-700" />
              <span className="text-pcb-copper-300 font-mono text-xs tracking-widest">INITIALIZING SEQUENCE...</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 tracking-tight leading-none"
            >
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Cory</span>
              <span className="block gradient-name">Janowski</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <Cpu className="w-5 h-5 text-pcb-copper-500" />
              <span className="text-2xl lg:text-3xl font-bold text-gray-400">
                Software Engineer
                <span className="animate-pulse text-pcb-copper-500">_</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start mb-10 text-gray-500 font-mono text-sm"
            >
              <MapPin className="w-4 h-4 mr-2 text-pcb-copper-500" />
              <span>LOC: Fort Wayne, Indiana, US</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {/* Output Ports (Buttons) */}
              <motion.a
                href="mailto:coryjanowski@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gray-900 border border-gray-700 rounded-sm flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-100 opacity-0 transition-opacity" />
                <Mail className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="font-mono text-gray-300 group-hover:text-white transition-colors relative z-10">EMAIL_IO</span>
                <LEDIndicator color="blue" state="off" className="ml-2 opacity-50 group-hover:opacity-100" />
              </motion.a>

              <motion.a
                href="tel:1-260-699-7339"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gray-900 border border-gray-700 rounded-sm flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 group-hover:opacity-100 opacity-0 transition-opacity" />
                <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <span className="font-mono text-gray-300 group-hover:text-white transition-colors relative z-10">VOICE_LINK</span>
                <LEDIndicator color="green" state="off" className="ml-2 opacity-50 group-hover:opacity-100" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/coryjanowski/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gray-900 border border-gray-700 rounded-sm flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-cyan-600/20 group-hover:opacity-100 opacity-0 transition-opacity" />
                <Linkedin className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="font-mono text-gray-300 group-hover:text-white transition-colors relative z-10">LINKEDIN</span>
              </motion.a>

              <motion.a
                href="https://github.com/cjanowski"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gray-900 border border-gray-700 rounded-sm flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-600/50 group-hover:opacity-100 opacity-0 transition-opacity" />
                <Github className="w-5 h-5 text-white group-hover:text-gray-200 transition-colors" />
                <span className="font-mono text-gray-300 group-hover:text-white transition-colors relative z-10">GITHUB_REPO</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}