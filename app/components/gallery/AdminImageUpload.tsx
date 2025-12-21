"use client"

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Tag, Calendar, MapPin, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface AdminImageUploadProps {
  onUploadComplete: (data: UploadData) => void
}

interface UploadData {
  files: File[]
  category: string
  galleryTitle: string
  date?: string
  location?: string
  description?: string
  tags: string[]
  featured: boolean
}

const CATEGORIES = [
  { id: 'gmb', label: 'GMB Pageant', color: 'bg-gold-500' },
  { id: 'cultural', label: 'Cultural Events', color: 'bg-forest' },
  { id: 'brand', label: 'Brand Partnerships', color: 'bg-royal' },
  { id: 'community', label: 'Community Work', color: 'bg-clay' },
  { id: 'press', label: 'Press & Media', color: 'bg-blue-500' },
  { id: 'bts', label: 'Behind the Scenes', color: 'bg-purple-500' },
]

export default function AdminImageUpload({ onUploadComplete }: AdminImageUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [category, setCategory] = useState<string>('gmb')
  const [galleryTitle, setGalleryTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tags, setTags] = useState<string[]>(['GMB', 'Pageant', 'Ghana'])
  const [newTag, setNewTag] = useState<string>('')
  const [featured, setFeatured] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    
    const selectedFiles = Array.from(e.target.files)
    const newFiles = [...files, ...selectedFiles].slice(0, 50) // Limit to 50 files
    
    setFiles(newFiles)
    
    // Create previews
    selectedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select at least one image')
      return
    }

    if (!galleryTitle.trim()) {
      alert('Please enter a gallery title')
      return
    }

    setUploading(true)

    const uploadData: UploadData = {
      files,
      category,
      galleryTitle,
      date: date || new Date().toISOString().split('T')[0],
      location,
      description,
      tags,
      featured
    }

    console.log('Uploading to category:', category)
    console.log('Upload data:', uploadData)

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500))

    onUploadComplete(uploadData)
    
    // Reset form
    setFiles([])
    setPreviews([])
    setGalleryTitle('')
    setDate('')
    setLocation('')
    setDescription('')
    setTags(['GMB', 'Pageant', 'Ghana'])
    setFeatured(false)
    setUploading(false)

    alert(`Successfully uploaded ${files.length} images to ${CATEGORIES.find(c => c.id === category)?.label}!`)
  }

  const getCategoryColor = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId)?.color || 'bg-gold-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-black mb-2">
              Create New Gallery
            </h2>
            <p className="text-black">
              Upload images to a specific category with details
            </p>
          </div>

          {/* Gallery Title */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Gallery Title *
            </label>
            <input
              type="text"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              placeholder="e.g., GMB Grand Finale 2025"
              className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-gold-500"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Select Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                    category === cat.id
                      ? `border-gold-500 ${cat.color}/10`
                      : 'border-earth-200 hover:border-gold-300'
                  }`}
                >
                  <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center mb-2`}>
                    <ImageIcon className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-sm font-medium text-black">{cat.label}</span>
                  {category === cat.id && (
                    <div className="mt-2 w-4 h-4 rounded-full bg-gold-500"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Selected Category Display */}
            {category && (
              <div className="mt-4 p-3 bg-earth-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-6 h-6 ${getCategoryColor(category)} rounded flex items-center justify-center mr-3`}>
                    <ImageIcon className="w-3 h-3 text-black" />
                  </div>
                  <div>
                    <div className="font-medium text-black">
                      Selected: {CATEGORIES.find(c => c.id === category)?.label}
                    </div>
                    <div className="text-sm text-black">
                      Images will be added to this category
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Date and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Event Date
              </label>
              <input
              title='Select event date'
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 text-black rounded-lg focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Accra, Ghana"
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe this gallery..."
              className="w-full px-4 text-black py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-gold-500 resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              <Tag className="inline w-4 h-4 mr-2" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center px-3 py-1 bg-earth-100 text-black rounded-full"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                  title='Remove tag'
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-black hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 border border-red-200 text-black rounded-lg focus:outline-none focus:border-gold-500"
              />
              <button
              title='Add tag'
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-earth-200 text-black rounded-lg hover:bg-earth-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-gold-50 rounded-xl">
            <div>
              <div className="font-medium text-black">Featured Gallery</div>
              <div className="text-sm text-black">
                Show this gallery on the homepage
              </div>
            </div>
            <button
            title={featured ? 'Unfeature this gallery' : 'Feature this gallery'}
              type="button"
              onClick={() => setFeatured(!featured)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                featured ? 'bg-gold-500' : 'bg-earth-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  featured ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column - File Upload */}
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            className="border-3 border-dashed border-earth-200 rounded-2xl p-8 text-center cursor-pointer hover:border-gold-300 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-earth-300 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-semibold text-black mb-2">
              Drop images here
            </h3>
            <p className="text-black mb-4">
              or click to browse files
            </p>
            <p className="text-sm text-earth-300">
              JPG, PNG, WebP up to 10MB each
            </p>
            <input
            title='Upload images'
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden text-black border-amber-500"
            />
          </div>

          {/* Selected Files Preview */}
          {files.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-black">
                  Selected Images ({files.length})
                </h4>
                <div className="text-sm text-black">
                  Category: <span className="font-medium text-gold-500">
                    {CATEGORIES.find(c => c.id === category)?.label}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-earth-100">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                      title='Remove image'
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 bg-red-500 text-black rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-black text-xs p-1 truncate">
                      {files[index].name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Summary */}
          {files.length > 0 && (
            <div className="bg-earth-50 rounded-xl p-4">
              <h4 className="font-medium text-black mb-3">Upload Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black">Images:</span>
                  <span className="font-medium text-black">{files.length} files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Category:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(category)} text-black`}>
                    {CATEGORIES.find(c => c.id === category)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Gallery:</span>
                  <span className="font-medium text-black">{galleryTitle || 'Untitled'}</span>
                </div>
                {featured && (
                  <div className="flex justify-between">
                    <span className="text-black">Status:</span>
                    <span className="px-2 py-1 bg-gold-100 text-gold-700 rounded-full text-xs">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0 || !galleryTitle.trim()}
            className="w-full flex items-center justify-center px-6 py-4 bg-gold-500 text-black rounded-xl hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                Uploading to {CATEGORIES.find(c => c.id === category)?.label}...
              </>
            ) : (
              `Upload ${files.length} Images to ${CATEGORIES.find(c => c.id === category)?.label}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}