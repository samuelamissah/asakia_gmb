"use client"

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface PartnerCardProps {
  partner: {
    name: string
    category: string
    description: string
    logo: string
  }
  index: number
}

export default function PartnerCard({ partner, index }: PartnerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Logo */}
      <div className="h-48 bg-gradient-to-br from-yellow-50 to-earth-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-4xl mb-2">🏢</div>
          <div className="font-heading text-xl font-semibold text-earth-500">
            {partner.name}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full mb-3">
          {partner.category}
        </div>
        <p className="text-earth-300 mb-4">{partner.description}</p>
        
        <div className="flex items-center justify-between">
          <button className="text-yellow-500 hover:text-yellow-600 font-medium text-sm flex items-center">
            Learn More
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
          <span className="text-xs text-earth-200">Active Partnership</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-yellow-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}