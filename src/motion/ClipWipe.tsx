import { cx } from '../lib/cx';
import type { BoxProps } from './types';
import { useMotionActive } from './useMotionActive';

export type ClipWipeFrom = 'up' | 'down' | 'left' | 'right';

export type ClipWipeProps = BoxProps & {
  /** Edge the reveal expands from. */
  from?: ClipWipeFrom;
  /** Wait until the element is on screen before playing. */
  inView?: boolean;
};

/** Enter with a directional clip-path wipe. */
export function ClipWipe({
  as: Tag = 'div',
  from = 'left',
  inView = false,
  className,
  children,
  ...rest
}: ClipWipeProps) {
  const { ref, active } = useMotionActive(inView);

  return (
    <Tag
      className={cx(
        'br-wipe',
        `br-wipe--${from}`,
        active && 'br-wipe-active',
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </Tag>
  );
}

ClipWipe.displayName = 'ClipWipe';
