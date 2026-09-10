import type { AnimationEventHandler } from 'react';
import { cx } from '../lib/cx';
import type { BoxProps } from './types';

export type BlurFallProps = BoxProps & {
  /**
   * When true, plays the exit (blur + fall + fade out).
   * When false, the element stays fully visible.
   */
  active?: boolean;
  onAnimationEnd?: AnimationEventHandler<HTMLElement>;
};

/** Exit with blur, translateY down, and opacity. */
export function BlurFall({
  as: Tag = 'div',
  active = false,
  className,
  children,
  onAnimationEnd,
  ...rest
}: BlurFallProps) {
  return (
    <Tag
      className={cx('br-fall', active && 'br-fall-active', className)}
      {...rest}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </Tag>
  );
}

BlurFall.displayName = 'BlurFall';
