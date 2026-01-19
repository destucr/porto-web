import { ImageResponse } from 'next/og'

export const alt = 'Destu Cikal - iOS & Full-stack Developer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  // We can load a font here if needed, but for now we'll use a system font stack approach 
  // or a fetch if we wanted a specific font. 
  // For simplicity and speed/robustness in this "fix", we stick to basic styling.

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #333',
            borderRadius: '24px',
            padding: '40px 80px',
            background: 'rgba(255,255,255,0.03)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              marginBottom: 20,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(to bottom right, #fff, #aaa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Destu Cikal
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#888',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            iOS & Full-stack Developer
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 20,
            color: '#444',
          }}
        >
          destucr.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
