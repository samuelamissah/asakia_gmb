"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid3x3, List, Calendar, Folder, Images } from 'lucide-react'
import Image from 'next/image'
import fs from 'fs/promises'
import path from 'path'

interface GalleryItem {
  id: string
  title: string
  description?: string
  imagePath: string
  category: string
  date?: string
  tags?: string[]
  width: number
  height: number
}

interface CategoryInfo {
  id: string
  label: string
  count: number
  thumbnail: string
}

const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'gmb-pageant', label: 'GMB Pageant' },
  { id: 'cultural-events', label: 'Cultural Events' },
  { id: 'brand-partnerships', label: 'Brand Partnerships' },
  { id: 'community-outreach', label: 'Community Outreach' },
  { id: 'media-features', label: 'Media Features' },
  { id: 'behind-scenes', label: 'Behind the Scenes' },
  { id: 'personal-moments', label: 'Personal Moments' },
]



export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  // Mock function to simulate fetching from file system
  // In a real app, you'd use an API route to read files from public folder
  const fetchGalleryItems = async () => {
    try {
      // Simulating data fetch
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock data based on folder structure
      const mockItems: GalleryItem[] = [
        // GMB Pageant (20+ images)
        ...Array.from({ length: 24 }, (_, i) => ({
          id: `gmb-${i + 1}`,
          title: `GMB Event ${i + 1}`,
          description: i % 3 === 0 ? 'Official GMB pageant event photography' : 
                      i % 3 === 1 ? 'Stage performance and cultural showcase' : 
                      'Judges and contestant interactions',
          imagePath: `/gallery/gmb-pageant/gmb-${(i % 8) + 1}.jpg`, // Rotate through 8 sample images
          category: 'gmb-pageant',
          date: `2024-${String(Math.floor(i/6) + 10).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`,
          tags: ['pageant', 'contest', 'stage', 'performance'],
          width: 1200,
          height: 800
        })),
        
        // Cultural Events (15+ images)
        ...Array.from({ length: 18 }, (_, i) => ({
          id: `cultural-${i + 1}`,
          title: `Cultural Festival ${i + 1}`,
          description: i % 3 === 0 ? 'Traditional dance performances' : 
                      i % 3 === 1 ? 'Cultural heritage exhibitions' : 
                      'Community cultural celebrations',
          imagePath: `/gallery/cultural-events/cultural-${(i % 6) + 1}.jpg`,
          category: 'cultural-events',
          date: `2024-${String(Math.floor(i/4) + 6).padStart(2, '0')}-${String((i % 4) + 10).padStart(2, '0')}`,
          tags: ['tradition', 'dance', 'festival', 'heritage'],
          width: 1200,
          height: 900
        })),
        
        // Brand Partnerships (12+ images)
        ...Array.from({ length: 15 }, (_, i) => ({
          id: `brand-${i + 1}`,
          title: `Brand Collaboration ${i + 1}`,
          description: i % 3 === 0 ? 'Product launch and brand endorsements' : 
                      i % 3 === 1 ? 'Corporate partnership events' : 
                      'Brand ambassador activities',
          imagePath: `/gallery/brand-partnerships/brand-${(i % 5) + 1}.jpg`,
          category: 'brand-partnerships',
          date: `2024-${String(Math.floor(i/3) + 7).padStart(2, '0')}-${String((i % 3) + 15).padStart(2, '0')}`,
          tags: ['brand', 'collaboration', 'partnership', 'business'],
          width: 1200,
          height: 800
        })),
        
        // Community Outreach (10+ images)
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `community-${i + 1}`,
          title: `Community Program ${i + 1}`,
          description: i % 3 === 0 ? 'Educational outreach programs' : 
                      i % 3 === 1 ? 'Charity and fundraising events' : 
                      'Community development initiatives',
          imagePath: `/gallery/community-outreach/community-${(i % 4) + 1}.jpg`,
          category: 'community-outreach',
          date: `2024-${String(Math.floor(i/2) + 8).padStart(2, '0')}-${String((i % 2) + 20).padStart(2, '0')}`,
          tags: ['community', 'outreach', 'charity', 'education'],
          width: 1200,
          height: 850
        })),
      ]

      setGalleryItems(mockItems)
      
      // Calculate category statistics
      const catInfo: CategoryInfo[] = categories.map(cat => {
        if (cat.id === 'all') {
          return {
            ...cat,
            count: mockItems.length,
            thumbnail: mockItems[0]?.imagePath || '/gallery/default.jpg'
          }
        }
        const itemsInCategory = mockItems.filter(item => item.category === cat.id)
        return {
          ...cat,
          count: itemsInCategory.length,
          thumbnail: itemsInCategory[0]?.imagePath || '/gallery/default.jpg'
        }
      })
      
      setCategoryInfo(catInfo)
    } catch (error) {
      console.error('Error fetching gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = 
      search === '' || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

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
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-earth-400">Loading gallery...</p>
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
            Gallery Collection
          </h1>
          <p className="text-xl text-earth-300 max-w-3xl mx-auto mb-8">
            Explore {galleryItems.length}+ moments from Asakia's journey through 
            GMB pageant, cultural events, brand partnerships, and community outreach.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Images className="w-5 h-5 text-yellow-500" />
              <span className="text-earth-600 font-medium">{galleryItems.length} Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-yellow-500" />
              <span className="text-earth-600 font-medium">{categories.length - 1} Categories</span>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoryInfo.slice(0, 5).map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setCurrentPage(1)
              }}
              className={`group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'ring-2 ring-yellow-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-yellow-300 hover:ring-offset-2'
              }`}
            >
              <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-earth-100" />
                {category.thumbnail && (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-white font-semibold text-sm truncate">
                        {category.label}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-earth-700">{category.label}</div>
              <div className="text-xs text-earth-400 mt-1">{category.count} photos</div>
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
              placeholder="Search photos by title, description, or tags..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          {/* View Toggle & Items Per Page */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-earth-50 rounded-full p-1">
              <button
                title='Grid view'
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid3x3 className="w-5 h-5 text-earth-400" />
              </button>
              <button
                title='List view'
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List className="w-5 h-5 text-earth-400" />
              </button>
            </div>
            
            <select
            title='Items per page'
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-earth-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
              <option value={96}>96 per page</option>
            </select>
          </div>
        </div>

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
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-500 text-white border-yellow-500 shadow-md'
                  : 'bg-white border-earth-200 text-earth-600 hover:border-yellow-300 hover:bg-yellow-50'
              }`}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-2 text-xs opacity-75">
                  {categoryInfo.find(c => c.id === category.id)?.count || 0}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-earth-500">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} photos
            {selectedCategory !== 'all' && ` in "${categories.find(c => c.id === selectedCategory)?.label}"`}
            {search && ` matching "${search}"`}
          </div>
          {(search || selectedCategory !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Clear all filters
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
            <div className="text-earth-300 mb-4 text-lg">No photos found</div>
            <p className="text-earth-400 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-earth-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-earth-50"
                  >
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
                        className={`w-10 h-10 rounded-lg ${
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
                    className="px-4 py-2 rounded-lg border border-earth-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-earth-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            {currentItems.map((item, index) => (
              <GalleryListItem key={item.id} item={item} index={index} />
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
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-3xl font-bold text-yellow-600">{galleryItems.length}+</div>
            <div className="text-sm text-earth-600">Total Photos</div>
          </div>
          <div className="text-center p-4 bg-earth-50 rounded-xl">
            <div className="text-3xl font-bold text-earth-600">{categories.length - 1}</div>
            <div className="text-sm text-earth-600">Categories</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-3xl font-bold text-yellow-600">
              {new Set(galleryItems.map(item => new Date(item.date || '').getFullYear())).size}
            </div>
            <div className="text-sm text-earth-600">Years Covered</div>
          </div>
          <div className="text-center p-4 bg-earth-50 rounded-xl">
            <div className="text-3xl font-bold text-earth-600">
              {Math.ceil(galleryItems.length / 100) * 100}+
            </div>
            <div className="text-sm text-earth-600">Moments Captured</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-50 to-earth-50">
        {item.imagePath ? (
          <Image
            src={item.imagePath}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📸</div>
              <p className="text-earth-400 text-xs">{item.title}</p>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className="inline-block px-2 py-1 bg-yellow-500/90 backdrop-blur-sm text-white text-xs rounded-full">
            {categories.find(c => c.id === item.category)?.label || item.category}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-earth-700 mb-1 line-clamp-1">{item.title}</h3>
        
        {item.description && (
          <p className="text-earth-500 text-xs mb-2 line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {item.date && (
            <div className="flex items-center text-xs text-earth-400">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(item.date).toLocaleDateString('en-GH', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          )}
          
          <div className="text-yellow-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </div>
        </div>
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}

function GalleryListItem({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-48 relative bg-gradient-to-br from-yellow-50 to-earth-50 flex-shrink-0">
          {item.imagePath ? (
            <Image
              src={item.imagePath}
              alt={item.title}
              fill
              className="object-cover"
              sizes="192px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-earth-400 text-xs">No image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full mb-2">
                {categories.find(c => c.id === item.category)?.label || item.category}
              </div>
              <h3 className="font-heading text-lg font-semibold text-earth-700 mb-2">
                {item.title}
              </h3>
            </div>
            
            {item.date && (
              <div className="flex items-center text-sm text-earth-500 whitespace-nowrap">
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
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-earth-50 text-earth-500 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
              {item.tags.length > 4 && (
                <span className="px-2 py-1 bg-earth-50 text-earth-500 text-xs rounded">
                  +{item.tags.length - 4}
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-earth-500">
              Image {item.id}
            </div>
            <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
              Open Full Size →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}