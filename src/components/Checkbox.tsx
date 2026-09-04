import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <input type="checkbox" className={cx('br-checkbox', className)} {...rest} />
  );
}

Checkbox.displayName = 'Checkbox';
