'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react'

// Thor photos - using your actual image names
const thorImages = [
  '/images/bestfriend/25C470D2-03AD-46E0-B4D5-95597FBFA210_1_105_c.jpeg',
  '/images/bestfriend/CC2F5A9C-4986-4037-88D7-491761D242CE_1_105_c.jpeg',
  '/images/bestfriend/IMG_0335.jpeg',
  '/images/bestfriend/IMG_0382.jpeg',
  '/images/bestfriend/IMG_0391.jpeg',
  '/images/bestfriend/IMG_0395.jpeg',
  '/images/bestfriend/IMG_0396.jpeg',
  '/images/bestfriend/IMG_0403.jpeg',
  '/images/bestfriend/IMG_0412.jpeg',
  '/images/bestfriend/IMG_0551.jpeg',
  '/images/bestfriend/IMG_0595.jpeg',
  '/images/bestfriend/IMG_0600.jpeg',
]

export default function Thor() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % thorImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % thorImages.length)
    setIsAutoPlaying(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + thorImages.length) % thorImages.length)
    setIsAutoPlaying(false)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 glass-section-light relative overflow-hidden">
      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-title-thor">
              My Best Friend - Thor
            </h2>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet Thor, my loyal companion and the best friend anyone could ask for. 
            These photos capture some of our favorite moments together.
          </p>
        </motion.div>

        {/* Main Gallery */}
        <div className="max-w-5xl mx-auto">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8 group"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-tile">
              <img
                src={thorImages[currentImageIndex]}
                alt={`Thor photo ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center 30%' }}
                onError={(e) => {
                  // Fallback for missing images
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDgwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNzUgMjI1SDQyNVYyNzVIMzc1VjIyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+VGhvciBQaG90byAjJHtjdXJyZW50SW1hZ2VJbmRleCArIDF9PC9wPgo8L3N2Zz4K'
                }}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-sm">
                {currentImageIndex + 1} / {thorImages.length}
              </div>
            </div>
          </motion.div>

          {/* Thumbnail Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-3 justify-center overflow-x-auto pb-4"
          >
            {thorImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'ring-4 ring-blue-500 scale-110'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thor thumbnail ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: 'center 30%' }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSAzNUg0NVY0NUgzNVYzNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='
                  }}
                />
              </button>
            ))}
          </motion.div>

          {/* Auto-play Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                isAutoPlaying
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Camera className="w-5 h-5" />
              {isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            </button>
          </motion.div>
        </div>

        {/* Fun Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8 gradient-title-text">
            About Thor
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-tile-subtle rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">Favorite Activities</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Playing fetch in the park</li>
                <li>• Long walks and adventures</li>
                <li>• Belly rubs and cuddles</li>
                <li>• Code Reviews</li>
              </ul>
            </div>
            <div className="glass-tile-subtle rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">Special Traits</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Loves KFC Chicken</li>
                <li>• Great with kids and other pets</li>
                <li>• Excellent problem solver</li>
                <li>• Encourages naps</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
