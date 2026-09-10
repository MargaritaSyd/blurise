import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlurFade } from './BlurFade';
import { BlurFall } from './BlurFall';
import { ScaleRise } from './ScaleRise';
import { Slide, type SlideFrom } from './Slide';
import { Stagger } from './Stagger';

const meta = {
  title: 'Motion/Enter exit',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const stageStyle = {
  fontFamily: 'var(--br-font-sans)',
  color: 'var(--br-color-text)',
  background: 'var(--br-color-bg)',
  minHeight: '100vh',
  padding: 'var(--br-space-8)',
  boxSizing: 'border-box' as const,
};

const cardStyle = {
  background: 'var(--br-color-surface)',
  border: '1px solid var(--br-color-border)',
  borderRadius: 'var(--br-radius-lg)',
  padding: 'var(--br-space-5)',
  maxWidth: '22rem',
};

const buttonStyle = {
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

function DemoCard({ title, body }: { title: string; body: string }) {
  return (
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

export const Fade: Story = {
  name: 'Blur fade',
  render: () => (
    <Stage>
      <Replay>
        <BlurFade>
          <DemoCard
            title="Blur fade"
            body="Blur and opacity only — no translate. Good for overlays and text."
          />
        </BlurFade>
      </Replay>
    </Stage>
  ),
};

export const Scale: Story = {
  name: 'Scale rise',
  render: () => (
    <Stage>
      <Replay>
        <ScaleRise>
          <DemoCard
            title="Scale rise"
            body="Rise plus a soft scale from --br-scale-from. More hero, still quiet."
          />
        </ScaleRise>
      </Replay>
    </Stage>
  ),
};

export const Slides: Story = {
  name: 'Slide',
  render: () => (
    <Stage>
      <Replay>
        <Stagger
          gap={70}
          style={{
            display: 'grid',
            gap: 'var(--br-space-3)',
            maxWidth: '22rem',
          }}
        >
          {(['up', 'down', 'left', 'right'] as SlideFrom[]).map((from) => (
            <Slide key={from} from={from}>
              <DemoCard
                title={`from ${from}`}
                body="Directional slide with opacity. No blur by design."
              />
            </Slide>
          ))}
        </Stagger>
      </Replay>
    </Stage>
  ),
};

export const Fall: Story = {
  name: 'Blur fall',
  render: () => {
    function FallDemo() {
      const [leaving, setLeaving] = useState(false);
      const [gone, setGone] = useState(false);

      if (gone) {
        return (
          <button
            type="button"
            style={buttonStyle}
            onClick={() => {
              setGone(false);
              setLeaving(false);
            }}
          >
            Reset
          </button>
        );
      }

      return (
        <div style={{ display: 'grid', gap: 'var(--br-space-5)' }}>
          <button
            type="button"
            style={buttonStyle}
            onClick={() => setLeaving(true)}
            disabled={leaving}
          >
            Play exit
          </button>
          <BlurFall
            active={leaving}
            onAnimationEnd={() => {
              if (leaving) setGone(true);
            }}
          >
            <DemoCard
              title="Blur fall"
              body="Exit: blur, drop, and fade. Set active when the surface should leave."
            />
          </BlurFall>
        </div>
      );
    }

    return (
      <Stage>
        <FallDemo />
      </Stage>
    );
  },
};
