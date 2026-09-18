import type { MetadataRoute } from 'next'
import { siteUrl } from '@/data/social'

// ponytail: single-page site, so one entry. Add per-route entries if pages appear.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
