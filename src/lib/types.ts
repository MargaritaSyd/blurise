import type { CSSProperties } from 'react';

export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

export type SpaceToken = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

export function spaceVar(space: SpaceToken): string {
  return `var(--br-space-${space})`;
}
