import { useEffect, useRef, useState } from 'react';

/** Shared in-view / mount activation for enter motion primitives. */
export function useMotionActive(inView = false) {
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

  return { ref, active };
}
