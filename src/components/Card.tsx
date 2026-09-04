import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '../lib/cx';
import { BlurRise } from '../motion/BlurRise';
import { Float } from '../motion/Float';

export type CardProps = ComponentPropsWithoutRef<'article'> & {
  rise?: boolean;
  grain?: boolean;
  float?: boolean;
  inView?: boolean;
  children?: ReactNode;
};

export function Card({
  rise = false,
  grain = false,
  float = false,
  inView = false,
  className,
  children,
  ...rest
}: CardProps) {
  const surfaceClass = cx('br-card', grain && 'br-grain', className);

  const surface = rise ? (
    <BlurRise as="article" inView={inView} className={surfaceClass} {...rest}>
      {children}
    </BlurRise>
  ) : (
    <article className={surfaceClass} {...rest}>
      {children}
    </article>
  );

  return float ? <Float>{surface}</Float> : surface;
}

Card.displayName = 'Card';
