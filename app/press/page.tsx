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
    date: 'October 20, 2025',
    type: 'Television',
    featured: true,
    link: 'https://web.facebook.com/TV3GH/posts/from-upper-east-with-pride-asakia-shines-as-the-1st-runner-up-a-queen-in-every-s/1271282665033545/?_rdc=1&_rdr#',
  },
  {
    id: 2,
    outlet: '3 News Gh',
    title: 'ActionAid Ghana collaborates with GMB Queen Asakia for 2025 GEAP Annual Conference in Tamale',
    date: 'November 21, 2025',
    type: 'Newspaper',
    featured: true,
    link: 'https://dailygraphic.com/cultural-preservation-asakia-hanan',
  },
  {
    id: 3,
    outlet: 'Citi FM',
    title: 'Women in Agriculture: Asakia Hanan Advocates for Rural Women',
    date: 'November 20, 2025',
    type: 'Radio',
    featured: false,
    link: 'https://citifmonline.com/women-agriculture-asakia-hanan',
  },
  {
    id: 4,
    outlet: 'GhanaWeb',
    title: 'From Pageant to Purpose: The Impact Journey of Asakia Hanan',
    date: 'December 5, 2025',
    type: 'Online',
    featured: false,
    link: 'https://ghanaweb.com/pageant-purpose-asakia-hanan',
  },
  {
    id: 5,
    outlet: 'Joy News',
    title: 'Youth Empowerment Through Cultural Education',
    date: 'December 12, 2025',
    type: 'Television',
    featured: false,
    link: 'https://joynews.com/youth-empowerment-cultural-education',
  },
  {
    id: 6,
    outlet: 'Modern Ghana',
    title: 'Fashion as Cultural Expression: Asakia\'s Traditional Attire Collection',
    date: 'December 18, 2025',
    type: 'Online',
    featured: false,
    link: 'https://modernghana.com/fashion-cultural-expression',
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
              title='Filter press coverage by media type'
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

        {/* Results Count */}
        <div className="mb-6 text-sm text-earth-300">
          Showing {filteredItems.length} of {allPressItems.length} articles
        </div>

        {/* Press Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${
                  item.featured ? 'border-2 border-yellow-500' : ''
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    {item.featured && (
                      <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full mb-3">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
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
                    
                    <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2 group-hover:text-yellow-500 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-earth-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-earth-500 group-hover:text-earth-600 transition-colors">
                          {item.outlet}
                        </div>
                        <div className="text-sm text-earth-300">{item.date}</div>
                      </div>
                      <span className="text-yellow-500 group-hover:text-yellow-600 font-medium text-sm inline-flex items-center transition-colors">
                        Read
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
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-earth-300 mb-4">No articles found matching your criteria.</div>
            <button
              onClick={() => {
                setSearch('')
                setFilter('all')
              }}
              className="text-yellow-500 hover:text-yellow-600 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Press Highlights Section */}
      <PressHighlights />
    </div>
  )
}