import { cx } from '../lib/cx';
import type { BoxProps } from './types';
import { useMotionActive } from './useMotionActive';

export type SlideFrom = 'up' | 'down' | 'left' | 'right';

export type SlideProps = BoxProps & {
  /** Direction the element arrives from. */
  from?: SlideFrom;
  /** Wait until the element is on screen before playing. */
  inView?: boolean;
};

/** Enter with a directional slide + opacity (no blur). */
export function Slide({
  as: Tag = 'div',
  from = 'up',
  inView = false,
  className,
  children,
  ...rest
}: SlideProps) {
  const { ref, active } = useMotionActive(inView);

  return (
    <Tag
      className={cx(
        'br-slide',
        `br-slide--${from}`,
        active && 'br-slide-active',
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </Tag>
  );
}

Slide.displayName = 'Slide';
