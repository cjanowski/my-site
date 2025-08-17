'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="glass-portrait-container">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden">
                <Image
                  src="/portrait.jpeg"
                  alt="Cory Janowski"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 15%' }}
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl lg:text-8xl font-bold mb-4"
            >
              <span className="gradient-name">Cory</span>
              <span className="block gradient-title-hero">Janowski</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl lg:text-3xl mb-8 font-bold gradient-title-text"
            >
              Software Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start mb-8 text-gray-500"
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
              <motion.a
                href="mailto:coryjanowski@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 btn-email-enhanced btn-pulse-email text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Email</span>
              </motion.a>
              
              <motion.a
                href="tel:1-260-699-7339"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 btn-call-enhanced btn-pulse text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">Call</span>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/coryjanowski/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 btn-linkedin-enhanced btn-pulse-linkedin text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">LinkedIn</span>
              </motion.a>
              
              <motion.a
                href="https://github.com/cjanowski"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 btn-github-enhanced btn-pulse-github text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">GitHub</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}