import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { Link } from './Link';
import { Stack } from './Stack';
import { Stage } from '../stories/Stage';

const meta = {
  title: 'Kit/Actions',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Buttons: Story = {
  render: () => (
    <Stage>
      <Stack gap={5}>
        <Stack direction="row" gap={3} wrap>
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
        </Stack>
        <Stack direction="row" gap={3} wrap>
          <Button disabled>Disabled</Button>
          <Button loading>Saving</Button>
          <IconButton aria-label="Continue">
            <ArrowIcon />
          </IconButton>
          <Link href="#kit">Open the kit</Link>
        </Stack>
      </Stack>
    </Stage>
  ),
};

export const Light: Story = {
  render: () => (
    <Stage theme="light">
      <Stack direction="row" gap={3} wrap>
        <Button>Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button loading>Saving</Button>
      </Stack>
    </Stage>
  ),
};
