"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

const galleryImages = [
  {
    id: 1,
    src: '/image2.jpeg', // Make sure this file exists in /public folder
    title: 'GMB Grand Finale',
    category: 'Pageant',
    description: 'Final walk at the GMB 2025 grand finale',
  },
  {
    id: 2,
    src: '/image4.jpg',
    title: 'Cultural Showcase',
    category: 'Cultural',
    description: 'Traditional attire presentation',
  },
  {
    id: 3,
    src: '/image5.png',
    title: 'Community Outreach',
    category: 'Community',
    description: 'Women empowerment workshop',
  },
  {
    id: 4,
    src: '/image6.png',
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
            onClick={() => setSelectedId(image.id)}
          >
            {/* Image container */}
            <div className="relative h-64 md:h-80 w-full">
              {/* Actual Image */}
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {image.category}
                </span>
              </div>
              
              {/* Info panel - slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-earth-900 via-earth-900/95 to-transparent">
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-earth-100 text-sm line-clamp-2">
                  {image.description}
                </p>
                <div className="flex items-center mt-3 text-yellow-300 text-sm">
                  <ImageIcon className="w-4 h-4 mr-1" />
                  <span>Click to view</span>
                </div>
              </div>
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-earth-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                title="Close Lightbox"
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Main content */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Image section */}
                <div className="relative md:w-2/3 h-64 md:h-auto min-h-[400px]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-contain p-4"
                    priority
                  />
                  
                  {/* Navigation buttons */}
                  <button
                    title="Previous Image"
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    title="Next Image"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                  
                  {/* Image count */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium">
                      {galleryImages.findIndex(img => img.id === selectedId) + 1} / {galleryImages.length}
                    </span>
                  </div>
                </div>

                {/* Info section */}
                <div className="md:w-1/3 p-6 md:p-8 bg-linear-to-b from-earth-800 to-earth-900">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-full mb-4">
                      {selectedImage.category}
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                      {selectedImage.title}
                    </h3>
                    <p className="text-earth-100 text-lg leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                  
                  {/* Thumbnail strip */}
                  <div className="mt-8">
                    <h4 className="text-white font-medium mb-3">More Photos</h4>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {galleryImages.map((img) => (
                        <button
                          title={`View ${img.title}`}
                          key={img.id}
                          onClick={() => setSelectedId(img.id)}
                          className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                            selectedId === img.id
                              ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-earth-900'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}