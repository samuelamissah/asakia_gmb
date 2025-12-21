import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, eventId, name } = body

    // Validate input
    if (!email || !eventId) {
      return NextResponse.json(
        { error: 'Email and event ID are required' },
        { status: 400 }
      )
    }

    // Check if event exists
    const event = await client.fetch(
      `*[_type == "event" && _id == $eventId][0]`,
      { eventId }
    )

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Create subscription document
    const subscription = {
      _type: 'eventSubscription',
      event: {
        _type: 'reference',
        _ref: eventId,
      },
      email,
      name: name || '',
      subscribedAt: new Date().toISOString(),
      status: 'pending',
    }

    // Save to Sanity
    const result = await client.create(subscription)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to event',
      subscriptionId: result._id,
    })
  } catch (error) {
    console.error('Error subscribing to event:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to event' },
      { status: 500 }
    )
  }
}