import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import { Card } from './Card';
import { Checkbox } from './Checkbox';
import { Heading } from './Heading';
import { Input } from './Input';
import { Stack } from './Stack';
import { Switch } from './Switch';

describe('Button', () => {
  it('renders a primary button that can be disabled and busy', () => {
    const { rerender } = render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('br-button', 'br-button--primary');
    expect(button).toHaveAttribute('type', 'button');

    rerender(<Button disabled>Save</Button>);
    expect(button).toBeDisabled();

    rerender(<Button loading>Save</Button>);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});

describe('Card', () => {
  it('applies grain and rise classes', () => {
    render(
      <Card rise grain>
        Scene
      </Card>,
    );
    const card = screen.getByText('Scene');
    expect(card).toHaveClass(
      'br-card',
      'br-grain',
      'br-rise',
      'br-rise-active',
    );
  });
});

describe('Heading', () => {
  it('renders the requested heading level', () => {
    render(<Heading as="h1">Title</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
      'br-heading',
      'br-heading--3xl',
    );
  });
});

describe('Input', () => {
  it('marks invalid fields', () => {
    render(<Input aria-label="Email" invalid />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});

describe('Switch', () => {
  it('toggles aria-checked', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Float" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch', { name: 'Float' });
    expect(control).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox', () => {
  it('is a native checkbox', () => {
    render(<Checkbox aria-label="Updates" />);
    expect(screen.getByLabelText('Updates')).toHaveAttribute(
      'type',
      'checkbox',
    );
  });
});

describe('Stack', () => {
  it('sets direction and gap custom properties', () => {
    const { container } = render(
      <Stack direction="row" gap={3}>
        <span>A</span>
      </Stack>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('br-stack');
    expect(root.style.getPropertyValue('--br-stack-dir')).toBe('row');
    expect(root.style.getPropertyValue('--br-stack-gap')).toBe(
      'var(--br-space-3)',
    );
  });
});
