// components/gallery/ImageUpload.tsx - NEW
"use client"

import { useState } from 'react'
import { Upload, X, Check } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadComplete: (images: File[]) => void
  maxFiles?: number
}

export default function ImageUpload({ onUploadComplete, maxFiles = 10 }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.slice(0, maxFiles - files.length)
    
    setFiles(prev => [...prev, ...validFiles])
    
    // Create previews
    validFiles.forEach(file => {
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

  const handleUpload = async () => {
    setUploading(true)
    // In production, upload to Sanity or your API
    onUploadComplete(files)
    setFiles([])
    setPreviews([])
    setUploading(false)
  }

  return (
    <div className="border-2 border-dashed border-earth-200 rounded-2xl p-8">
      <div className="text-center">
        <Upload className="w-12 h-12 text-earth-300 mx-auto mb-4" />
        <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2">
          Upload Images
        </h3>
        <p className="text-earth-400 text-sm mb-6">
          Drag & drop or click to browse. Max {maxFiles} images.
        </p>
        
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={files.length >= maxFiles}
          />
          <div className="px-6 py-3 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors inline-block">
            Select Images
          </div>
        </label>
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-earth-50">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  title='Remove image'
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {files[index].name}
                </div>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-earth-400">
              {files.length} of {maxFiles} images selected
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="flex items-center px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Upload {files.length} Images
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}