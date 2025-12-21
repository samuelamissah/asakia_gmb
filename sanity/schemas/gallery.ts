// sanity/schemas/gallery.ts - ENHANCED
export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'array',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true // Enables cropping
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility'
            },
            {
              name: 'photographer',
              type: 'string',
              title: 'Photographer/Credit'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'GMB Pageant', value: 'gmb' },
          { title: 'Cultural Events', value: 'cultural' },
          { title: 'Brand Partnerships', value: 'brand' },
          { title: 'Community Outreach', value: 'community' },
          { title: 'Press & Media', value: 'press' },
          { title: 'Behind the Scenes', value: 'bts' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'event',
      title: 'Related Event',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Link to a specific event (optional)'
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured gallery section'
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'images.0'
    },
    prepare({ title, category, date, media }: { title: string; category: string; date: string; media: any }) {
      return {
        title,
        subtitle: `${category} • ${date}`,
        media
      }
    }
  }
}