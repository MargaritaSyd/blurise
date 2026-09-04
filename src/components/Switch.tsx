import { useState, type ButtonHTMLAttributes } from 'react';
import { cx } from '../lib/cx';

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'role' | 'type' | 'aria-checked'
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  className,
  onClick,
  ...rest
}: SwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isOn = checked ?? uncontrolled;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      className={cx('br-switch', className)}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        const next = !isOn;
        if (checked === undefined) setUncontrolled(next);
        onCheckedChange?.(next);
      }}
    />
  );
}

Switch.displayName = 'Switch';
