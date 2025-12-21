// app/test-sanity/page.tsx - TEST CONNECTION
"use client"

import { useState } from 'react'
import { client } from '@/sanity/lib/client'

export default function TestSanityPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    try {
      setLoading(true)
      setResult('Testing connection...')
      
      // Test 1: Count documents
      const count = await client.fetch(`count(*)`)
      setResult(`Total documents: ${count}\n`)
      
      // Test 2: Check gallery schema exists
      const galleries = await client.fetch(`count(*[_type == "gallery"])`)
      setResult(prev => prev + `Gallery documents: ${galleries}\n`)
      
      // Test 3: Try to create a test document
      const testDoc = {
        _type: 'test',
        name: 'Sanity Connection Test',
        timestamp: new Date().toISOString()
      }
      
      const created = await client.create(testDoc)
      setResult(prev => prev + `✅ Created test document: ${created._id}\n`)
      
      // Test 4: Delete test document
      await client.delete(created._id)
      setResult(prev => prev + '✅ Deleted test document\n')
      
      setResult(prev => prev + '\n✅ All tests passed! Sanity is working.')
      
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}\n\nCheck:\n1. CORS settings\n2. API Token\n3. Project ID`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-4"
      >
        {loading ? 'Testing...' : 'Test Sanity Connection'}
      </button>
      <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap min-h-[200px]">
        {result || 'Click to test...'}
      </pre>
    </div>
  )
}