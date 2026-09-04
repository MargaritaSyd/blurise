import { describe, expect, it } from 'vitest';
import { prefix } from './index';

describe('package entry', () => {
  it('exports the css prefix', () => {
    expect(prefix).toBe('br');
  });
});
