"use client"

import { Search, Filter, Grid3x3, List } from 'lucide-react'

interface GalleryFiltersProps {
  search: string
  setSearch: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  viewMode: 'grid' | 'masonry'
  setViewMode: (mode: 'grid' | 'masonry') => void
  categories: Array<{ id: string; label: string }>
  totalItems: number
  showingItems: number
}

export default function GalleryFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories,
  totalItems,
  showingItems
}: GalleryFiltersProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-300" />
          <input
            type="text"
            placeholder="Search galleries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-gold-500"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-earth-50 rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white shadow text-gold-500' 
                  : 'text-earth-400 hover:text-gold-500'
              }`}
              title="Grid View"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'masonry' 
                  ? 'bg-white shadow text-gold-500' 
                  : 'text-earth-400 hover:text-gold-500'
              }`}
              title="Masonry View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center mb-3">
          <Filter className="w-4 h-4 text-earth-400 mr-2" />
          <span className="text-sm text-earth-500 font-medium">Filter by:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full border transition-colors text-sm ${
                selectedCategory === category.id
                  ? 'border-gold-500 bg-gold-50 text-gold-600'
                  : 'border-earth-200 text-earth-500 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-earth-400">
        Showing {showingItems} of {totalItems} galleries
        {search && ` for "${search}"`}
        {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
      </div>
    </div>
  )
}