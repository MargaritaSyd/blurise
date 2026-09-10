import { cx } from '../lib/cx';
import type { BoxProps, CSSVars } from './types';

export type ShimmerProps = BoxProps & {
  /** Override `--br-shimmer-opacity` (0–1). */
  opacity?: number;
};

/** Sweeping highlight for loading / skeleton surfaces. */
export function Shimmer({
  as: Tag = 'div',
  opacity,
  className,
  style,
  children,
  ...rest
}: ShimmerProps) {
  const vars: CSSVars = {
    ...style,
    ...(opacity != null ? { '--br-shimmer-opacity': opacity } : {}),
  };

  return (
    <Tag className={cx('br-shimmer', className)} style={vars} {...rest}>
      {children}
    </Tag>
  );
}

Shimmer.displayName = 'Shimmer';
