// Plain constants only. sanity.config.ts is a client module, so anything it
// imports ships to the browser — keep the server-side client out of this file.
export const apiVersion = '2024-01-01'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
