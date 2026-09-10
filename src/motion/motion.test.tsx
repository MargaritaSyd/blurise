import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Breathe } from './Breathe';
import { BlurFade } from './BlurFade';
import { BlurFall } from './BlurFall';
import { BlurRise } from './BlurRise';
import { Float } from './Float';
import { Grain } from './Grain';
import { ClipWipe } from './ClipWipe';
import { ScaleRise } from './ScaleRise';
import { Shimmer } from './Shimmer';
import { Slide } from './Slide';
import { Stagger } from './Stagger';

const css = readFileSync(
  resolve(process.cwd(), 'src/motion/motion.css'),
  'utf8',
);

describe('motion.css', () => {
  it.each([
    '@keyframes br-rise',
    '@keyframes br-rise-reduced',
    '@keyframes br-fade',
    '@keyframes br-scale-rise',
    '@keyframes br-slide',
    '@keyframes br-wipe',
    '@keyframes br-fall',
    '@keyframes br-fall-reduced',
    '@keyframes br-float',
    '@keyframes br-breathe',
    '@keyframes br-shimmer',
    '.br-rise',
    '.br-rise-active',
    '.br-fade',
    '.br-scale-rise',
    '.br-slide',
    '.br-wipe',
    '.br-fall',
    '.br-stagger',
    '.br-grain',
    '.br-float',
    '.br-breathe',
    '.br-shimmer',
    'prefers-reduced-motion',
  ])('contains %s', (snippet) => {
    expect(css).toContain(snippet);
  });
});

describe('BlurRise', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('plays on mount when inView is off', () => {
    render(<BlurRise>Hello</BlurRise>);
    const node = screen.getByText('Hello');
    expect(node).toHaveClass('br-rise', 'br-rise-active');
  });

  it('waits for intersection when inView is on', () => {
    let callback: IntersectionObserverCallback = () => undefined;
    const disconnect = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb;
        }
        observe() {}
        unobserve() {}
        disconnect = disconnect;
      },
    );

    render(<BlurRise inView>Hold</BlurRise>);
    const node = screen.getByText('Hold');
    expect(node).toHaveClass('br-rise');
    expect(node).not.toHaveClass('br-rise-active');

    act(() => {
      callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(node).toHaveClass('br-rise-active');
    expect(disconnect).toHaveBeenCalled();
  });
});

describe('BlurFade', () => {
  it('applies fade classes on mount', () => {
    render(<BlurFade>Soft</BlurFade>);
    expect(screen.getByText('Soft')).toHaveClass('br-fade', 'br-fade-active');
  });
});

describe('ScaleRise', () => {
  it('applies scale-rise classes on mount', () => {
    render(<ScaleRise>Hero</ScaleRise>);
    expect(screen.getByText('Hero')).toHaveClass(
      'br-scale-rise',
      'br-scale-rise-active',
    );
  });
});

describe('Slide', () => {
  it('sets direction and active classes', () => {
    render(<Slide from="left">Side</Slide>);
    expect(screen.getByText('Side')).toHaveClass(
      'br-slide',
      'br-slide--left',
      'br-slide-active',
    );
  });
});

describe('ClipWipe', () => {
  it('sets direction and active classes', () => {
    render(<ClipWipe from="up">Reveal</ClipWipe>);
    expect(screen.getByText('Reveal')).toHaveClass(
      'br-wipe',
      'br-wipe--up',
      'br-wipe-active',
    );
  });
});

describe('BlurFall', () => {
  it('stays settled until active', () => {
    const { rerender } = render(<BlurFall>Leave</BlurFall>);
    const node = screen.getByText('Leave');
    expect(node).toHaveClass('br-fall');
    expect(node).not.toHaveClass('br-fall-active');

    rerender(<BlurFall active>Leave</BlurFall>);
    expect(node).toHaveClass('br-fall-active');
  });
});

describe('Stagger', () => {
  it('sets --br-i on each child and gap on the container', () => {
    const { container } = render(
      <Stagger gap={90}>
        <span>One</span>
        <span>Two</span>
      </Stagger>,
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('br-stagger');
    expect(root.style.getPropertyValue('--br-stagger-gap')).toBe('90ms');

    const items = [...root.children] as HTMLElement[];
    expect(items[0]?.style.getPropertyValue('--br-i')).toBe('0');
    expect(items[1]?.style.getPropertyValue('--br-i')).toBe('1');
  });
});

describe('Grain', () => {
  it('applies the grain class and opacity override', () => {
    const { container } = render(<Grain opacity={0.12}>Film</Grain>);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('br-grain');
    expect(root.style.getPropertyValue('--br-grain-opacity')).toBe('0.12');
  });
});

describe('Float', () => {
  it('applies the float class', () => {
    render(<Float>Drift</Float>);
    expect(screen.getByText('Drift')).toHaveClass('br-float');
  });
});

describe('Breathe', () => {
  it('applies the breathe class', () => {
    render(<Breathe>Pulse</Breathe>);
    expect(screen.getByText('Pulse')).toHaveClass('br-breathe');
  });
});

describe('Shimmer', () => {
  it('applies the shimmer class and opacity override', () => {
    const { container } = render(<Shimmer opacity={0.2}>Load</Shimmer>);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('br-shimmer');
    expect(root.style.getPropertyValue('--br-shimmer-opacity')).toBe('0.2');
  });
});
