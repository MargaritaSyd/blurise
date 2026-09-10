import { cx } from '../lib/cx';
import type { BoxProps } from './types';
import { useMotionActive } from './useMotionActive';

export type BlurFadeProps = BoxProps & {
  /** Wait until the element is on screen before playing. */
  inView?: boolean;
};

/** Enter with blur + opacity (no translate). */
export function BlurFade({
  as: Tag = 'div',
  inView = false,
  className,
  children,
  ...rest
}: BlurFadeProps) {
  const { ref, active } = useMotionActive(inView);

  return (
    <Tag
      className={cx('br-fade', active && 'br-fade-active', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Tag>
  );
}

BlurFade.displayName = 'BlurFade';
