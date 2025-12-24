"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid3x3, List, Calendar, Folder, Images, MapPin, X, ChevronLeft, ChevronRight, Download, Maximize, Star, Filter } from 'lucide-react'
import Image from 'next/image'

// ==================== INTERFACES ====================
interface GalleryItem {
  id: string
  title: string
  description?: string
  imagePath: string
  category: string
  date?: string
  tags?: string[]
  location?: string
  city?: string
  region?: string
  venue?: string
  width: number
  height: number
  featured?: boolean
  likes?: number
  views?: number
}

interface CategoryInfo {
  id: string
  label: string
  count: number
  thumbnail: string
  color: string
}

interface LightboxItem {
  id: string
  title: string
  description?: string
  imagePath: string
  category: string
  date?: string
  tags?: string[]
  location?: string
  city?: string
  region?: string
  venue?: string
}

// ==================== CONSTANTS ====================
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif']

const GHANA_CITIES = [
  'Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast', 
  'Sunyani', 'Ho', 'Koforidua', 'Wa', 'Bolgatanga'
]

const GHANA_REGIONS = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern',
  'Volta', 'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo'
]

const VENUES = [
  'National Theatre', 'Independence Square', 'Dubois Center',
  'Kumasi Cultural Centre', 'Labadi Beach Hotel', 'Marriott Hotel',
  'Kempinski Hotel', 'Accra International Conference Centre',
  'Sekondi-Takoradi Stadium', 'Cape Coast Castle'
]

// Helper to get image path
function getImagePath(basePath: string, prefix: string, index: number, totalImages: number) {
  const imageNumber = (index % totalImages) + 1
  const extIndex = (index + prefix.charCodeAt(0)) % IMAGE_EXTENSIONS.length
  const ext = IMAGE_EXTENSIONS[extIndex]
  return `${basePath}/${prefix}-${imageNumber}.${ext}`
}

// Helper to get random location
function getRandomLocation() {
  const city = GHANA_CITIES[Math.floor(Math.random() * GHANA_CITIES.length)]
  const region = GHANA_REGIONS[Math.floor(Math.random() * GHANA_REGIONS.length)]
  const venue = VENUES[Math.floor(Math.random() * VENUES.length)]
  return { city, region, venue, location: `${venue}, ${city}` }
}

const categories: Array<{ id: string; label: string; color: string }> = [
  { id: 'all', label: 'All Categories', color: '#92400E' },
  { id: 'gmb-pageant', label: 'GMB Pageant', color: '#D97706' },
  { id: 'cultural-events', label: 'Cultural Events', color: '#059669' },
  { id: 'brand-partnerships', label: 'Brand Partnerships', color: '#DC2626' },
  { id: 'community-outreach', label: 'Community Outreach', color: '#7C3AED' },
  { id: 'media-features', label: 'Media Features', color: '#0EA5E9' },
  { id: 'behind-scenes', label: 'Behind the Scenes', color: '#8B5CF6' },
  { id: 'personal-moments', label: 'Personal Moments', color: '#EC4899' },
]

