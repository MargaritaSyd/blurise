import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type BadgeVariant = 'muted' | 'accent' | 'danger' | 'success';

export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant;
};

export function Badge({ variant = 'muted', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cx('br-badge', `br-badge--${variant}`, className)}
      {...rest}
    />
  );
}

Badge.displayName = 'Badge';
