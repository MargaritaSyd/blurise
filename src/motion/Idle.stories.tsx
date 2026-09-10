import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breathe } from './Breathe';
import { Shimmer } from './Shimmer';

const meta = {
  title: 'Motion/Idle',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const stageStyle: CSSProperties = {
  fontFamily: 'var(--br-font-sans)',
  color: 'var(--br-color-text)',
  background: 'var(--br-color-bg)',
  minHeight: '100vh',
  padding: 'var(--br-space-8)',
  boxSizing: 'border-box',
};

const cardStyle: CSSProperties = {
  background: 'var(--br-color-surface)',
  border: '1px solid var(--br-color-border)',
  borderRadius: 'var(--br-radius-lg)',
  padding: 'var(--br-space-5)',
  maxWidth: '22rem',
};

function Stage({ children }: { children: ReactNode }) {
  return (
    <div data-br-theme="dark" style={stageStyle}>
      {children}
    </div>
  );
}

export const BreatheStory: Story = {
  name: 'Breathe',
  render: () => (
    <Stage>
      <Breathe>
        <article style={cardStyle}>
          <p
            style={{
              margin: 0,
              color: 'var(--br-color-muted)',
              fontSize: 'var(--br-font-size-xs)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            blurise
          </p>
          <h2
            style={{
              margin: 'var(--br-space-2) 0 var(--br-space-3)',
              fontSize: 'var(--br-font-size-lg)',
              letterSpacing: '-0.03em',
            }}
          >
            Breathe
          </h2>
          <p style={{ margin: 0, color: 'var(--br-color-muted)' }}>
            Soft scale pulse. Prefer this over Float when translate would fight
            another transform.
          </p>
        </article>
      </Breathe>
    </Stage>
  ),
};

export const ShimmerStory: Story = {
  name: 'Shimmer',
  render: () => (
    <Stage>
      <div
        style={{
          display: 'grid',
          gap: 'var(--br-space-4)',
          maxWidth: '22rem',
        }}
      >
        <Shimmer
          style={{
            ...cardStyle,
            display: 'grid',
            gap: 'var(--br-space-3)',
          }}
        >
          <div
            style={{
              height: '0.85rem',
              width: '40%',
              borderRadius: 'var(--br-radius-sm)',
              background: 'var(--br-color-elevated)',
            }}
          />
          <div
            style={{
              height: '0.85rem',
              width: '100%',
              borderRadius: 'var(--br-radius-sm)',
              background: 'var(--br-color-elevated)',
            }}
          />
          <div
            style={{
              height: '0.85rem',
              width: '72%',
              borderRadius: 'var(--br-radius-sm)',
              background: 'var(--br-color-elevated)',
            }}
          />
        </Shimmer>
        <p
          style={{
            margin: 0,
            color: 'var(--br-color-muted)',
            fontSize: 'var(--br-font-size-sm)',
          }}
        >
          Skeleton loading highlight. Off under prefers-reduced-motion.
        </p>
      </div>
    </Stage>
  ),
};
