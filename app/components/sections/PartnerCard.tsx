// components/sections/PartnerCard.tsx
"use client"

import { motion } from 'framer-motion'

interface PartnerCardProps {
  partner: {
    name: string
    category: string
    description: string
    logo: string
    link?: string
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
      className="group"
    >
      <a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Logo placeholder */}
        <div className="w-full h-32 bg-earth-50 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-earth-500 font-semibold text-center">
            {partner.name.split(' ').map(word => word[0]).join('')}
          </div>
        </div>
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium text-earth-600 bg-earth-100 rounded-full">
            {partner.category}
          </span>
        </div>
        <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2 group-hover:text-yellow-500 transition-colors">
          {partner.name}
        </h3>
        <p className="text-earth-300 text-sm mb-4">{partner.description}</p>
        <div className="mt-4 pt-4 border-t border-earth-100">
          <span className="text-sm text-yellow-500 font-medium inline-flex items-center">
            Visit website
            <svg 
              className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </div>
      </a>
    </motion.div>
  )
}