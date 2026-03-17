'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Gamepad2 } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
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
    // Special handling for Doom button left as an easter egg for later if needed, but not exposed right now
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
        ? 'backdrop-blur-xl bg-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-white/80'
        : 'bg-transparent pt-4'
        }`}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                CJ
              </div>
              <span className="font-semibold text-gray-800 tracking-tight text-lg hidden sm:block">Cory Janowski</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 glass-panel-subtle px-2 py-1 rounded-full">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1)
              const isActive = activeSection === sectionId

              return (
                <div key={item.name} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-5 py-2 rounded-full transition-colors text-sm font-medium ${isActive
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-800'
                      }`}
                  >
                    {item.name}
                  </button>
                </div>
              )
            })}

            {/* Doom Game Easter Egg */}
            <motion.button
              onClick={() => scrollToSection('#doom')}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 p-2 rounded-full text-gray-400 hover:text-primary-600 hover:bg-white/50 transition-colors"
              title="Play DOOM"
            >
              <Gamepad2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled ? 'hover:bg-gray-100 text-gray-800' : 'glass-panel text-gray-800'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
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
              className="fixed inset-0 bg-white/80 backdrop-blur-md z-40 md:hidden top-[4rem] sm:top-[5rem]"
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
              className="md:hidden overflow-hidden relative z-50 bg-white/90 backdrop-blur-xl rounded-b-3xl border-b border-gray-200 shadow-xl mx-[-24px] px-6"
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
                      className={`w-full flex items-center px-6 py-4 rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 font-medium'
                        }`}
                    >
                      <span className="text-lg">{item.name}</span>
                    </motion.button>
                  )
                })}

                {/* Mobile Doom Button */}
                <motion.button
                  onClick={() => scrollToSection('#doom')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: navItems.length * 0.05 }
                  }}
                  className="w-full flex items-center px-6 py-4 rounded-xl transition-all duration-300 text-gray-500 hover:bg-gray-50 font-medium mt-4 border-t border-gray-100/50"
                >
                  <Gamepad2 className="w-5 h-5 mr-3 text-primary-500" />
                  <span className="text-lg">Play DOOM</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}