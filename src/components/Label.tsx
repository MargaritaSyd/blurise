import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';

export type LabelProps = ComponentPropsWithoutRef<'label'>;

export function Label({ className, ...rest }: LabelProps) {
  return <label className={cx('br-label', className)} {...rest} />;
}

Label.displayName = 'Label';
