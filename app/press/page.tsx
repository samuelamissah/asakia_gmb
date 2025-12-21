"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download } from 'lucide-react'
import PressHighlights from '../components/sections/PressHighlights'

const allPressItems = [
  {
    id: 1,
    outlet: 'TV3 Ghana',
    title: 'GMB 2025 Grand Finale: Asakia Hanan Crowned First Runner-Up',
    date: 'October 15, 2025',
    type: 'Television',
    featured: true,
  },
  {
    id: 2,
    outlet: 'Daily Graphic',
    title: 'Cultural Preservation in Modern Ghana: A Conversation with Asakia Hanan',
    date: 'November 1, 2025',
    type: 'Newspaper',
    featured: true,
  },
  {
    id: 3,
    outlet: 'Citi FM',
    title: 'Women in Agriculture: Asakia Hanan Advocates for Rural Women',
    date: 'November 20, 2025',
    type: 'Radio',
    featured: false,
  },
  {
    id: 4,
    outlet: 'GhanaWeb',
    title: 'From Pageant to Purpose: The Impact Journey of Asakia Hanan',
    date: 'December 5, 2025',
    type: 'Online',
    featured: false,
  },
  {
    id: 5,
    outlet: 'Joy News',
    title: 'Youth Empowerment Through Cultural Education',
    date: 'December 12, 2025',
    type: 'Television',
    featured: false,
  },
  {
    id: 6,
    outlet: 'Modern Ghana',
    title: 'Fashion as Cultural Expression: Asakia\'s Traditional Attire Collection',
    date: 'December 18, 2025',
    type: 'Online',
    featured: false,
  },
]

export default function PressPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredItems = allPressItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                         item.outlet.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || item.type.toLowerCase() === filter
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
          Press & Media
        </h1>
        <p className="text-xl text-earth-300 max-w-3xl mx-auto">
          National media coverage, interviews, and features highlighting Asakia's journey and impact.
        </p>
      </div>

      {/* Media Kit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 mb-12 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">Media Kit</h3>
            <p className="text-yellow-100 mb-4 md:mb-0">
              Download high-resolution photos, biography, and press releases
            </p>
          </div>
          <button className="flex items-center px-6 py-3 bg-white text-yellow-600 font-medium rounded-full hover:bg-yellow-50 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Download Media Kit
          </button>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-300" />
            <input
              type="text"
              placeholder="Search press coverage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-yellow-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-earth-300" />
            <select
            title= 'Filter press coverage by media type'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Media Types</option>
              <option value="television">Television</option>
              <option value="newspaper">Newspaper</option>
              <option value="radio">Radio</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>

        {/* Press Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                item.featured ? 'border-2 border-yellow-500' : ''
              }`}
            >
              <div className="p-6">
                {item.featured && (
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full mb-3">
                    Featured
                  </div>
                )}
                
                <div className="flex items-center mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.type === 'Television' ? 'bg-blue-500' :
                    item.type === 'Newspaper' ? 'bg-red-500' :
                    item.type === 'Radio' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <span className="ml-2 text-sm text-earth-300">{item.type}</span>
                </div>
                
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-earth-100">
                  <div>
                    <div className="font-medium text-earth-500">{item.outlet}</div>
                    <div className="text-sm text-earth-300">{item.date}</div>
                  </div>
                  <button className="text-yellow-500 hover:text-yellow-600 font-medium text-sm">
                    Read →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Press Highlights Section */}
      <PressHighlights />
    </div>
  )
}