import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'company', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'period',
      type: 'string',
      description: 'Free text, e.g. "Apr 2025 – May 2025" or "2024 – Present".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Bullet points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'current', title: 'Current role', type: 'boolean', initialValue: false }),
    defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'company', media: 'logo' },
  },
})
