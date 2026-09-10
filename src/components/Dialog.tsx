import { useId, useRef, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import {
  CloseGlyph,
  Portal,
  useAmbientTheme,
  useEscape,
  useFocusTrap,
  useScrollLock,
} from '../lib/overlay';
import { Heading } from './Heading';
import { IconButton } from './IconButton';
import { Text } from './Text';

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const theme = useAmbientTheme();

  useScrollLock(open);
  useEscape(open, () => onOpenChange(false));
  useFocusTrap(panelRef, open);

  if (!open) return null;

  return (
    <Portal>
      <div className="br-dialog" data-br-theme={theme}>
        <div
          className="br-dialog-backdrop"
          onClick={() => onOpenChange(false)}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          className={cx(
            'br-dialog-panel',
            'br-rise',
            'br-rise-active',
            className,
          )}
        >
          <div className="br-dialog-header">
            <Heading as="h2" size="lg" id={titleId}>
              {title}
            </Heading>
            <IconButton
              size="sm"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
            >
              <CloseGlyph />
            </IconButton>
          </div>
          <div className="br-dialog-body">
            {description ? (
              <Text tone="muted" size="sm" id={descriptionId}>
                {description}
              </Text>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

Dialog.displayName = 'Dialog';
