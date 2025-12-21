// app/gallery/debug/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'

export default function GalleryDebugPage() {
  const [rawData, setRawData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Same query as your gallery page
        const query = `*[_type == "gallery"] | order(date desc) {
          _id,
          title,
          description,
          images[]{
            asset->{
              _ref,
              url
            }
          },
          category,
          date,
          tags
        }`
        
        const data = await client.fetch(query)
        setRawData(data)
        console.log('Gallery data from Sanity:', data)
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) return <div>Loading debug data...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery Debug</h1>
      
      {rawData && rawData.length > 0 ? (
        <>
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">✅ Found {rawData.length} gallery items</p>
          </div>
          
          <div className="space-y-6">
            {rawData.map((gallery: any, index: number) => (
              <div key={gallery._id} className="border p-4 rounded-lg">
                <h2 className="font-bold">{gallery.title}</h2>
                <p>ID: {gallery._id}</p>
                <p>Category: {gallery.category}</p>
                <p>Date: {gallery.date}</p>
                <p>Images count: {gallery.images?.length || 0}</p>
                
                {gallery.images && gallery.images.length > 0 ? (
                  <div className="mt-2">
                    <p className="font-medium">Image URLs:</p>
                    <ul className="text-sm text-blue-600">
                      {gallery.images.map((img: any, i: number) => (
                        <li key={i}>
                          {img.asset?.url ? (
                            <a href={img.asset.url} target="_blank" rel="noopener noreferrer">
                              Image {i + 1}
                            </a>
                          ) : (
                            `Image ${i + 1}: No URL`
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-red-500">No images in this gallery!</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-700">❌ No gallery data found in Sanity</p>
          <p className="mt-2">This means either:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>No gallery documents exist in your Sanity dataset</li>
            <li>Your query is wrong</li>
            <li>Your Sanity client configuration is wrong</li>
          </ul>
        </div>
      )}
    </div>
  )
}