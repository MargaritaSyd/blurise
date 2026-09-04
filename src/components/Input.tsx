import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean;
};

export function Input({ invalid, className, ...rest }: InputProps) {
  return (
    <input
      className={cx('br-field', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}

Input.displayName = 'Input';
