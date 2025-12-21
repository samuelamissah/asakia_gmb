export default {
  name: 'eventSubscription',
  title: 'Event Subscription',
  type: 'document',
  fields: [
    {
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'attended',
      title: 'Attended',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'event.title',
      email: 'email',
      name: 'name',
      status: 'status',
    },
    prepare(selection: any) {
      const { title, email, name, status } = selection
      return {
        title: name || email,
        subtitle: `${title} - ${status}`,
      }
    },
  },
}