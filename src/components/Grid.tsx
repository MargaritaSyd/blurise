import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';
import { spaceVar, type CSSVars, type SpaceToken } from '../lib/types';

export type GridProps = ComponentPropsWithoutRef<'div'> & {
  columns?: number;
  gap?: SpaceToken;
};

export function Grid({
  columns = 1,
  gap = 4,
  className,
  style,
  ...rest
}: GridProps) {
  const vars: CSSVars = {
    ...style,
    '--br-grid-cols': columns,
    '--br-grid-gap': spaceVar(gap),
  };

  return <div className={cx('br-grid', className)} style={vars} {...rest} />;
}

Grid.displayName = 'Grid';
