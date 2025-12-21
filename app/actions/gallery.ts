// app/actions/gallery.ts - TEMPORARY FIX
"use server"

import { writeClient, uploadClient } from '@/sanity/lib/sanity'

export async function createGallery(uploadData: {
  galleryTitle: string
  category: string
  files: File[]
  date?: string
  location?: string
  description?: string
  tags?: string[]
  featured?: boolean
}) {
  try {
    console.log('Server: Creating gallery...')
    
    // 1. Upload images to Sanity
    const imageAssets = await Promise.all(
      uploadData.files.map(async (file: File) => {
        console.log('Server: Uploading file:', file.name)
        
        // Convert File to Buffer for server upload
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        const asset = await uploadClient.assets.upload('image', buffer, {
          filename: file.name,
          contentType: file.type,
        })
        
        console.log('Server: Uploaded asset:', asset._id)
        
        return {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: file.name,
        }
      })
    )
    
    // 2. Create gallery document
    const galleryDoc = {
      _type: 'gallery',
      title: uploadData.galleryTitle,
      slug: {
        _type: 'slug',
        current: uploadData.galleryTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      },
      category: uploadData.category,
      date: uploadData.date || new Date().toISOString().split('T')[0],
      location: uploadData.location || '',
      description: uploadData.description || '',
      images: imageAssets,
      tags: uploadData.tags,
      featured: uploadData.featured || false,
    }
    
    console.log('Server: Creating document...')
    const createdGallery = await writeClient.create(galleryDoc)
    console.log('Server: Created gallery:', createdGallery._id)
    
    return { success: true, galleryId: createdGallery._id }
    
  } catch (error: any) {
    console.error('Server: Error creating gallery:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteGallery(galleryId: string) {
  try {
    console.log('Server: Deleting gallery:', galleryId)
    
    // Delete the gallery document
    await writeClient.delete(galleryId)
    
    return { success: true }
    
  } catch (error: any) {
    console.error('Server: Error deleting gallery:', error)
    return { success: false, error: error.message }
  }
}