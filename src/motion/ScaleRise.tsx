import { cx } from '../lib/cx';
import type { BoxProps } from './types';
import { useMotionActive } from './useMotionActive';

export type ScaleRiseProps = BoxProps & {
  /** Wait until the element is on screen before playing. */
  inView?: boolean;
};

/** Enter with blur, lift, scale, and opacity. */
export function ScaleRise({
  as: Tag = 'div',
  inView = false,
  className,
  children,
  ...rest
}: ScaleRiseProps) {
  const { ref, active } = useMotionActive(inView);

  return (
    <Tag
      className={cx(
        'br-scale-rise',
        active && 'br-scale-rise-active',
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </Tag>
  );
}

ScaleRise.displayName = 'ScaleRise';
