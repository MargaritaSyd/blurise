import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../lib/cx';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be used within <Tabs>.');
  return ctx;
}

export type TabsProps = {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = value ?? uncontrolled;
  const baseId = useId();

  const setValue = useCallback(
    (next: string) => {
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  const ctx = useMemo(
    () => ({ value: current, setValue, baseId }),
    [current, setValue, baseId],
  );

  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

export type TabListProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function TabList({ children, className, label }: TabListProps) {
  const { setValue } = useTabsContext();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = [
      ...event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
    ];
    const index = tabs.findIndex((tab) => tab === document.activeElement);
    if (index < 0) return;

    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;

    event.preventDefault();
    const tab = tabs[next];
    const value = tab?.dataset.value;
    tab?.focus();
    if (value) setValue(value);
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx('br-tablist', className)}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}

export type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function Tab({ value, className, children, ...rest }: TabProps) {
  const { value: current, setValue, baseId } = useTabsContext();
  const selected = current === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      data-value={value}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      className={cx('br-tab', className)}
      onClick={() => setValue(value)}
      {...rest}
    >
      {children}
    </button>
  );
}

export type TabPanelProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { value: current, baseId } = useTabsContext();
  const selected = current === value;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!selected}
      className={cx('br-tab-panel', className)}
    >
      {selected ? children : null}
    </div>
  );
}

Tabs.displayName = 'Tabs';
TabList.displayName = 'TabList';
Tab.displayName = 'Tab';
TabPanel.displayName = 'TabPanel';
