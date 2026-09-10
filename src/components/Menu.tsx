import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../lib/cx';
import { useEscape } from '../lib/overlay';

type MenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('Menu components must be used within <Menu>.');
  return ctx;
}

export type MenuProps = {
  children: ReactNode;
};

export function Menu({ children }: MenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEscape(open, () => setOpen(false), true);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open]);

  return (
    <MenuContext.Provider value={{ open, setOpen, menuId }}>
      <div ref={rootRef} className="br-menu">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export type MenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function MenuTrigger({
  className,
  type = 'button',
  children,
  onClick,
  ...rest
}: MenuTriggerProps) {
  const { open, setOpen, menuId } = useMenuContext();

  return (
    <button
      type={type}
      className={cx(
        'br-button',
        'br-button--ghost',
        'br-button--md',
        className,
      )}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
    >
      {children}
    </button>
  );
}

export type MenuContentProps = {
  children: ReactNode;
  className?: string;
};

export function MenuContent({ children, className }: MenuContentProps) {
  const { open, setOpen, menuId } = useMenuContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const first = ref.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      id={menuId}
      role="menu"
      className={cx('br-menu-content', 'br-rise', 'br-rise-active', className)}
      onKeyDown={(event) => {
        const items = ref.current
          ? [...ref.current.querySelectorAll<HTMLElement>('[role="menuitem"]')]
          : [];
        const index = items.findIndex(
          (item) => item === document.activeElement,
        );
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          items[(index + 1) % items.length]?.focus();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
        } else if (event.key === 'Home') {
          event.preventDefault();
          items[0]?.focus();
        } else if (event.key === 'End') {
          event.preventDefault();
          items[items.length - 1]?.focus();
        } else if (event.key === 'Tab') {
          setOpen(false);
        }
      }}
    >
      {children}
    </div>
  );
}

export type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onSelect?: () => void;
  tone?: 'default' | 'danger';
};

export function MenuItem({
  className,
  tone = 'default',
  onSelect,
  onClick,
  disabled,
  children,
  ...rest
}: MenuItemProps) {
  const { setOpen } = useMenuContext();

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cx(
        'br-menu-item',
        tone === 'danger' && 'br-menu-item--danger',
        className,
      )}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onSelect?.();
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

export function MenuSeparator() {
  return <hr className="br-menu-separator" />;
}

Menu.displayName = 'Menu';
MenuTrigger.displayName = 'MenuTrigger';
MenuContent.displayName = 'MenuContent';
MenuItem.displayName = 'MenuItem';
MenuSeparator.displayName = 'MenuSeparator';
