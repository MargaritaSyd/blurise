import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from '../lib/cx';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const sizeFromLevel: Record<HeadingLevel, HeadingSize> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
};

export type HeadingProps = ComponentPropsWithoutRef<'h2'> & {
  as?: HeadingLevel;
  size?: HeadingSize;
};

export function Heading({ as, size, className, ...rest }: HeadingProps) {
  const Tag = (as ?? 'h2') as ElementType;
  const visual = size ?? sizeFromLevel[as ?? 'h2'];

  return (
    <Tag
      className={cx('br-heading', `br-heading--${visual}`, className)}
      {...rest}
    />
  );
}

Heading.displayName = 'Heading';
