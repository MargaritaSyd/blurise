import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  invalid?: boolean;
};

export function Textarea({
  invalid,
  className,
  rows = 4,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      className={cx('br-field', 'br-textarea', className)}
      aria-invalid={invalid || undefined}
      rows={rows}
      {...rest}
    />
  );
}

Textarea.displayName = 'Textarea';
