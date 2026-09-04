import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from '../lib/cx';

export type TextTone = 'default' | 'muted';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg';

export type TextProps = ComponentPropsWithoutRef<'p'> & {
  as?: 'p' | 'span' | 'div' | 'strong' | 'em';
  tone?: TextTone;
  size?: TextSize;
};

export function Text({
  as,
  tone = 'default',
  size = 'md',
  className,
  ...rest
}: TextProps) {
  const Tag = (as ?? 'p') as ElementType;

  return (
    <Tag
      className={cx(
        'br-text',
        `br-text--${size}`,
        tone === 'muted' && 'br-text--muted',
        className,
      )}
      {...rest}
    />
  );
}

Text.displayName = 'Text';
