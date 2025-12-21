// sanity/lib/sanity.ts - UPDATED VERSION
import { createClient } from 'next-sanity'
import { createClient as createSanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Your Sanity project ID (from your error URL: kbp8twqb)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kbp8twqb'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-10-10'

// ✅ Client for BROWSER (read-only, no token exposed)
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for better performance
  // NO TOKEN HERE - safe for browser
})

// ✅ Client for SERVER-SIDE operations (with token)
export const writeClient = createSanityClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_API_TOKEN, // Server-side only
})

// ✅ For image uploads specifically
export const uploadClient = createSanityClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Server-side only
  ignoreBrowserTokenWarning: true,
})

// Helper for building image URLs
const builder = imageUrlBuilder(readClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export function buildImageUrl(source: any) {
  return builder.image(source).url()
}

// Test function to verify connection
export async function testSanityConnection() {
  try {
    console.log('Testing Sanity connection...')
    console.log('Project ID:', projectId)
    console.log('Dataset:', dataset)
    
    // Simple test query using readClient
    const result = await readClient.fetch(`count(*)`)
    console.log('✅ Sanity connection successful! Total documents:', result)
    return true
  } catch (error: any) {
    console.error('❌ Sanity connection failed:', error.message)
    return false
  }
}