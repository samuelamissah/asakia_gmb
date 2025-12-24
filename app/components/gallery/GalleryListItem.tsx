"use client"

import { motion } from 'framer-motion'
import { Calendar, Image as ImageIcon, ChevronRight } from 'lucide-react'

interface GalleryListItemProps {
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
    tags?: string[]
  }
  index: number
  onClick: () => void
}

export default function GalleryListItem({ gallery, index, onClick }: GalleryListItemProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-64 h-48 md:h-auto relative bg-linear-to-br from-gold-50 to-earth-50">
          {gallery.images?.[0]?.asset?.url ? (
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${gallery.images[0].asset.url})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-earth-300" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
            <div>
              <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-xs rounded-full mb-2">
                {gallery.category}
              </div>
              <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
                {gallery.title}
              </h3>
            </div>
            
            {gallery.date && (
              <div className="flex items-center text-sm text-earth-400 mb-2 md:mb-0">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(gallery.date)}
              </div>
            )}
          </div>
          
          {gallery.description && (
            <p className="text-earth-300 mb-4 line-clamp-2">
              {gallery.description}
            </p>
          )}
          
          {gallery.tags && gallery.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {gallery.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-earth-50 text-earth-400 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-earth-100">
            <div className="text-sm text-earth-400">
              {gallery.images?.length || 0} photos
            </div>
            <button className="flex items-center text-gold-500 hover:text-gold-600 font-medium">
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}