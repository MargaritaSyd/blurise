import { cx } from '../lib/cx';
import type { BoxProps } from './types';

export type FloatProps = BoxProps;

export function Float({
  as: Tag = 'div',
  className,
  children,
  ...rest
}: FloatProps) {
  return (
    <Tag className={cx('br-float', className)} {...rest}>
      {children}
    </Tag>
  );
}

Float.displayName = 'Float';
