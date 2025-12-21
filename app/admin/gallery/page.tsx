// app/admin/gallery/page.tsx - COMPLETE FIXED VERSION
"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminImageUpload from '@/app/components/gallery/AdminImageUpload'
import { readClient } from '@/sanity/lib/sanity'
import { createGallery, deleteGallery } from '@/app/actions/gallery'
import { FolderOpen, Image as ImageIcon, Eye, Edit, Trash2, Filter, Search } from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'All Categories', color: 'bg-earth-500' },
  { id: 'gmb', label: 'GMB Pageant', color: 'bg-gold-500' },
  { id: 'cultural', label: 'Cultural Events', color: 'bg-forest' },
  { id: 'brand', label: 'Brand Partnerships', color: 'bg-royal' },
  { id: 'community', label: 'Community Work', color: 'bg-clay' },
  { id: 'press', label: 'Press & Media', color: 'bg-blue-500' },
  { id: 'bts', label: 'Behind the Scenes', color: 'bg-purple-500' },
]

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'manage' | 'upload'>('manage')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const query = `*[_type == "gallery"] | order(date desc) {
        _id,
        title,
        category,
        date,
        images[]{
          asset->{
            url,
            metadata {
              dimensions
            }
          }
        },
        featured,
        description,
        tags
      }`
      
      const data = await readClient.fetch(query)
      setGalleries(data)
    } catch (error) {
      console.error('Error fetching galleries:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ FIXED: Better error handling for uploads
  const handleUploadComplete = async (uploadData: any) => {
    console.log('Client: Starting upload via server action...')
    
    try {
      setLoading(true)
      setUploadError('')
      
      // Validate required fields
      if (!uploadData.galleryTitle?.trim()) {
        throw new Error('Gallery title is required')
      }
      
      if (!uploadData.category) {
        throw new Error('Category is required')
      }
      
      if (!uploadData.files || uploadData.files.length === 0) {
        throw new Error('Please select at least one image')
      }
      
      // Call server action (this happens on the server)
      const result = await createGallery(uploadData)
      
      console.log('Server action result:', result)
      
      if (result.success) {
        console.log('✅ Gallery created via server:', result.galleryId)
        
        // Refresh galleries list
        await fetchGalleries()
        
        alert(`✅ Gallery "${uploadData.galleryTitle}" created with ${uploadData.files.length} images!`)
        setActiveTab('manage')
      } else {
        // Show specific error from server
        setUploadError(result.error || 'Unknown error creating gallery')
        alert(`❌ Failed: ${result.error}`)
      }
      
    } catch (error: any) {
      console.error('❌ Error creating gallery:', error)
      const errorMessage = error.message || 'An unexpected error occurred'
      setUploadError(errorMessage)
      alert(`❌ Failed to upload: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return
    
    try {
      const result = await deleteGallery(id)
      
      if (result.success) {
        await fetchGalleries() // Refresh list
        alert('Gallery deleted successfully')
      } else {
        alert(`Failed to delete gallery: ${result.error}`)
      }
    } catch (error: any) {
      console.error('Error deleting gallery:', error)
      alert(`Failed to delete gallery: ${error.message}`)
    }
  }

  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = 
      search === '' ||
      gallery.title?.toLowerCase().includes(search.toLowerCase()) ||
      gallery.description?.toLowerCase().includes(search.toLowerCase()) ||
      gallery.tags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = 
      selectedCategory === 'all' ||
      gallery.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-earth-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-earth-500">
                Gallery Management
              </h1>
              <p className="text-earth-400">
                Organize images by category for Asakia's portfolio
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('upload')}
                className="flex items-center px-6 py-3 bg-gold-500 text-white rounded-xl hover:bg-gold-600 transition-colors font-medium"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Upload to Category
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-earth-200">
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-3 font-medium transition-colors flex items-center ${
                activeTab === 'manage'
                  ? 'border-b-2 border-gold-500 text-gold-500'
                  : 'text-earth-400 hover:text-earth-500'
              }`}
            >
              <FolderOpen className="w-5 h-5 mr-2" />
              Manage Galleries
              <span className="ml-2 px-2 py-1 bg-earth-100 text-earth-600 text-xs rounded-full">
                {galleries.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-medium transition-colors flex items-center ${
                activeTab === 'upload'
                  ? 'border-b-2 border-gold-500 text-gold-500'
                  : 'text-earth-400 hover:text-earth-500'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Upload Images
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'upload' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {uploadError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600">{uploadError}</p>
              </div>
            )}
            
            <AdminImageUpload onUploadComplete={handleUploadComplete} />
            
            {/* Loading overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mx-auto mb-4"></div>
                  <p className="text-earth-500 font-medium">Uploading gallery...</p>
                  <p className="text-earth-400 text-sm mt-2">Please wait while we upload your images</p>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-300" />
                  <input
                    type="text"
                    placeholder="Search galleries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-gold-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-earth-400" />
                  <select
                    title='Filter by category'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-gold-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Galleries Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mx-auto mb-4"></div>
                <p className="text-earth-400">Loading galleries...</p>
              </div>
            ) : filteredGalleries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <FolderOpen className="w-16 h-16 text-earth-300 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
                  No galleries found
                </h3>
                <p className="text-earth-400 mb-6">
                  {search ? 'Try a different search term' : 'Upload your first gallery to get started'}
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 bg-gold-500 text-white rounded-xl hover:bg-gold-600 transition-colors"
                >
                  Upload First Gallery
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGalleries.map((gallery) => {
                  const category = CATEGORIES.find(c => c.id === gallery.category)
                  return (
                    <div key={gallery._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      {/* Header with Category */}
                      <div className={`p-4 ${category?.color} text-white`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <ImageIcon className="w-5 h-5 mr-2" />
                            <span className="font-medium">{category?.label}</span>
                          </div>
                          {gallery.featured && (
                            <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Gallery Info */}
                      <div className="p-6">
                        <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2">
                          {gallery.title}
                        </h3>
                        
                        {gallery.description && (
                          <p className="text-earth-400 text-sm mb-4 line-clamp-2">
                            {gallery.description}
                          </p>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-earth-400 mb-6">
                          <div className="flex items-center">
                            <span className="mr-4">📸 {gallery.images?.length || 0} images</span>
                            <span>{gallery.date}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between border-t border-earth-100 pt-4">
                          <div className="flex space-x-2">
                            <button 
                              title='View gallery'
                              className="p-2 text-earth-400 hover:text-blue-500"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              title='Edit gallery'
                              className="p-2 text-earth-400 hover:text-gold-500"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            title='Delete gallery'
                            onClick={() => handleDeleteGallery(gallery._id)}
                            className="p-2 text-earth-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}