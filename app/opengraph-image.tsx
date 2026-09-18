import { ImageResponse } from 'next/og'

// Link-preview card for LinkedIn, Slack, X and CMS embeds.
// next/og ships with Next — no extra dependency. Also serves as twitter:image.
export const alt = 'Hardik Shreyas — Software Developer & AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0b2e 55%, #2d0f3d 100%)',
        }}
      >
        <div style={{ fontSize: 28, color: '#a855f7', letterSpacing: 6, textTransform: 'uppercase' }}>
          Portfolio
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, color: '#ffffff', marginTop: 16 }}>
          Hardik Shreyas
        </div>
        <div style={{ fontSize: 44, color: '#d8b4fe', marginTop: 8 }}>
          Software Developer &amp; AI Engineer
        </div>
        <div style={{ display: 'flex', width: 220, height: 8, marginTop: 40, background: '#a855f7', borderRadius: 4 }} />
        <div style={{ fontSize: 28, color: '#9ca3af', marginTop: 40 }}>
          Next.js · TypeScript · Node.js · LangChain
        </div>
      </div>
    ),
    size
  )
}
