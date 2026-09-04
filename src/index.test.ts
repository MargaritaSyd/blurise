import { describe, expect, it } from 'vitest';
import { BlurRise, Float, Grain, Stagger, prefix } from './index';

describe('package entry', () => {
  it('exports the css prefix and motion primitives', () => {
    expect(prefix).toBe('br');
    expect(BlurRise).toBeTypeOf('function');
    expect(Stagger).toBeTypeOf('function');
    expect(Grain).toBeTypeOf('function');
    expect(Float).toBeTypeOf('function');
  });
});
