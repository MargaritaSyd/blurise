import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';
import { spaceVar, type CSSVars, type SpaceToken } from '../lib/types';

export type StackProps = ComponentPropsWithoutRef<'div'> & {
  direction?: 'row' | 'column';
  gap?: SpaceToken;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
};

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
} as const;

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
} as const;

export function Stack({
  direction = 'column',
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  style,
  ...rest
}: StackProps) {
  const vars: CSSVars = {
    ...style,
    '--br-stack-dir': direction,
    '--br-stack-gap': spaceVar(gap),
    ...(align ? { '--br-stack-align': alignMap[align] } : {}),
    ...(justify ? { '--br-stack-justify': justifyMap[justify] } : {}),
  };

  return (
    <div
      className={cx('br-stack', wrap && 'br-stack--wrap', className)}
      style={vars}
      {...rest}
    />
  );
}

Stack.displayName = 'Stack';
