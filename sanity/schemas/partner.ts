export default {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Ambassador', value: 'ambassador' },
          { title: 'Sponsor', value: 'sponsor' },
          { title: 'Collaborator', value: 'collaborator' },
          { title: 'Media Partner', value: 'media' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'active',
      title: 'Active Partnership',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      type: 'type',
    },
    prepare(selection: any) {
      const { title, media, type } = selection
      return {
        title,
        media,
        subtitle: type,
      }
    },
  },
}