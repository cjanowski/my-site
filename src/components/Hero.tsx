'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-apple-gray-50 to-apple-gray-100">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              <div className="w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden shadow-2xl ring-8 ring-white/50">
                <Image
                  src="/portrait.jpeg"
                  alt="Cory Janowski"
                  width={448}
                  height={448}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 15%' }}
                  priority
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-apple-blue-500 to-apple-gray-400 opacity-20 blur-xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-2 lg:pl-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold text-apple-gray-800 mb-4"
            >
              Cory
              <span className="block text-gradient">Janowski</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl lg:text-2xl text-apple-gray-600 mb-8 font-medium"
            >
              Software Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start mb-6 text-apple-gray-500"
            >
              <MapPin className="w-5 h-5 mr-2" />
              <span>Fort Wayne, Indiana, US</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="mailto:coryjanowski@gmail.com"
                className="flex items-center gap-2 glass-effect px-4 py-3 rounded-full hover:bg-white/90 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-apple-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Email</span>
              </a>
              
              <a
                href="tel:1-260-699-7339"
                className="flex items-center gap-2 glass-effect px-4 py-3 rounded-full hover:bg-white/90 transition-all duration-300 group"
              >
                <Phone className="w-5 h-5 text-apple-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Call</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/coryjanowski/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass-effect px-4 py-3 rounded-full hover:bg-white/90 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-apple-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              
              <a
                href="https://github.com/cjanowski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass-effect px-4 py-3 rounded-full hover:bg-white/90 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-apple-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
