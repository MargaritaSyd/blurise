import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BlurRise } from './BlurRise';
import { Float } from './Float';
import { Grain } from './Grain';
import { Stagger } from './Stagger';

const css = readFileSync(
  resolve(process.cwd(), 'src/motion/motion.css'),
  'utf8',
);

describe('motion.css', () => {
  it.each([
    '@keyframes br-rise',
    '@keyframes br-rise-reduced',
    '@keyframes br-float',
    '.br-rise',
    '.br-rise-active',
    '.br-stagger',
    '.br-grain',
    '.br-float',
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
