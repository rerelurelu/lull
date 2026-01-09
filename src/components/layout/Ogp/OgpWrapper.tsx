import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const OgpWrapper = ({ children }: Props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #3F4C9C 0%, #2d1b69 100%)',
        padding: '24px',
        fontSize: '72px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          color: '#191C37',
          background: '#F8F9FE',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          borderRadius: '16px',
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
              fontSize: '56px',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                borderRadius: '9999px',
                overflow: 'hidden',
                boxShadow: '0 0 0 3px #5B6FD8',
                alignItems: 'center',
                marginLeft: '8px',
                width: '56px',
                height: '56px',
              }}
            >
              <img
                src='https://avatars.githubusercontent.com/u/43092452?v=4'
                alt="Relu's Icon"
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
