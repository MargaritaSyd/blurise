import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import type { ButtonProps } from './Button';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  'aria-label': string;
  children: ReactNode;
};

export function IconButton({
  variant = 'ghost',
  size = 'md',
  loading = false,
  type = 'button',
  disabled,
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'br-button',
        'br-button--icon',
        `br-button--${variant}`,
        `br-button--${size}`,
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}

IconButton.displayName = 'IconButton';
