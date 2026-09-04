import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';
import type { CSSVars } from '../lib/types';

export type ContainerSize = 'sm' | 'md' | 'lg';

export type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  size?: ContainerSize;
};

export function Container({
  size = 'md',
  className,
  style,
  ...rest
}: ContainerProps) {
  const vars: CSSVars = {
    ...style,
    '--br-container-max': `var(--br-container-${size})`,
  };

  return (
    <div className={cx('br-container', className)} style={vars} {...rest} />
  );
}

Container.displayName = 'Container';
