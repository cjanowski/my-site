'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users, Heart, Camera, X } from 'lucide-react'

// Family photos - using your actual image names
const familyImages = [
  '/images/family/Family/IMG_0854.jpeg',
  '/images/family/Family/IMG_2075.jpeg',
  '/images/family/Family/IMG_2076.jpeg',
  '/images/family/Family/IMG_2081.jpeg',
  '/images/family/Family/IMG_2090.jpeg',
]

export default function Family() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % familyImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + familyImages.length) % familyImages.length)
    }
  }

  return (
    <section className="py-20 glass-section-white relative overflow-hidden">
      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-title-family">
              Family
            </h2>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The people who matter most. These photos capture precious moments with my family - 
            the foundation of who I am and the source of my greatest joy.
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {familyImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden glass-tile">
                <img
                  src={image}
                  alt={`Family photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback for missing images
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTc1SDIyNVYyMjVIMTc1VjE3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+RmFtaWx5IFBob3RvICN7aW5kZXggKyAxfTwvcD4KPC9zdmc+Cg=='
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Photo Number */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Family Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8 gradient-title-text">
            What Family Means to Me
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-tile-subtle rounded-xl p-6 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-3 text-gray-800">Love</h4>
              <p className="text-gray-600">
                Unconditional love and support that forms the foundation of everything I do.
              </p>
            </div>
            <div className="glass-tile-subtle rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-3 text-gray-800">Unity</h4>
              <p className="text-gray-600">
                Together we're stronger, facing life's challenges and celebrating victories as one.
              </p>
            </div>
            <div className="glass-tile-subtle rounded-xl p-6 text-center">
              <Camera className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-3 text-gray-800">Memories</h4>
              <p className="text-gray-600">
                Creating lasting memories that we'll treasure for generations to come.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={familyImages[selectedImage]}
              alt={`Family photo ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm">
              {selectedImage + 1} of {familyImages.length}
            </div>
          </div>
        </motion.div>
      )}

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
