'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Skull } from 'lucide-react'
import LEDIndicator from '@/components/LEDIndicator'

const navItems = [
  { name: 'Home', href: '#home', ledColor: 'green' },
  { name: 'About', href: '#about', ledColor: 'amber' },
  { name: 'Experience', href: '#experience', ledColor: 'blue' },
  { name: 'Projects', href: '#projects', ledColor: 'purple' },
  { name: 'Education', href: '#education', ledColor: 'red' },
  { name: 'Skills', href: '#skills', ledColor: 'blue' },
] as const

export default function Navigation({ onDoomClick }: { onDoomClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    // Special handling for Doom button
    if (href === '#doom' && onDoomClick) {
      onDoomClick()
      setIsMobileMenuOpen(false)
      return
    }

    const element = document.querySelector(href)
    if (element) {
      // Add a small offset for mobile header
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'glass-panel-heavy border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo / System Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <div className="flex items-center gap-3">
              {/* Microchip Logo Icon */}
              <div className="w-10 h-10 bg-gray-900 border border-gray-600 rounded-sm flex items-center justify-center relative overflow-hidden shadow-lg group-hover:shadow-blue-500/20 transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <span className="font-mono text-xl font-bold text-white relative z-10">CJ</span>
                {/* Pins */}
                <div className="absolute -left-[2px] top-1 bottom-1 w-[2px] flex flex-col justify-between py-1">
                  {[...Array(4)].map((_, i) => <div key={i} className="w-full h-1 bg-gray-500" />)}
                </div>
                <div className="absolute -right-[2px] top-1 bottom-1 w-[2px] flex flex-col justify-between py-1">
                  {[...Array(4)].map((_, i) => <div key={i} className="w-full h-1 bg-gray-500" />)}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-widest text-gray-200">SYSTEM</span>
                <span className="text-[10px] text-pcb-copper-300 font-mono">v2.0.26</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1)
              const isActive = activeSection === sectionId

              return (
                <div key={item.name} className="relative flex flex-col items-center group">
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive
                      ? 'text-white bg-white/10 shadow-lg border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <LEDIndicator
                      color={item.ledColor}
                      state={isActive ? 'on' : 'off'}
                      size="sm"
                    />
                    <span className="font-mono text-sm tracking-wide">{item.name}</span>
                  </motion.button>

                  {/* Connection Line to Content */}
                  <div className={`h-px w-full mt-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-transparent via-pcb-copper-500 to-transparent opacity-100' : 'opacity-0'}`} />
                </div>
              )
            })}

            {/* Secret Doom Button */}
            <motion.button
              onClick={() => scrollToSection('#doom')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-2 rounded-md transition-all duration-300 text-red-500 bg-red-900/20 hover:bg-red-900/40 shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500/20 group ml-2"
              title="???"
            >
              <Skull className="w-5 h-5 animate-[pulse_3s_ease-in-out_infinite]" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg glass-panel hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Backdrop */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden relative z-50 glass-panel-heavy rounded-b-2xl border-b border-white/10 mx-[-24px] px-6"
            >
              <div className="py-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.05 }
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                        ? 'bg-white/10 border border-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      <LEDIndicator
                        color={item.ledColor}
                        state={isActive ? 'on' : 'off'}
                        size="md"
                      />
                      <span className="font-mono text-lg">{item.name}</span>

                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="ml-auto text-xs text-pcb-copper-300 font-mono"
                        >
                          &lt;ACTIVE/&gt;
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}

                {/* Secret Doom Button */}
                <motion.button
                  onClick={() => scrollToSection('#doom')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: navItems.length * 0.05 }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-red-500 bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 shadow-[0_0_10px_rgba(220,38,38,0.3)] group mt-4"
                >
                  <Skull className="w-5 h-5 animate-[pulse_3s_ease-in-out_infinite]" />
                  <span className="font-mono text-lg">???
                    <span className="text-xs text-red-500 ml-2">DOOM</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}