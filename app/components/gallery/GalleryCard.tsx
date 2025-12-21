"use client"

import { motion } from 'framer-motion'
import { Calendar, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface GalleryCardProps {
  gallery: {
    _id: string
    title: string
    images?: Array<{
      asset: {
        url: string
      }
    }>
    category: string
    date?: string
    description?: string
    featured?: boolean
  }
  index: number
  onClick: () => void
}

export default function GalleryCard({ gallery, index, onClick }: GalleryCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-gold-50 to-earth-50">
        {gallery.images?.[0]?.asset?.url ? (
          <Image
            src={gallery.images[0].asset.url}
            alt={gallery.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-earth-300" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="inline-block px-3 py-1 bg-gold-500 text-white text-xs rounded-full">
            {gallery.category}
          </div>
        </div>

        {/* Featured Badge */}
        {gallery.featured && (
          <div className="absolute top-4 right-4">
            <div className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full">
              Featured
            </div>
          </div>
        )}

        {/* Image Count */}
        <div className="absolute top-12 left-4">
          <div className="flex items-center text-white/80 text-sm">
            <span className="mr-1">📸</span>
            <span>{gallery.images?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2 line-clamp-1">
          {gallery.title}
        </h3>
        
        {gallery.description && (
          <p className="text-earth-300 text-sm mb-3 line-clamp-2">
            {gallery.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {gallery.date && (
            <div className="flex items-center text-xs text-earth-400">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(gallery.date)}
            </div>
          )}
          
          <div className="text-gold-500 text-sm font-medium group-hover:text-gold-600 transition-colors">
            View Gallery →
          </div>
        </div>
      </div>
    </motion.div>
  )
}