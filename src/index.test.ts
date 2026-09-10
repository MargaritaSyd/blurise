import { describe, expect, it } from 'vitest';
import {
  BlurFade,
  BlurFall,
  BlurRise,
  Button,
  Card,
  Dialog,
  Float,
  Grain,
  Heading,
  Menu,
  ScaleRise,
  Slide,
  Stagger,
  Tabs,
  ToastProvider,
  prefix,
} from './index';

describe('package entry', () => {
  it('exports motion primitives and the core kit', () => {
    expect(prefix).toBe('br');
    expect(BlurRise).toBeTypeOf('function');
    expect(BlurFade).toBeTypeOf('function');
    expect(ScaleRise).toBeTypeOf('function');
    expect(Slide).toBeTypeOf('function');
    expect(BlurFall).toBeTypeOf('function');
    expect(Stagger).toBeTypeOf('function');
    expect(Grain).toBeTypeOf('function');
    expect(Float).toBeTypeOf('function');
    expect(Button).toBeTypeOf('function');
    expect(Card).toBeTypeOf('function');
    expect(Heading).toBeTypeOf('function');
    expect(Dialog).toBeTypeOf('function');
    expect(Menu).toBeTypeOf('function');
    expect(Tabs).toBeTypeOf('function');
    expect(ToastProvider).toBeTypeOf('function');
  });
});
