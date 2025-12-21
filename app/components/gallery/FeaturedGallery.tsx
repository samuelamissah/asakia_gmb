"use client"

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface FeaturedGalleryProps {
  gallery: {
    title: string
    description?: string
    images: Array<{
      asset: {
        url: string
      }
    }>
    category: string
  }
}

export default function FeaturedGallery({ gallery }: FeaturedGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-200 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-gold-500 fill-current" />
              <span className="text-gold-600 font-medium">Featured Gallery</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-earth-500 mb-3">
              {gallery.title}
            </h2>
            <p className="text-earth-400 mb-6">
              {gallery.description || `Explore ${gallery.images?.length || 0} photos from this featured collection`}
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-gold-500 text-white rounded-full font-medium hover:bg-gold-600 transition-colors">
                View Gallery →
              </button>
              <button className="px-6 py-3 border-2 border-gold-500 text-gold-500 rounded-full font-medium hover:bg-gold-50 transition-colors">
                Browse All
              </button>
            </div>
          </div>
          
          <div className="md:w-1/3">
            {gallery.images?.[0] && (
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${gallery.images[0].asset.url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-medium">
                    {gallery.images.length} photos
                  </div>
                  <div className="text-white/80 text-sm">
                    {gallery.category}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}