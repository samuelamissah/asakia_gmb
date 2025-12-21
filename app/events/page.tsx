"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, ExternalLink, Filter, Search } from 'lucide-react'
import { client } from '@/sanity/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

interface Event {
  _id: string
  title: string
  slug: { current: string }
  featuredImage?: {
    asset: {
      _ref: string
      url: string
    }
  }
  date: string
  endDate?: string
  location?: {
    venue?: string
    address?: string
    city?: string
    country?: string
    online?: boolean
    link?: string
  }
  category: string
  description?: any[]
  status: string
  registration?: {
    required: boolean
    link?: string
    deadline?: string
    capacity?: number
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const query = `*[_type == "event"] | order(date desc) {
        _id,
        title,
        slug,
        featuredImage{
          asset->{
            _ref,
            url
          }
        },
        date,
        endDate,
        location,
        category,
        description,
        status,
        registration
      }`
      
      const data = await client.fetch(query)
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'cultural', label: 'Cultural Events' },
    { id: 'pageant', label: 'Pageant Related' },
    { id: 'charity', label: 'Charity/Outreach' },
    { id: 'brand', label: 'Brand Partnership' },
    { id: 'media', label: 'Media Appearance' },
    { id: 'workshop', label: 'Workshop/Seminar' },
  ]

  const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GH', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-GH', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredEvents = events.filter(event => {
    const now = new Date()
    const eventDate = new Date(event.date)
    
    // Filter by view mode
    const isUpcoming = eventDate >= now
    if (viewMode === 'upcoming' && !isUpcoming) return false
    if (viewMode === 'past' && isUpcoming) return false

    // Filter by search
    const matchesSearch = 
      search === '' ||
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location?.venue?.toLowerCase().includes(search.toLowerCase()) ||
      event.location?.city?.toLowerCase().includes(search.toLowerCase())

    // Filter by category
    const matchesCategory = 
      selectedCategory === 'all' ||
      event.category === selectedCategory

    // Filter by status
    const matchesStatus = 
      selectedStatus === 'all' ||
      event.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'bg-forest text-white'
      case 'pageant': return 'bg-gold-500 text-white'
      case 'charity': return 'bg-clay text-white'
      case 'brand': return 'bg-royal text-white'
      case 'media': return 'bg-blue-500 text-white'
      case 'workshop': return 'bg-purple-500 text-white'
      default: return 'bg-earth-500 text-white'
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      upcoming: { color: 'bg-green-100 text-green-800', label: 'Upcoming' },
      ongoing: { color: 'bg-blue-100 text-blue-800', label: 'Ongoing' },
      completed: { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    }
    return config[status as keyof typeof config] || config.upcoming
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
            Events & Engagements
          </h1>
          <p className="text-xl text-earth-300 max-w-3xl mx-auto">
            Upcoming appearances, speaking engagements, and cultural events featuring Asakia.
          </p>
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        {/* View Mode Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-earth-50 rounded-full p-1">
            <button
              onClick={() => setViewMode('upcoming')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                viewMode === 'upcoming'
                  ? 'bg-gold-500 text-white'
                  : 'text-earth-400 hover:text-earth-500'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setViewMode('past')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                viewMode === 'past'
                  ? 'bg-gold-500 text-white'
                  : 'text-earth-400 hover:text-earth-500'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-300" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
            title='Filter by category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-gold-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            
            <select
            title='Filter by status'
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-earth-200 rounded-full focus:outline-none focus:border-gold-500"
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Events Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-earth-300 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
              No {viewMode} events found
            </h3>
            <p className="text-earth-300 mb-4">
              {viewMode === 'upcoming'
                ? 'Check back soon for upcoming events.'
                : 'No past events to display.'}
            </p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="text-gold-500 hover:text-gold-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 pt-8 border-t border-earth-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {events.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-sm text-earth-300">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {events.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-sm text-earth-300">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {new Set(events.map(e => e.category)).size}
            </div>
            <div className="text-sm text-earth-300">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500">
              {events.filter(e => e.location?.online).length}
            </div>
            <div className="text-sm text-earth-300">Virtual Events</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const statusBadge = {
    upcoming: { color: 'bg-green-100 text-green-800', label: 'Upcoming' },
    ongoing: { color: 'bg-blue-100 text-blue-800', label: 'Ongoing' },
    completed: { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  }[event.status] || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' }

  const categoryColor = {
    cultural: 'bg-forest',
    pageant: 'bg-gold-500',
    charity: 'bg-clay',
    brand: 'bg-royal',
    media: 'bg-blue-500',
    workshop: 'bg-purple-500',
  }[event.category] || 'bg-earth-500'

  const isPast = new Date(event.date) < new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isPast ? 'opacity-80' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-gold-50 to-earth-50">
        {event.featuredImage?.asset?.url ? (
          <Image
            src={event.featuredImage.asset.url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-earth-300 mx-auto mb-2" />
              <p className="text-earth-400 text-sm">{event.title}</p>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className={`px-3 py-1 ${categoryColor} text-white text-xs rounded-full`}>
            {event.category || 'Event'}
          </div>
          <div className={`px-3 py-1 ${statusBadge.color} text-xs rounded-full`}>
            {statusBadge.label}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <h3 className="font-heading text-lg font-semibold text-earth-500 mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-3 mb-4">
          {/* Date & Time */}
          <div className="flex items-center text-sm text-earth-400">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-GH', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}</span>
            {event.endDate && (
              <>
                <span className="mx-2">→</span>
                <span>{new Date(event.endDate).toLocaleDateString('en-GH', {
                  month: 'short',
                  day: 'numeric',
                })}</span>
              </>
            )}
          </div>
          
          {/* Time */}
          <div className="flex items-center text-sm text-earth-400">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleTimeString('en-GH', {
              hour: '2-digit',
              minute: '2-digit',
            })}</span>
            {event.endDate && (
              <>
                <span className="mx-2">-</span>
                <span>{new Date(event.endDate).toLocaleTimeString('en-GH', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}</span>
              </>
            )}
          </div>
          
          {/* Location */}
          <div className="flex items-center text-sm text-earth-400">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            {event.location?.online ? (
              <span className="text-blue-500">Virtual Event</span>
            ) : event.location?.venue ? (
              <span className="line-clamp-1">{event.location.venue}, {event.location.city || 'Ghana'}</span>
            ) : (
              <span>Location TBA</span>
            )}
          </div>
          
          {/* Registration */}
          {event.registration?.required && (
            <div className="flex items-center text-sm text-earth-400">
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>
                Registration {event.registration.capacity ? 
                  `(${event.registration.capacity} seats)` : 
                  'Required'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-earth-100">
          {event.registration?.link ? (
            <a
              href={event.registration.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gold-500 text-white text-sm rounded-full hover:bg-gold-600 transition-colors"
            >
              Register Now
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          ) : (
            <button className="inline-flex items-center px-4 py-2 bg-earth-100 text-earth-500 text-sm rounded-full hover:bg-earth-200 transition-colors">
              More Details
            </button>
          )}
          
          {event.location?.online && event.location?.link && (
            <a
              href={event.location.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Join Online
            </a>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-gold-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}