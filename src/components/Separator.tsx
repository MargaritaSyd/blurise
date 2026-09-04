import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type SeparatorProps = ComponentPropsWithoutRef<'hr'> & {
  orientation?: 'horizontal' | 'vertical';
};

export function Separator({
  orientation = 'horizontal',
  className,
  ...rest
}: SeparatorProps) {
  const vertical = orientation === 'vertical';

  return (
    <hr
      className={cx(
        'br-separator',
        vertical && 'br-separator--vertical',
        className,
      )}
      aria-orientation={orientation}
      {...rest}
    />
  );
}

Separator.displayName = 'Separator';
