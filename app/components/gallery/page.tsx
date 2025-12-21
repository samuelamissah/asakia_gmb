"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/sanity/lib/client'    
import GalleryView from '@/app/components/gallery/GalleryView'
import GalleryFilters from '@/app/components/gallery/GalleryFilters'
import FeaturedGallery from '@/app/components/gallery/FeaturedGallery'
import GalleryCard from '@/app/components/gallery/GalleryCard'

const categories = [
  { id: 'all', label: 'All Galleries' },
  { id: 'gmb', label: 'GMB Journey' },
  { id: 'cultural', label: 'Cultural Events' },
  { id: 'brand', label: 'Brand Partnerships' },
  { id: 'community', label: 'Community Work' },
  { id: 'press', label: 'Press & Media' },
  { id: 'bts', label: 'Behind the Scenes' },
]

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      const query = `*[_type == "gallery"] | order(date desc) {
        _id,
        title,
        slug,
        images[]{
          asset->{
            url,
            metadata {
              dimensions,
              lqip
            }
          },
          caption,
          alt
        },
        category,
        date,
        description,
        tags,
        featured
      }`
      
      const data = await client.fetch(query)
      setGalleries(data)
    } catch (error) {
      console.error('Error fetching galleries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = 
      search === '' ||
      gallery.title.toLowerCase().includes(search.toLowerCase()) ||
      gallery.description?.toLowerCase().includes(search.toLowerCase()) ||
      gallery.tags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = 
      selectedCategory === 'all' ||
      gallery.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredGallery = galleries.find(g => g.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-earth-300 max-w-3xl mx-auto">
            Visual chronicle of Asakia's journey as GMB 2025 First Runner-Up
          </p>
        </motion.div>
      </div>

      {/* Featured Gallery */}
      {featuredGallery && (
        <FeaturedGallery gallery={featuredGallery} />
      )}

      {/* Filters */}
      <GalleryFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        totalItems={galleries.length}
        showingItems={filteredGalleries.length}
      />

      {/* Gallery Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-earth-400">Loading galleries...</p>
        </div>
      ) : filteredGalleries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
            No galleries found
          </h3>
          <p className="text-earth-300 mb-4">
            {search ? 'Try a different search term' : 'No galleries available yet'}
          </p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedCategory('all')
            }}
            className="text-gold-500 hover:text-gold-600 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <GalleryView 
          galleries={filteredGalleries} 
          viewMode={viewMode}
        />
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 pt-8 border-t border-earth-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">{galleries.length}</div>
            <div className="text-sm text-earth-300">Galleries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {galleries.reduce((total, gallery) => total + (gallery.images?.length || 0), 0)}
            </div>
            <div className="text-sm text-earth-300">Total Photos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {new Set(galleries.map(g => g.category)).size}
            </div>
            <div className="text-sm text-earth-300">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {galleries.filter(g => g.featured).length}
            </div>
            <div className="text-sm text-earth-300">Featured</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}