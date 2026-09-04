import { describe, expect, it } from 'vitest';
import {
  BlurRise,
  Button,
  Card,
  Float,
  Grain,
  Heading,
  Stagger,
  prefix,
} from './index';

describe('package entry', () => {
  it('exports motion primitives and the core kit', () => {
    expect(prefix).toBe('br');
    expect(BlurRise).toBeTypeOf('function');
    expect(Stagger).toBeTypeOf('function');
    expect(Grain).toBeTypeOf('function');
    expect(Float).toBeTypeOf('function');
    expect(Button).toBeTypeOf('function');
    expect(Card).toBeTypeOf('function');
    expect(Heading).toBeTypeOf('function');
  });
});
