'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, projectId, dataset } from './sanity/env'

export default defineConfig({
  name: 'hardik-portfolio',
  title: 'Hardik Shreyas — Portfolio',
  basePath: '/studio',
  projectId: projectId!,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
})
