import { useEffect, useRef, useState } from 'react';
import { cx } from '../lib/cx';
import type { BoxProps } from './types';

export type BlurRiseProps = BoxProps & {
  /** Wait until the element is on screen before playing the rise. */
  inView?: boolean;
};

export function BlurRise({
  as: Tag = 'div',
  inView = false,
  className,
  children,
  ...rest
}: BlurRiseProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setActive(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <Tag
      className={cx('br-rise', active && 'br-rise-active', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Tag>
  );
}

BlurRise.displayName = 'BlurRise';
