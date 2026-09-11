import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Label } from './Label';
import { Stack } from './Stack';
import { Switch } from './Switch';
import { Text } from './Text';
import { Textarea } from './Textarea';

const meta = {
  title: 'Kit/Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Form composition overview. Pair `Label` with `Input` / `Textarea` via `htmlFor` + `id`. Use `Input`/`Textarea` `invalid` with `aria-describedby` for errors. `Checkbox` and `Switch` sit beside labels or supporting text. Actions use `Button`. For interactive Controls and prop tables, open **Kit/Label**, **Kit/Input**, **Kit/Textarea**, **Kit/Checkbox**, **Kit/Switch**, and **Kit/Button**.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function FormFields({ idPrefix = '' }: { idPrefix?: string }) {
  const id = (name: string) => `${idPrefix}${name}`;

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ maxWidth: '24rem' }}
    >
      <Stack gap={4}>
        <Stack gap={2}>
          <Label htmlFor={id('name')}>Name</Label>
          <Input id={id('name')} name="name" placeholder="Your name" />
        </Stack>
        <Stack gap={2}>
          <Label htmlFor={id('email')}>Email</Label>
          <Input
            id={id('email')}
            name="email"
            type="email"
            invalid
            defaultValue="not-an-email"
            aria-describedby={id('email-hint')}
          />
          <Text id={id('email-hint')} tone="muted" size="xs">
            Enter a valid email.
          </Text>
        </Stack>
        <Stack gap={2}>
          <Label htmlFor={id('note')}>Note</Label>
          <Textarea
            id={id('note')}
            name="note"
            placeholder="A short message"
          />
        </Stack>
        <Stack direction="row" gap={2} align="center">
          <Checkbox id={id('updates')} name="updates" />
          <Label
            htmlFor={id('updates')}
            style={{ textTransform: 'none', letterSpacing: 0 }}
          >
            Send me product updates
          </Label>
        </Stack>
        <Stack direction="row" gap={2} align="center">
          <Switch defaultChecked aria-label="Idle float" />
          <Text as="span" size="sm">
            Enable idle float
          </Text>
        </Stack>
        <Stack direction="row" gap={3}>
          <Button type="submit">Send</Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export const Fields: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Typical field stack: labeled inputs, invalid email with hint, textarea, checkbox + label, switch + text, and submit actions.',
      },
    },
  },
  render: () => (
    <Stage>
      <FormFields />
    </Stage>
  ),
};

export const Light: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Same form composition on the light theme (`data-br-theme="light"`).',
      },
    },
  },
  render: () => (
    <Stage theme="light">
      <FormFields idPrefix="light-" />
    </Stage>
  ),
};
