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
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Fields: Story = {
  render: () => (
    <Stage>
      <form
        onSubmit={(event) => event.preventDefault()}
        style={{ maxWidth: '24rem' }}
      >
        <Stack gap={4}>
          <Stack gap={2}>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Ana Margarita" />
          </Stack>
          <Stack gap={2}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              invalid
              defaultValue="not-an-email"
              aria-describedby="email-hint"
            />
            <Text id="email-hint" tone="muted" size="xs">
              Enter a valid email.
            </Text>
          </Stack>
          <Stack gap={2}>
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" name="note" placeholder="A short message" />
          </Stack>
          <Stack direction="row" gap={2} align="center">
            <Checkbox id="updates" name="updates" />
            <Label
              htmlFor="updates"
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
    </Stage>
  ),
};
