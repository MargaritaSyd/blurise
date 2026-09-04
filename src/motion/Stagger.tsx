import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import type { BoxProps, CSSVars } from './types';

export type StaggerProps = BoxProps & {
  /** Delay between children, in milliseconds. */
  gap?: number;
  /** Index assigned to the first child. */
  from?: number;
};

export function Stagger({
  as: Tag = 'div',
  gap,
  from = 0,
  className,
  style,
  children,
  ...rest
}: StaggerProps) {
  const vars: CSSVars = {
    ...style,
    ...(gap != null ? { '--br-stagger-gap': `${gap}ms` } : {}),
  };

  return (
    <Tag className={cx('br-stagger', className)} style={vars} {...rest}>
      {Children.map(children, (child, index) => withIndex(child, from + index))}
    </Tag>
  );
}

Stagger.displayName = 'Stagger';

function withIndex(child: ReactNode, index: number): ReactNode {
  if (!isValidElement<{ style?: CSSVars }>(child)) return child;

  return cloneElement(child, {
    style: {
      ...child.props.style,
      '--br-i': index,
    },
  });
}
