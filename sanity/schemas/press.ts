export default {
  name: 'press',
  title: 'Press',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'outlet',
      title: 'Outlet',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Publication Date',
      type: 'date',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      outlet: 'outlet',
      date: 'date',
    },
    prepare(selection: any) {
      const { title, outlet, date } = selection
      return {
        title,
        subtitle: `${outlet} - ${date}`,
      }
    },
  },
}