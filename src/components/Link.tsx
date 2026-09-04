import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type LinkProps = ComponentPropsWithoutRef<'a'>;

export function Link({ className, ...rest }: LinkProps) {
  return <a className={cx('br-link', className)} {...rest} />;
}

Link.displayName = 'Link';