// ==================== LIGHTBOX COMPONENT ====================
function Lightbox({
  isOpen,
  onClose,
  items,
  initialIndex,
}: {
  isOpen: boolean
  onClose: () => void
  items: LightboxItem[]
  initialIndex: number
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const currentItem = items[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case ' ':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(currentItem.imagePath)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `asakia-${currentItem.id}-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-black/60 rounded-full hover:bg-black/80 transition-all"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-black/60 rounded-full hover:bg-black/80 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-black/60 rounded-full hover:bg-black/80 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7 text-white" />
        </button>

        {/* Image container */}
        <div
          ref={imageRef}
          className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full h-full">
            {currentItem.imagePath && currentItem.imagePath !== '/placeholder.jpg' ? (
              <Image
                src={currentItem.imagePath}
                alt={currentItem.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized={currentItem.imagePath.startsWith('/')}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-white/80 text-lg">{currentItem.title}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info panel */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 md:p-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{
                        backgroundColor: categories.find(c => c.id === currentItem.category)?.color + '40',
                        color: categories.find(c => c.id === currentItem.category)?.color
                      }}
                    >
                      {categories.find(c => c.id === currentItem.category)?.label}
                    </div>
                    {(currentItem as GalleryItem).featured && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-sm">Featured</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {currentItem.title}
                  </h3>

                  {currentItem.description && (
                    <p className="text-white/90 text-lg mb-4 max-w-3xl">
                      {currentItem.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-white/70">
                    {currentItem.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(currentItem.date).toLocaleDateString('en-GH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    {currentItem.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="max-w-xs truncate">{currentItem.location}</span>
                      </div>
                    )}
                  </div>

                  {currentItem.tags && currentItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {currentItem.tags.slice(0, 6).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                    title="Toggle fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all"
                    title="Download image"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>

              {/* Thumbnail navigation */}
              <div className="flex gap-2 overflow-x-auto py-3 scrollbar-thin">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? 'border-yellow-500 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    {item.imagePath && item.imagePath !== '/placeholder.jpg' ? (
                      <Image
                        src={item.imagePath}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-yellow-500/20 to-earth-500/20 flex items-center justify-center">
                        <div className="text-2xl">📸</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image counter */}
          <div className="absolute top-6 left-6 bg-black/60 text-white px-4 py-2 rounded-full text-lg font-medium">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Navigation hints */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/60 text-sm flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </span>
            <span className="flex items-center gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
            <span className="flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              Fullscreen
            </span>
            <span className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Close
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ==================== GALLERY CARD COMPONENT ====================
function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
      onClick={onClick}
    >
      {/* Featured badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white text-xs font-semibold rounded-full">
          <Star className="w-3 h-3 fill-current" />
          <span>Featured</span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-yellow-50 to-earth-50">
        {item.imagePath && item.imagePath !== '/placeholder.jpg' ? (
          <>
            <Image
              src={item.imagePath}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              priority={index < 4}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">📸</div>
              <p className="text-earth-400 text-sm font-medium">{item.title}</p>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className="inline-block px-3 py-1.5 backdrop-blur-sm text-white text-xs font-medium rounded-full"
            style={{
              backgroundColor: categories.find(c => c.id === item.category)?.color + 'CC',
            }}
          >
            {categories.find(c => c.id === item.category)?.label || item.category}
          </div>
        </div>

        {/* Quick stats on hover */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-4 text-white text-sm">
            {item.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate max-w-[120px]">{item.city}</span>
              </div>
            )}
            {item.likes && (
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{item.likes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-earth-700 mb-2 line-clamp-1">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-earth-500 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {item.date && (
              <div className="flex items-center text-xs text-earth-400">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(item.date).toLocaleDateString('en-GH', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            )}

            {item.city && (
              <div className="flex items-center text-xs text-earth-400">
                <MapPin className="w-3 h-3 mr-1" />
                {item.city}
              </div>
            )}
          </div>

          <div className="text-yellow-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-earth-50 text-earth-500 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-earth-50 text-earth-400 text-xs rounded-full">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Border */}
      <div
        className="absolute inset-0 border-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          borderColor: categories.find(c => c.id === item.category)?.color,
        }}
      />
    </motion.div>
  )
}

// ==================== GALLERY LIST ITEM COMPONENT ====================
function GalleryListItem({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-64 h-64 md:h-auto relative bg-gradient-to-br from-yellow-50 to-earth-50 shrink-0">
          {item.imagePath && item.imagePath !== '/placeholder.jpg' ? (
            <Image
              src={item.imagePath}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="256px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-3">📸</div>
                <p className="text-earth-400 text-sm font-medium">No image</p>
              </div>
            </div>
          )}
          {item.featured && (
            <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: categories.find(c => c.id === item.category)?.color + '20',
                    color: categories.find(c => c.id === item.category)?.color,
                  }}
                >
                  {categories.find(c => c.id === item.category)?.label}
                </div>
                {item.venue && (
                  <div className="flex items-center gap-1 text-sm text-earth-500">
                    <MapPin className="w-4 h-4" />
                    <span>{item.venue}</span>
                  </div>
                )}
              </div>

              <h3 className="font-heading text-xl font-semibold text-earth-700 mb-2">
                {item.title}
              </h3>
            </div>

            {item.date && (
              <div className="flex items-center text-sm text-earth-500 whitespace-nowrap mt-2 md:mt-0">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(item.date).toLocaleDateString('en-GH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-earth-600 mb-4 line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Location details */}
          {(item.city || item.region) && (
            <div className="flex items-center gap-4 mb-4 text-sm text-earth-500">
              {item.city && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{item.city}</span>
                  {item.region && <span className="text-earth-400">• {item.region}</span>}
                </div>
              )}
              {item.venue && (
                <div className="text-earth-400">
                  {item.venue}
                </div>
              )}
            </div>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 6).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-earth-50 text-earth-500 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {item.tags.length > 6 && (
                <span className="px-3 py-1 bg-earth-50 text-earth-400 text-sm rounded-full">
                  +{item.tags.length - 6} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-earth-400">
              {item.likes && (
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  <span>{item.likes} likes</span>
                </div>
              )}
              {item.views && (
                <div className="flex items-center gap-1">
                  <span>👁️</span>
                  <span>{item.views} views</span>
                </div>
              )}
            </div>
            <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center gap-1">
              Open Full Size
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ==================== MAIN GALLERY PAGE COMPONENT ====================
export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([])

  // Location filter state
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [showLocationFilters, setShowLocationFilters] = useState(false)

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockItems: GalleryItem[] = [
        // GMB Pageant images with locations
        ...Array.from({ length: 24 }, (_, i) => {
          const location = getRandomLocation()
          return {
            id: `gmb-${i + 1}`,
            title: `GMB ${i < 8 ? 'Performance' : i < 16 ? 'Cultural Night' : 'Grand Finale'} ${(i % 8) + 1}`,
            description: i % 3 === 0 ? 'Official GMB pageant' : 
                        i % 3 === 1 ? 'Stage performance and cultural showcase at the national theatre' : 
                        'Contestant interactions and behind-the-scenes moments',
            imagePath:  `/gallery/gmb-pageant/gmb-${(i % 8) + 1}.jpg`, // Rotate through 8 sample images
            category: 'gmb-pageant',
            date: `2024-${String(Math.floor(i/6) + 10).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`,
            tags: ['pageant', 'contest', 'stage', 'performance', 'beauty', 'culture'],
            width: 1200,
            height: 800,
            featured: i < 3,
            likes: Math.floor(Math.random() * 100) + 50,
            views: Math.floor(Math.random() * 1000) + 500
          }
        }),
        
        // Cultural Events with locations
        ...Array.from({ length: 18 }, (_, i) => {
          const location = getRandomLocation()
          return {
            id: `cultural-${i + 1}`,
            title: `Cultural Festival ${i < 6 ? 'Traditional Dance' : i < 12 ? 'Heritage Exhibition' : 'Community Celebration'} ${(i % 6) + 1}`,
            description: i % 3 === 0 ? 'Traditional dance performances at cultural center' : 
                        i % 3 === 1 ? 'Cultural heritage exhibitions and craft demonstrations' : 
                        'Community cultural celebrations and festival activities',
            imagePath: getImagePath('/gallery/cultural-events', 'cultural', i, 6),
            category: 'cultural-events',
            date: `2024-${String(Math.floor(i/4) + 6).padStart(2, '0')}-${String((i % 4) + 10).padStart(2, '0')}`,
            tags: ['tradition', 'dance', 'festival', 'heritage', 'community', 'celebration'],
            ...location,
            width: 1200,
            height: 900,
            featured: i < 2,
            likes: Math.floor(Math.random() * 80) + 40,
            views: Math.floor(Math.random() * 800) + 400
          }
        }),
        
        // Brand Partnerships with locations
        ...Array.from({ length: 15 }, (_, i) => {
          const location = getRandomLocation()
          return {
            id: `brand-${i + 1}`,
            title: `Brand Collaboration ${i < 5 ? 'Product Launch' : i < 10 ? 'Corporate Event' : 'Brand Ambassador'} ${(i % 5) + 1}`,
            description: i % 3 === 0 ? 'Product launch and brand endorsement event at luxury hotel' : 
                        i % 3 === 1 ? 'Corporate partnership signing ceremony and press conference' : 
                        'Brand ambassador activities and promotional tour',
            imagePath: getImagePath('/gallery/brand-partnerships', 'brand', i, 5),
            category: 'brand-partnerships',
            date: `2024-${String(Math.floor(i/3) + 7).padStart(2, '0')}-${String((i % 3) + 15).padStart(2, '0')}`,
            tags: ['brand', 'collaboration', 'partnership', 'business', 'promotion', 'marketing'],
            ...location,
            width: 1200,
            height: 800,
            featured: i < 2,
            likes: Math.floor(Math.random() * 120) + 60,
            views: Math.floor(Math.random() * 1200) + 600
          }
        }),
        
        // Community Outreach with locations
        ...Array.from({ length: 12 }, (_, i) => {
          const location = getRandomLocation()
          return {
            id: `community-${i + 1}`,
            title: `Community Program ${i < 4 ? 'Education' : i < 8 ? 'Healthcare' : 'Development'} ${(i % 4) + 1}`,
            description: i % 3 === 0 ? 'Educational outreach programs at local schools' : 
                        i % 3 === 1 ? 'Charity and fundraising events for community development' : 
                        'Community development initiatives and empowerment workshops',
            imagePath: getImagePath('/gallery/community-outreach', 'community', i, 4),
            category: 'community-outreach',
            date: `2024-${String(Math.floor(i/2) + 8).padStart(2, '0')}-${String((i % 2) + 20).padStart(2, '0')}`,
            tags: ['community', 'outreach', 'charity', 'education', 'health', 'empowerment'],
            ...location,
            width: 1200,
            height: 850,
            featured: i < 1,
            likes: Math.floor(Math.random() * 150) + 75,
            views: Math.floor(Math.random() * 1500) + 750
          }
        }),
      ]

      setGalleryItems(mockItems)
      
      // Calculate category statistics
      const catInfo: CategoryInfo[] = categories.map(cat => {
        if (cat.id === 'all') {
          return {
            ...cat,
            count: mockItems.length,
            thumbnail: mockItems[0]?.imagePath || '/placeholder.jpg'
          }
        }
        const itemsInCategory = mockItems.filter(item => item.category === cat.id)
        return {
          ...cat,
          count: itemsInCategory.length,
          thumbnail: itemsInCategory[0]?.imagePath || '/placeholder.jpg'
        }
      })
      
      setCategoryInfo(catInfo)
    } catch (error) {
      console.error('Error fetching gallery items:', error)
      const fallbackItems: GalleryItem[] = [
        {
          id: 'fallback-1',
          title: 'Gallery Preview',
          description: 'Gallery items will appear here once loaded',
          imagePath: '/placeholder.jpg',
          category: 'all',
          location: 'Accra, Ghana',
          city: 'Accra',
          region: 'Greater Accra',
          venue: 'Preview Location',
          width: 1200,
          height: 800
        }
      ]
      setGalleryItems(fallbackItems)
      setCategoryInfo(categories.map(cat => ({
        ...cat,
        count: cat.id === 'all' ? 1 : 0,
        thumbnail: '/placeholder.jpg'
      })))
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (index: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const absoluteIndex = startIndex + index
    setLightboxItems(filteredItems.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imagePath: item.imagePath,
      category: item.category,
      date: item.date,
      tags: item.tags,
      location: item.location,
      city: item.city,
      region: item.region,
      venue: item.venue,
      featured: item.featured
    })))
    setLightboxIndex(absoluteIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  // Filter items
  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = 
      search === '' || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      item.city?.toLowerCase().includes(search.toLowerCase()) ||
      item.venue?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = 
      selectedCategory === 'all' || 
      item.category === selectedCategory

    const matchesCity = 
      selectedCity === 'all' || 
      item.city === selectedCity

    const matchesRegion = 
      selectedRegion === 'all' || 
      item.region === selectedRegion

    return matchesSearch && matchesCategory && matchesCity && matchesRegion
  })

  // Get unique cities and regions for filters
  const uniqueCities = Array.from(new Set(galleryItems.map(item => item.city).filter(Boolean)))
  const uniqueRegions = Array.from(new Set(galleryItems.map(item => item.region).filter(Boolean)))

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setSelectedCity('all')
    setSelectedRegion('all')
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-earth-400 text-lg">Loading gallery...</p>
          <p className="text-earth-300 text-sm mt-2">Preparing {galleryItems.length}+ moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-earth-500 mb-6">
            Gallery Collection
          </h1>
          <p className="text-xl text-earth-300 max-w-3xl mx-auto mb-8">
            Explore {galleryItems.length}+ moments from Asakia's journey through 
            GMB pageant, cultural events, brand partnerships, and community outreach across Ghana.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <Images className="w-6 h-6 text-yellow-500" />
              <span className="text-earth-600 font-medium text-lg">{galleryItems.length} Photos</span>
            </div>
            <div className="flex items-center gap-3">
              <Folder className="w-6 h-6 text-yellow-500" />
              <span className="text-earth-600 font-medium text-lg">{categories.length - 1} Categories</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-yellow-500" />
              <span className="text-earth-600 font-medium text-lg">{uniqueCities.length} Locations</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-earth-600 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categoryInfo.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setCurrentPage(1)
              }}
              className={`group relative overflow-hidden rounded-xl p-3 text-left transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'ring-2 ring-offset-2 shadow-lg'
                  : 'hover:ring-2 hover:ring-offset-2 hover:shadow-md'
              }`}
              style={{
                // @ts-ignore – ringColor is a Tailwind CSS custom property
                ringColor: category.color, 
                backgroundColor: selectedCategory === category.id ? `${category.color}10` : 'white',
              }}
            >
              <div className="relative h-20 mb-2 rounded-lg overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: category.color }}
                />
                {category.thumbnail && category.thumbnail !== '/placeholder.jpg' ? (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">📸</div>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-1 left-1 right-1">
                  <div 
                    className="text-white font-semibold text-xs truncate text-center"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {category.label}
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium text-center" style={{ color: category.color }}>
                {category.count} photos
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-300" />
            <input
              type="text"
              placeholder="Search photos by title, description, tags, or location..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-earth-700"
            />
          </div>
          
          {/* View Toggle & Items Per Page */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-earth-50 rounded-full p-1">
              <button
                title='Grid view'
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow text-yellow-600' 
                    : 'text-earth-400 hover:text-yellow-500'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                title='List view'
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white shadow text-yellow-600' 
                    : 'text-earth-400 hover:text-yellow-500'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => setShowLocationFilters(!showLocationFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-earth-200 rounded-full text-sm hover:bg-earth-50 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Location</span>
              {showLocationFilters ? '▼' : '▲'}
            </button>
            
            <select
              title='Items per page'
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-4 py-2 border border-earth-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
              <option value={96}>96 per page</option>
            </select>
          </div>
        </div>

        {/* Location Filters */}
        {showLocationFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-earth-50 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-earth-500" />
              <h3 className="font-semibold text-earth-600">Filter by Location</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth-500 mb-2">City</label>
                <select
                  title='Filter by city'
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full px-4 py-2 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Cities</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-500 mb-2">Region</label>
                <select
                  title='Filter by region'
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full px-4 py-2 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Regions</option>
                  {uniqueRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="text-sm text-earth-400 mr-2 self-center">Filter:</div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                selectedCategory === category.id
                  ? 'text-white shadow-md'
                  : 'bg-white border-earth-200 text-earth-600 hover:border-yellow-300 hover:bg-yellow-50'
              }`}
              style={
                selectedCategory === category.id
                  ? { backgroundColor: category.color, borderColor: category.color }
                  : {}
              }
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-2 text-xs opacity-90">
                  {categoryInfo.find(c => c.id === category.id)?.count || 0}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Summary */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="text-sm text-earth-500">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} photos
            {selectedCategory !== 'all' && ` in "${categories.find(c => c.id === selectedCategory)?.label}"`}
            {selectedCity !== 'all' && ` in ${selectedCity}`}
            {selectedRegion !== 'all' && `, ${selectedRegion}`}
            {search && ` matching "${search}"`}
          </div>
          {(search || selectedCategory !== 'all' || selectedCity !== 'all' || selectedRegion !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
            >
              Clear all filters
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Gallery Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <div className="text-earth-300 mb-2 text-xl">No photos found</div>
            <p className="text-earth-400 mb-6 max-w-md mx-auto">
              Try adjusting your search, category, or location filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} onClick={() => openLightbox(index)} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-earth-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-earth-50 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-yellow-500 text-white'
                            : 'border border-earth-200 hover:bg-earth-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-earth-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-earth-50 transition-colors flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            {currentItems.map((item, index) => (
              <GalleryListItem key={item.id} item={item} index={index} onClick={() => openLightbox(index)} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 pt-8 border-t border-earth-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl">
            <div className="text-3xl font-bold text-yellow-600">{galleryItems.length}+</div>
            <div className="text-sm text-earth-600 font-medium">Total Photos</div>
            <div className="text-xs text-earth-400 mt-1">Across all categories</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-earth-50 to-earth-100 rounded-2xl">
            <div className="text-3xl font-bold text-earth-600">{categories.length - 1}</div>
            <div className="text-sm text-earth-600 font-medium">Categories</div>
            <div className="text-xs text-earth-400 mt-1">Different event types</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl">
            <div className="text-3xl font-bold text-yellow-600">{uniqueCities.length}</div>
            <div className="text-sm text-earth-600 font-medium">Cities</div>
            <div className="text-xs text-earth-400 mt-1">Across Ghana</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-earth-50 to-earth-100 rounded-2xl">
            <div className="text-3xl font-bold text-earth-600">
              {Math.ceil(galleryItems.length / 100) * 100}+
            </div>
            <div className="text-sm text-earth-600 font-medium">Moments Captured</div>
            <div className="text-xs text-earth-400 mt-1">Memorable experiences</div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        items={lightboxItems}
        initialIndex={lightboxIndex}
      />
    </div>
  )
}