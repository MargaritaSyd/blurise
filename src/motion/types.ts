import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react';

export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

export type BoxProps = {
  as?: ElementType;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'as'>;
