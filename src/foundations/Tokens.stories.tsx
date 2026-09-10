import type { CSSProperties } from 'react';
import type { Meta } from '@storybook/react-vite';

const colors = [
  ['bg', '--br-color-bg'],
  ['surface', '--br-color-surface'],
  ['elevated', '--br-color-elevated'],
  ['border', '--br-color-border'],
  ['text', '--br-color-text'],
  ['muted', '--br-color-muted'],
  ['accent', '--br-color-accent'],
  ['focus', '--br-color-focus'],
  ['danger', '--br-color-danger'],
  ['success', '--br-color-success'],
] as const;

const spaces = [
  '--br-space-1',
  '--br-space-2',
  '--br-space-3',
  '--br-space-4',
  '--br-space-5',
  '--br-space-6',
  '--br-space-8',
  '--br-space-10',
] as const;

const typeSizes = [
  '--br-font-size-xs',
  '--br-font-size-sm',
  '--br-font-size-md',
  '--br-font-size-lg',
  '--br-font-size-xl',
  '--br-font-size-2xl',
  '--br-font-size-3xl',
] as const;

const motion = [
  '--br-duration-fast',
  '--br-duration-med',
  '--br-duration-rise',
  '--br-ease-cinematic',
  '--br-blur-from',
  '--br-rise-from',
  '--br-scale-from',
  '--br-slide-from',
  '--br-float-amp',
  '--br-float-duration',
  '--br-float-rotate',
  '--br-stagger-gap',
  '--br-grain-opacity',
] as const;

const pageStyle: CSSProperties = {
  fontFamily: 'var(--br-font-sans)',
  color: 'var(--br-color-text)',
  background: 'var(--br-color-bg)',
  padding: 'var(--br-space-6)',
  display: 'grid',
  gap: 'var(--br-space-8)',
};

const headingStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--br-font-size-xl)',
  fontWeight: 'var(--br-weight-semibold)',
  letterSpacing: '-0.03em',
};

const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Dark = {
  render: () => <TokenGallery theme="dark" />,
};

export const Light = {
  render: () => <TokenGallery theme="light" />,
};

function TokenGallery({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div data-br-theme={theme} style={pageStyle}>
      <header>
        <p
          style={{
            margin: 0,
            color: 'var(--br-color-muted)',
            fontSize: 'var(--br-font-size-sm)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          blurise
        </p>
        <h1 style={headingStyle}>Design tokens</h1>
      </header>

      <section>
        <h2 style={{ ...headingStyle, fontSize: 'var(--br-font-size-lg)' }}>
          Color
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
            gap: 'var(--br-space-3)',
            marginTop: 'var(--br-space-4)',
          }}
        >
          {colors.map(([name, token]) => (
            <div
              key={token}
              style={{
                border: '1px solid var(--br-color-border)',
                borderRadius: 'var(--br-radius-md)',
                overflow: 'hidden',
                background: 'var(--br-color-surface)',
              }}
            >
              <div
                style={{
                  height: '4.5rem',
                  background: `var(${token})`,
                }}
              />
              <div
                style={{
                  padding: 'var(--br-space-3)',
                  fontSize: 'var(--br-font-size-sm)',
                }}
              >
                <strong>{name}</strong>
                <div style={{ color: 'var(--br-color-muted)' }}>{token}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ ...headingStyle, fontSize: 'var(--br-font-size-lg)' }}>
          Spacing
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 'var(--br-space-2)',
            marginTop: 'var(--br-space-4)',
          }}
        >
          {spaces.map((token) => (
            <div
              key={token}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--br-space-3)',
                fontSize: 'var(--br-font-size-sm)',
              }}
            >
              <code
                style={{ minWidth: '9rem', color: 'var(--br-color-muted)' }}
              >
                {token}
              </code>
              <div
                style={{
                  height: 'var(--br-space-4)',
                  width: `var(${token})`,
                  background: 'var(--br-color-accent)',
                  borderRadius: 'var(--br-radius-sm)',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ ...headingStyle, fontSize: 'var(--br-font-size-lg)' }}>
          Type
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 'var(--br-space-3)',
            marginTop: 'var(--br-space-4)',
          }}
        >
          {typeSizes.map((token) => (
            <p
              key={token}
              style={{
                margin: 0,
                fontSize: `var(${token})`,
                lineHeight: 'var(--br-leading-tight)',
              }}
            >
              blurise {token}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ ...headingStyle, fontSize: 'var(--br-font-size-lg)' }}>
          Motion
        </h2>
        <ul
          style={{
            margin: 'var(--br-space-4) 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'grid',
            gap: 'var(--br-space-2)',
            fontSize: 'var(--br-font-size-sm)',
            color: 'var(--br-color-muted)',
          }}
        >
          {motion.map((token) => (
            <li key={token}>
              <code>{token}</code>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
