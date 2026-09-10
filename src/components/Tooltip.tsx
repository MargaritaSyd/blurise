import {
  cloneElement,
  isValidElement,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../lib/cx';

type TriggerProps = {
  'aria-describedby'?: string;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

export type TooltipProps = {
  content: ReactNode;
  children: ReactElement<TriggerProps>;
  delay?: number;
  className?: string;
};

export function Tooltip({
  content,
  children,
  delay = 120,
  className,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<number>(0);

  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  if (!isValidElement(children)) return children;

  return (
    <span className={cx('br-tooltip', className)}>
      {cloneElement(children, {
        'aria-describedby': open ? id : children.props['aria-describedby'],
        onMouseEnter: (event) => {
          children.props.onMouseEnter?.(event);
          show();
        },
        onMouseLeave: (event) => {
          children.props.onMouseLeave?.(event);
          hide();
        },
        onFocus: (event) => {
          children.props.onFocus?.(event);
          show();
        },
        onBlur: (event) => {
          children.props.onBlur?.(event);
          hide();
        },
      })}
      {open ? (
        <span role="tooltip" id={id} className="br-tooltip-content">
          {content}
        </span>
      ) : null}
    </span>
  );
}

Tooltip.displayName = 'Tooltip';
