import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlurRise } from './BlurRise';
import { Float } from './Float';
import { Grain } from './Grain';
import { Stagger } from './Stagger';

const meta = {
  title: 'Motion/Primitives',
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

const buttonStyle: CSSProperties = {
  fontFamily: 'var(--br-font-sans)',
  fontSize: 'var(--br-font-size-sm)',
  color: 'var(--br-color-bg)',
  background: 'var(--br-color-accent)',
  border: 0,
  borderRadius: 'var(--br-radius-full)',
  padding: '0.45rem 0.9rem',
  cursor: 'pointer',
};

function Stage({ children }: { children: ReactNode }) {
  return (
    <div data-br-theme="dark" style={stageStyle}>
      {children}
    </div>
  );
}

function Replay({ children }: { children: ReactNode }) {
  const [key, setKey] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--br-space-5)' }}>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setKey((value) => value + 1)}
      >
        Replay
      </button>
      <div key={key}>{children}</div>
    </div>
  );
}

function DemoCard({
  title,
  body,
  style,
}: {
  title: string;
  body: string;
  style?: CSSProperties;
}) {
  return (
    <article style={{ ...cardStyle, ...style }}>
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
          fontWeight: 'var(--br-weight-semibold)',
          letterSpacing: '-0.03em',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: 0,
          color: 'var(--br-color-muted)',
          lineHeight: 'var(--br-leading-normal)',
        }}
      >
        {body}
      </p>
    </article>
  );
}

export const Rise: Story = {
  name: 'Blur rise',
  render: () => (
    <Stage>
      <Replay>
        <BlurRise>
          <DemoCard
            title="Blur rise"
            body="Opacity, blur and translateY ease in with the cinematic curve."
          />
        </BlurRise>
      </Replay>
    </Stage>
  ),
};

export const RiseInView: Story = {
  name: 'Blur rise in view',
  render: () => (
    <Stage>
      <p style={{ color: 'var(--br-color-muted)', marginTop: 0 }}>
        Scroll inside the frame. The card stays hidden until it crosses the
        viewport.
      </p>
      <div
        style={{
          height: '16rem',
          overflow: 'auto',
          border: '1px solid var(--br-color-border)',
          borderRadius: 'var(--br-radius-md)',
        }}
      >
        <div style={{ height: '18rem' }} />
        <div style={{ padding: 'var(--br-space-4)' }}>
          <BlurRise inView>
            <DemoCard
              title="In view"
              body="Intersection Observer adds .br-rise-active once, then disconnects."
            />
          </BlurRise>
        </div>
        <div style={{ height: '8rem' }} />
      </div>
    </Stage>
  ),
};

export const Staggered: Story = {
  name: 'Stagger',
  render: () => (
    <Stage>
      <Replay>
        <Stagger
          gap={80}
          style={{
            display: 'grid',
            gap: 'var(--br-space-3)',
            maxWidth: '22rem',
          }}
        >
          {['One', 'Two', 'Three', 'Four'].map((title) => (
            <BlurRise key={title}>
              <DemoCard
                title={title}
                body="Each child inherits --br-i so the rise delay cascades."
              />
            </BlurRise>
          ))}
        </Stagger>
      </Replay>
    </Stage>
  ),
};

export const GrainOverlay: Story = {
  name: 'Grain',
  render: () => (
    <Stage>
      <Grain
        style={{
          ...cardStyle,
          maxWidth: '28rem',
          background:
            'linear-gradient(145deg, var(--br-color-elevated), #2a2430)',
          minHeight: '12rem',
          display: 'grid',
          alignContent: 'end',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 'var(--br-font-size-xl)',
            letterSpacing: '-0.04em',
          }}
        >
          Grain
        </h2>
        <p
          style={{
            margin: 'var(--br-space-2) 0 0',
            color: 'var(--br-color-muted)',
          }}
        >
          A tiled SVG turbulence overlay. Texture, not motion.
        </p>
      </Grain>
    </Stage>
  ),
};

export const IdleFloat: Story = {
  name: 'Idle float',
  render: () => (
    <Stage>
      <Float>
        <DemoCard
          title="Idle float"
          body="A slow translate/rotate loop. It turns off under prefers-reduced-motion."
        />
      </Float>
    </Stage>
  ),
};

export const Composed: Story = {
  name: 'All four',
  render: () => (
    <Stage>
      <Replay>
        <Stagger
          gap={90}
          style={{
            display: 'grid',
            gap: 'var(--br-space-4)',
            maxWidth: '22rem',
          }}
        >
          {['Rise', 'Stagger', 'Grain', 'Float'].map((title) => (
            <BlurRise key={title}>
              <Float>
                <Grain style={{ borderRadius: 'var(--br-radius-lg)' }}>
                  <DemoCard
                    title={title}
                    body="Wrappers stay orthogonal: rise on the outer node, float and grain inside."
                  />
                </Grain>
              </Float>
            </BlurRise>
          ))}
        </Stagger>
      </Replay>
    </Stage>
  ),
};
