import { cx } from '../lib/cx';
import type { BoxProps, CSSVars } from './types';

export type GrainProps = BoxProps & {
  /** Override `--br-grain-opacity` (0–1). */
  opacity?: number;
};

export function Grain({
  as: Tag = 'div',
  opacity,
  className,
  style,
  children,
  ...rest
}: GrainProps) {
  const vars: CSSVars = {
    ...style,
    ...(opacity != null ? { '--br-grain-opacity': opacity } : {}),
  };

  return (
    <Tag className={cx('br-grain', className)} style={vars} {...rest}>
      {children}
    </Tag>
  );
}

Grain.displayName = 'Grain';
