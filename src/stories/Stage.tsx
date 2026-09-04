import type { CSSProperties, ReactNode } from 'react';

const stageStyle: CSSProperties = {
  fontFamily: 'var(--br-font-sans)',
  color: 'var(--br-color-text)',
  background: 'var(--br-color-bg)',
  minHeight: '100%',
  padding: 'var(--br-space-8)',
  boxSizing: 'border-box',
};

export function Stage({
  children,
  theme = 'dark',
}: {
  children: ReactNode;
  theme?: 'dark' | 'light';
}) {
  return (
    <div data-br-theme={theme} style={stageStyle}>
      {children}
    </div>
  );
}
