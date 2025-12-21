export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'venue',
          title: 'Venue',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Ghana',
        },
        {
          name: 'online',
          title: 'Online Event',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'link',
          title: 'Event Link',
          type: 'url',
          hidden: ({ parent }: any) => !parent?.online,
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cultural Event', value: 'cultural' },
          { title: 'Pageant Related', value: 'pageant' },
          { title: 'Charity/Outreach', value: 'charity' },
          { title: 'Brand Partnership', value: 'brand' },
          { title: 'Media Appearance', value: 'media' },
          { title: 'Workshop/Seminar', value: 'workshop' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'agenda',
      title: 'Event Agenda',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Time',
              type: 'string',
            },
            {
              name: 'activity',
              title: 'Activity',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'speakers',
      title: 'Speakers/Participants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
          ],
        },
      ],
    },
    {
      name: 'registration',
      title: 'Registration Details',
      type: 'object',
      fields: [
        {
          name: 'required',
          title: 'Registration Required',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'link',
          title: 'Registration Link',
          type: 'url',
          hidden: ({ parent }: any) => !parent?.required,
        },
        {
          name: 'deadline',
          title: 'Registration Deadline',
          type: 'datetime',
          hidden: ({ parent }: any) => !parent?.required,
        },
        {
          name: 'capacity',
          title: 'Capacity',
          type: 'number',
          hidden: ({ parent }: any) => !parent?.required,
        },
      ],
    },
    {
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      status: 'status',
      media: 'featuredImage',
    },
    prepare(selection: any) {
      const { title, date, status, media } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title,
        media,
        subtitle: `${formattedDate} • ${status}`,
      }
    },
  },
}