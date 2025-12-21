"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { Calendar, MapPin, Clock, Users, ExternalLink, ArrowLeft, Share2, Download } from 'lucide-react'
import Link from 'next/link'

interface Event {
  _id: string
  title: string
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
  agenda?: Array<{
    time: string
    activity: string
    description?: string
  }>
  speakers?: Array<{
    name: string
    role: string
    image?: {
      asset: {
        _ref: string
        url: string
      }
    }
  }>
  registration?: {
    required: boolean
    link?: string
    deadline?: string
    capacity?: number
  }
  status: string
  tags?: string[]
}

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])

  useEffect(() => {
    if (params.slug) {
      fetchEvent()
    }
  }, [params.slug])

  const fetchEvent = async () => {
    try {
      const query = `*[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
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
        agenda,
        speakers,
        registration,
        status,
        tags
      }`
      
      const data = await client.fetch(query, { slug: params.slug })
      setEvent(data)
      
      // Fetch related events
      if (data?.category) {
        const relatedQuery = `*[_type == "event" && category == $category && _id != $id][0...3] {
          _id,
          title,
          date,
          category,
          location,
          status
        }`
        
        const related = await client.fetch(relatedQuery, {
          category: data.category,
          id: data._id,
        })
        setRelatedEvents(related)
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-GH', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'bg-forest'
      case 'pageant': return 'bg-yellow-500'
      case 'charity': return 'bg-clay'
      case 'brand': return 'bg-royal'
      case 'media': return 'bg-blue-500'
      case 'workshop': return 'bg-purple-500'
      default: return 'bg-earth-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-earth-500 mb-4">
          Event Not Found
        </h1>
        <p className="text-earth-300 mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
      </div>
    )
  }

  const isPast = new Date(event.date) < new Date()
  const isOnline = event.location?.online

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/events"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-3 py-1 ${getCategoryColor(event.category)} text-white text-sm rounded-full`}>
                {event.category}
              </span>
              <span className={`px-3 py-1 ${
                event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'
              } text-sm rounded-full`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-earth-500 mb-6">
              {event.title}
            </h1>
          </div>

          {/* Featured Image */}
          {event.featuredImage?.asset?.url && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={event.featuredImage.asset.url}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                priority
              />
            </div>
          )}

          {/* Event Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="font-heading text-2xl font-semibold text-earth-500 mb-6">
              Event Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Date & Time */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                  Date & Time
                </h3>
                <div className="space-y-2">
                  <div className="text-earth-500">
                    <div className="font-medium">{formatDate(event.date)}</div>
                    <div className="text-sm text-earth-400">
                      {formatTime(event.date)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                    </div>
                  </div>
                  {event.endDate && (
                    <div className="text-sm text-earth-400">
                      Ends: {formatDate(event.endDate)}
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                  Location
                </h3>
                <div className="space-y-2">
                  {isOnline ? (
                    <div>
                      <div className="font-medium text-blue-500">Virtual Event</div>
                      {event.location?.link && (
                        <a
                          href={event.location.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-earth-400 hover:text-blue-500 inline-flex items-center"
                        >
                          Join link available
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="text-earth-500">
                      <div className="font-medium">{event.location?.venue || 'Venue TBA'}</div>
                      <div className="text-sm text-earth-400">
                        {event.location?.address && `${event.location.address}, `}
                        {event.location?.city || 'Ghana'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Registration */}
            {event.registration && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-yellow-500" />
                  Registration
                </h3>
                <div className="bg-earth-50 rounded-xl p-6">
                  {event.registration.required ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-earth-500">Registration Required</div>
                          {event.registration.deadline && (
                            <div className="text-sm text-earth-400">
                              Deadline: {formatDate(event.registration.deadline)}
                            </div>
                          )}
                          {event.registration.capacity && (
                            <div className="text-sm text-earth-400">
                              Capacity: {event.registration.capacity} seats
                            </div>
                          )}
                        </div>
                        {event.registration.link && (
                          <a
                            href={event.registration.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                          >
                            Register Now
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-earth-500">
                      <div className="font-medium">No registration required</div>
                      <div className="text-sm text-earth-400">Walk-ins welcome</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {event.description && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4">
                  About This Event
                </h3>
                <div className="prose max-w-none text-earth-500">
                  <PortableText value={event.description} />
                </div>
              </div>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4">
                  Event Agenda
                </h3>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-earth-50 rounded-xl"
                    >
                      <div className="w-20 flex-shrink-0">
                        <div className="font-medium text-yellow-500">{item.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-earth-500 mb-1">{item.activity}</div>
                        {item.description && (
                          <div className="text-sm text-earth-400">{item.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4">
                  Speakers & Participants
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-earth-50 rounded-xl"
                    >
                      {speaker.image?.asset?.url ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={speaker.image.asset.url}
                            alt={speaker.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                          <Users className="w-8 h-8 text-yellow-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-earth-500">{speaker.name}</div>
                        <div className="text-sm text-earth-400">{speaker.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              {event.registration?.link && (
                <a
                  href={event.registration.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                >
                  {isPast ? 'View Recording' : 'Register Now'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
              
              <button className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-50 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share Event
              </button>
              
              <button className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-earth-200 text-earth-400 rounded-full hover:bg-earth-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Add to Calendar
              </button>
            </div>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-earth-50 text-earth-400 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-earth-500 mb-4">
                Related Events
              </h3>
              <div className="space-y-4">
                {relatedEvents.map((relatedEvent) => (
                  <Link
                    key={relatedEvent._id}
                    href={`/events/${relatedEvent.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-4 rounded-xl hover:bg-earth-50 transition-colors"
                  >
                    <div className="font-medium text-earth-500 mb-1">
                      {relatedEvent.title}
                    </div>
                    <div className="text-sm text-earth-400">
                      {formatDate(relatedEvent.date)} • {relatedEvent.category}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}