"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const galleryImages = [
  {
    id: 1,
    src: '/gallery/1.jpg',
    title: 'GMB Grand Finale',
    category: 'Pageant',
    description: 'Final walk at the GMB 2025 grand finale',
  },
  {
    id: 2,
    src: '/gallery/2.jpg',
    title: 'Cultural Showcase',
    category: 'Cultural',
    description: 'Traditional attire presentation',
  },
  {
    id: 3,
    src: '/gallery/3.jpg',
    title: 'Community Outreach',
    category: 'Community',
    description: 'Women empowerment workshop',
  },
  {
    id: 4,
    src: '/gallery/4.jpg',
    title: 'Media Interview',
    category: 'Press',
    description: 'National television feature',
  },
  {
    id: 5,
    src: '/gallery/5.jpg',
    title: 'Brand Partnership',
    category: 'Brand',
    description: 'Launch event collaboration',
  },
  {
    id: 6,
    src: '/gallery/6.jpg',
    title: 'Cultural Dance',
    category: 'Cultural',
    description: 'Traditional dance performance',
  },
]

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const images = limit ? galleryImages.slice(0, limit) : galleryImages

  const selectedImage = galleryImages.find(img => img.id === selectedId)

  const goToNext = () => {
    if (!selectedId) return
    const currentIndex = galleryImages.findIndex(img => img.id === selectedId)
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setSelectedId(galleryImages[nextIndex].id)
  }

  const goToPrev = () => {
    if (!selectedId) return
    const currentIndex = galleryImages.findIndex(img => img.id === selectedId)
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedId(galleryImages[prevIndex].id)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            layoutId={`gallery-${image.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative cursor-pointer"
            onClick={() => setSelectedId(image.id)}
          >
            {/* Image container */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              {/* Placeholder image */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-earth-100" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs rounded-full mb-2">
                  {image.category}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {image.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`gallery-${selectedId}`}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative h-[60vh] bg-gradient-to-br from-yellow-50 to-earth-50">
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="text-earth-500">Image: {selectedImage.title}</p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-yellow-500 text-white text-sm rounded-full mb-2">
                      {selectedImage.category}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-earth-500">
                      {selectedImage.title}
                    </h3>
                  </div>
                  <button
                  title='Close Lightbox'
                    onClick={() => setSelectedId(null)}
                    className="p-2 hover:bg-earth-50 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-earth-400" />
                  </button>
                </div>
                <p className="text-earth-300">{selectedImage.description}</p>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2">
                <button
                  title='Previous Image'
                  onClick={goToPrev}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-earth-500" />
                </button>
                <button
                  title='Next Image'
                  onClick={goToNext}
                  className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-earth-500" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}