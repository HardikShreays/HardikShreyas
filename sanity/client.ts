import { apiVersion, projectId, dataset } from './env'
import { projects as localProjects, type Project } from '@/data/projects'
import { experiences as localExperiences, type Experience } from '@/data/experience'

export const sanityConfigured = Boolean(projectId)

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt asc){
  "id": _id, title, description, longDescription,
  "image": image.asset->url,
  techStack, githubUrl, liveUrl, featured
}`

const EXPERIENCES_QUERY = `*[_type == "experience"] | order(order asc, _createdAt asc){
  "id": _id, title, company, location, period, description,
  technologies, current,
  "logo": logo.asset->url
}`

// Sanity's query API is a plain GET, so native fetch covers it. Using
// @sanity/client here instead would ship ~180 KB of library to every visitor,
// because next-sanity's export chain pulls it into the browser bundle.
// next-sanity stays installed for the Studio at /studio, which is a separate route.
async function query<T>(groq: string, fallback: T[]): Promise<T[]> {
  if (!projectId) return fallback

  const url =
    `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/` +
    `${encodeURIComponent(dataset)}?query=${encodeURIComponent(groq)}`

  try {
    // revalidate: the whole point of a CMS is edits appearing without a redeploy
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`)
    const { result } = (await res.json()) as { result?: T[] }
    // An empty dataset should show the checked-in content, not an empty page.
    return result?.length ? result : fallback
  } catch (err) {
    // The portfolio must render even when the CMS is unreachable.
    console.error('[sanity] query failed, falling back to local data:', err)
    return fallback
  }
}

export const getProjects = () => query<Project>(PROJECTS_QUERY, localProjects)
export const getExperiences = () => query<Experience>(EXPERIENCES_QUERY, localExperiences)
