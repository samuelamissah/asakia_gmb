// app/api/gallery/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const galleryData = JSON.parse(formData.get('galleryData') as string)
    const files = formData.getAll('files') as File[]
    
    // Upload images
    const imageAssets = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const asset = await client.assets.upload('image', buffer, {
          filename: file.name,
        })
        
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
    
    // Create gallery
    const galleryDoc = {
      _type: 'gallery',
      ...galleryData,
      images: imageAssets,
    }
    
    const createdGallery = await client.create(galleryDoc)
    
    return NextResponse.json({ 
      success: true, 
      galleryId: createdGallery._id 
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}