import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cx } from '../lib/cx';
import { CloseGlyph, Portal, useAmbientTheme } from '../lib/overlay';
import { IconButton } from './IconButton';
import { Text } from './Text';

export type ToastRecord = {
  id: string;
  title: string;
  description?: string;
};

export type ToastInput = string | { title: string; description?: string };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>.');
  return ctx;
}

export type ToastProviderProps = {
  children: ReactNode;
  duration?: number;
};

export function ToastProvider({
  children,
  duration = 4000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);
  const theme = useAmbientTheme();

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = String(nextId.current++);
      const record: ToastRecord =
        typeof input === 'string'
          ? { id, title: input }
          : { id, title: input.title, description: input.description };
      setToasts((current) => [...current, record]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss, duration],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal>
        <div
          className="br-toast-viewport"
          data-br-theme={theme}
          aria-live="polite"
          aria-relevant="additions"
        >
          {toasts.map((item) => (
            <Toast
              key={item.id}
              title={item.title}
              description={item.description}
              onDismiss={() => dismiss(item.id)}
            />
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

export type ToastProps = {
  title: string;
  description?: string;
  onDismiss?: () => void;
  className?: string;
};

export function Toast({
  title,
  description,
  onDismiss,
  className,
}: ToastProps) {
  return (
    <div
      role="status"
      className={cx('br-toast', 'br-rise', 'br-rise-active', className)}
    >
      <div>
        <Text as="strong" size="sm">
          {title}
        </Text>
        {description ? (
          <Text tone="muted" size="xs" style={{ marginTop: '0.2rem' }}>
            {description}
          </Text>
        ) : null}
      </div>
      {onDismiss ? (
        <IconButton size="sm" aria-label="Dismiss" onClick={onDismiss}>
          <CloseGlyph />
        </IconButton>
      ) : null}
    </div>
  );
}

Toast.displayName = 'Toast';
ToastProvider.displayName = 'ToastProvider';
