import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const OgpWrapper = ({ children }: Props) => {
  return (
    <div
      style={{
        fontSize: 72,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #00f1f9 0%, #cb33f4 100%)',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          color: 'white',
          background: '#1a1e2e',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          borderRadius: 12,
          padding: '40px',
        }}
      >
        {children}
        <div style={{ width: '100%', display: 'flex' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: 56,
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                borderRadius: '9999px',
                overflow: 'hidden',
                boxShadow: '0 0 0 3px #999eef',
                alignItems: 'center',
                marginLeft: '8px',
                width: 56,
                height: 56,
              }}
            >
              <img
                src='https://avatars.githubusercontent.com/u/43092452?v=4'
                alt='Relu`s Icon'
                width={56}
                height={56}
                style={{ borderRadius: '9999px' }}
              />
            </div>
            <span style={{ paddingBottom: '5px' }}>Relu</span>
          </div>
        </div>
      </div>
    </div>
  )
}
