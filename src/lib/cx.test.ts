import { describe, expect, it } from 'vitest';
import { cx } from './cx';

describe('cx', () => {
  it('joins truthy class names', () => {
    expect(cx('br-rise', null, undefined, 'is-on')).toBe('br-rise is-on');
  });
});
