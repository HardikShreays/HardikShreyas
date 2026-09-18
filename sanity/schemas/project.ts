import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description: 'Shown on the project card.',
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long description',
      type: 'text',
      rows: 5,
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image' },
  },
})
