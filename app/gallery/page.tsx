"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid3x3, List, Calendar, MapPin, Clock } from 'lucide-react'
import { client } from '@/sanity/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

interface GalleryItem {
  _id: string
  title: string
  description?: string
  image: {
    asset: {
      _ref: string
      url: string
    }
  }
  category: string
  date?: string
  tags?: string[]
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'gmb', label: 'GMB Pageant' },
  { id: 'cultural', label: 'Cultural Events' },
  { id: 'brand', label: 'Brand Partnerships' },
  { id: 'community', label: 'Community Outreach' },
]

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const query = `*[_type == "gallery"] | order(date desc) {
        _id,
        title,
        description,
        image{
          asset->{
            _ref,
            url
          }
        },
        category,
        date,
        tags
      }`
      
      const data = await client.fetch(query)
      setGalleryItems(data)
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
            Gallery
          </h1>
          <p className="text-xl text-earth-300 max-w-3xl mx-auto">
            A visual journey through Asakia's GMB experience, cultural engagements, 
            and community initiatives.
          </p>
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-300" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-gold-500"
            />
          </div>
          
          {/* View Toggle */}
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
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                selectedCategory === category.id
                  ? 'border-gold-500 bg-gold-50 text-gold-600'
                  : 'border-earth-200 text-earth-400 hover:border-gold-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-earth-300 mb-4">No gallery items found</div>
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
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <GalleryCard key={item._id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <GalleryListItem key={item._id} item={item} index={index} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 pt-8 border-t border-earth-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">{galleryItems.length}</div>
            <div className="text-sm text-earth-300">Total Images</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {new Set(galleryItems.map(item => item.category)).size}
            </div>
            <div className="text-sm text-earth-300">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {new Date().getFullYear()}
            </div>
            <div className="text-sm text-earth-300">Current Year</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {galleryItems.filter(item => new Date(item.date || '').getFullYear() === new Date().getFullYear()).length}
            </div>
            <div className="text-sm text-earth-300">This Year</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-gold-50 to-earth-50">
        {item.image?.asset?.url ? (
          <Image
            src={item.image.asset.url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">📸</div>
              <p className="text-earth-400 text-sm">{item.title}</p>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="inline-block px-3 py-1 bg-gold-500 text-white text-xs rounded-full">
            {item.category || 'Uncategorized'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2">
          {item.title}
        </h3>
        
        {item.description && (
          <p className="text-earth-300 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {item.date && (
            <div className="flex items-center text-xs text-earth-400">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(item.date).toLocaleDateString('en-GH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}
          
          <div className="text-gold-500 text-sm font-medium group-hover:text-gold-600 transition-colors">
            View Details →
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-gold-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}

function GalleryListItem({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-64 h-48 md:h-auto relative bg-gradient-to-br from-gold-50 to-earth-50">
          {item.image?.asset?.url ? (
            <Image
              src={item.image.asset.url}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-earth-400 text-sm">No image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
            <div>
              <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-xs rounded-full mb-2">
                {item.category || 'Uncategorized'}
              </div>
              <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
                {item.title}
              </h3>
            </div>
            
            {item.date && (
              <div className="flex items-center text-sm text-earth-400 mb-2 md:mb-0">
                <Calendar className="w-4 h-4 mr-2" />
{new Date(item.date).toLocaleDateString('en-GH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              </div>
            )}
          </div>
          
          {item.description && (
            <p className="text-earth-300 mb-4 line-clamp-2">
              {item.description}
            </p>
          )}
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-earth-50 text-earth-400 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="px-2 py-1 bg-earth-50 text-earth-400 text-xs rounded">
                  +{item.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-earth-400">
{item.date && new Date(item.date).toLocaleDateString('en-GH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <button className="text-gold-500 hover:text-gold-600 font-medium">
              View Full Image →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}