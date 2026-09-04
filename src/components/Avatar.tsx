import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
};

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  className,
  ...rest
}: AvatarProps) {
  return (
    <span
      className={cx('br-avatar', `br-avatar--${size}`, className)}
      {...rest}
    >
      {src ? <img src={src} alt={alt} /> : initials}
    </span>
  );
}

Avatar.displayName = 'Avatar';
