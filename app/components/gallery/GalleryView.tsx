"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryCard from './GalleryCard'
import GalleryListItem from './GalleryListItem'
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react'
import Image from 'next/image'

interface GalleryViewProps {
  galleries: Array<{
    _id: string
    title: string
    images: Array<{
      asset: {
        url: string
        metadata?: {
          dimensions: {
            width: number
            height: number
          }
          lqip?: string
        }
      }
      caption?: string
      alt?: string
    }>
    category: string
    date?: string
    description?: string
    featured?: boolean
  }>
  viewMode: 'grid' | 'masonry'
}

export default function GalleryView({ galleries, viewMode }: GalleryViewProps) {
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openLightbox = (galleryIndex: number, imageIndex: number = 0) => {
    setSelectedGallery(galleryIndex)
    setSelectedImageIndex(imageIndex)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedGallery(null)
    document.body.style.overflow = 'auto'
  }

  const goToNextImage = () => {
    if (selectedGallery === null) return
    const gallery = galleries[selectedGallery]
    setSelectedImageIndex((prev) => 
      prev === gallery.images.length - 1 ? 0 : prev + 1
    )
  }

  const goToPrevImage = () => {
    if (selectedGallery === null) return
    const gallery = galleries[selectedGallery]
    setSelectedImageIndex((prev) => 
      prev === 0 ? gallery.images.length - 1 : prev - 1
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery, index) => (
            <GalleryCard
              key={gallery._id}
              gallery={gallery}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {galleries.map((gallery, index) => (
            <GalleryListItem
              key={gallery._id}
              gallery={gallery}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGallery !== null && galleries[selectedGallery]?.images?.[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative h-[70vh] rounded-xl overflow-hidden bg-earth-900">
                <Image
                  src={galleries[selectedGallery].images[selectedImageIndex].asset.url}
                  alt={galleries[selectedGallery].images[selectedImageIndex].alt || galleries[selectedGallery].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Gallery Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-1">
                      {galleries[selectedGallery].title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {galleries[selectedGallery].images[selectedImageIndex].caption || 
                       `Image ${selectedImageIndex + 1} of ${galleries[selectedGallery].images.length}`}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-white/60 text-sm">
                        {galleries[selectedGallery].category}
                      </span>
                      {galleries[selectedGallery].date && (
                        <span className="text-white/60 text-sm">
                          {formatDate(galleries[selectedGallery].date)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = galleries[selectedGallery].images[selectedImageIndex].asset.url
                        link.download = `asakia-gallery-${selectedImageIndex + 1}.jpg`
                        link.click()
                      }}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={async () => {
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: 'Asakia Gallery',
                              text: galleries[selectedGallery].images[selectedImageIndex].caption || 'Check out this photo from Asakia!',
                              url: galleries[selectedGallery].images[selectedImageIndex].asset.url
                            })
                          } catch (error) {
                            console.log('Sharing cancelled')
                          }
                        } else {
                          navigator.clipboard.writeText(galleries[selectedGallery].images[selectedImageIndex].asset.url)
                          alert('Image URL copied to clipboard!')
                        }
                      }}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
              title='Previous image'
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevImage()
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
              title='Next image'
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextImage()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Close Button */}
              <button
              title='Close lightbox'
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                {selectedImageIndex + 1} / {galleries[selectedGallery].images.length}
              </div>

              {/* Thumbnail Strip */}
              {galleries[selectedGallery].images.length > 1 && (
                <div className="absolute bottom-20 left-0 right-0 overflow-x-auto py-4">
                  <div className="flex space-x-2 px-4">
                    {galleries[selectedGallery].images.map((image, index) => (
                      <button
                      title={`View image ${index + 1}`}
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImageIndex(index)
                        }}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedImageIndex
                            ? 'border-gold-500 scale-110'
                            : 'border-transparent hover:border-white/50'
                        }`}
                      >
                        <Image
                          src={image.asset.url}
                          alt=""
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}