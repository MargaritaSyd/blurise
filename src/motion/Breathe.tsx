import { cx } from '../lib/cx';
import type { BoxProps } from './types';

export type BreatheProps = BoxProps;

/** Soft scale pulse — use instead of Float when translate would collide. */
export function Breathe({
  as: Tag = 'div',
  className,
  children,
  ...rest
}: BreatheProps) {
  return (
    <Tag className={cx('br-breathe', className)} {...rest}>
      {children}
    </Tag>
  );
}

Breathe.displayName = 'Breathe';
