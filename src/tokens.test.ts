import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const tokens = readFileSync(resolve(process.cwd(), 'src/tokens.css'), 'utf8');

const requiredTokens = [
  '--br-color-bg',
  '--br-color-surface',
  '--br-color-text',
  '--br-color-accent',
  '--br-space-1',
  '--br-space-4',
  '--br-radius-md',
  '--br-font-sans',
  '--br-font-size-md',
  '--br-duration-rise',
  '--br-ease-cinematic',
  '--br-blur-from',
  '--br-rise-from',
  '--br-float-amp',
  '--br-float-rotate',
  '--br-stagger-gap',
  '--br-grain-opacity',
];

describe('design tokens', () => {
  it.each(requiredTokens)('defines %s', (name) => {
    expect(tokens).toContain(name);
  });

  it('respects prefers-reduced-motion', () => {
    expect(tokens).toContain('prefers-reduced-motion');
    expect(tokens).toContain('--br-float-amp: 0px');
    expect(tokens).toContain('--br-blur-from: 0px');
  });
});
