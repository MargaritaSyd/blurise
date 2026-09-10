import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cx } from '../lib/cx';

type AccordionContextValue = {
  type: 'single' | 'multiple';
  isOpen: (item: string) => boolean;
  toggle: (item: string) => void;
  baseId: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion components must be used within <Accordion>.');
  }
  return ctx;
}

type ItemContextValue = { value: string };
const ItemContext = createContext<ItemContextValue | null>(null);

function useItem() {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error('AccordionTrigger must be used within <AccordionItem>.');
  }
  return ctx;
}

export type AccordionProps = {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  children: ReactNode;
  className?: string;
};

export function Accordion({
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  children,
  className,
}: AccordionProps) {
  const [uncontrolled, setUncontrolled] = useState<string | string[]>(
    defaultValue ?? (type === 'multiple' ? [] : ''),
  );
  const current = value ?? uncontrolled;
  const baseId = useId();

  const isOpen = useCallback(
    (item: string) =>
      Array.isArray(current) ? current.includes(item) : current === item,
    [current],
  );

  const toggle = useCallback(
    (item: string) => {
      let next: string | string[];
      if (type === 'multiple') {
        const list = Array.isArray(current) ? current : [];
        next = list.includes(item)
          ? list.filter((entry) => entry !== item)
          : [...list, item];
      } else {
        next = current === item && collapsible ? '' : item;
      }
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [collapsible, current, onValueChange, type, value],
  );

  const ctx = useMemo(
    () => ({ type, isOpen, toggle, baseId }),
    [type, isOpen, toggle, baseId],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cx('br-accordion', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps) {
  return (
    <ItemContext.Provider value={{ value }}>
      <div className={cx('br-accordion-item', className)}>{children}</div>
    </ItemContext.Provider>
  );
}

export type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
};

export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  const { isOpen, toggle, baseId } = useAccordion();
  const { value } = useItem();
  const open = isOpen(value);

  return (
    <button
      type="button"
      className={cx('br-accordion-trigger', className)}
      aria-expanded={open}
      aria-controls={`${baseId}-panel-${value}`}
      id={`${baseId}-trigger-${value}`}
      onClick={() => toggle(value)}
    >
      {children}
    </button>
  );
}

export type AccordionContentProps = {
  children: ReactNode;
  className?: string;
};

export function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  const { isOpen, baseId } = useAccordion();
  const { value } = useItem();
  const open = isOpen(value);

  return (
    <div
      id={`${baseId}-panel-${value}`}
      role="region"
      aria-labelledby={`${baseId}-trigger-${value}`}
      data-open={open}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      className={cx('br-accordion-content', className)}
    >
      <div className="br-accordion-content-inner">{children}</div>
    </div>
  );
}

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';
