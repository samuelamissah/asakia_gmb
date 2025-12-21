export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
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
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, media, category } = selection
      return {
        title,
        media,
        subtitle: category ? `Category: ${category}` : 'No category',
      }
    },
  },
}