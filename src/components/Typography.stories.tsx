import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Heading } from './Heading';
import { Stack } from './Stack';
import { Text } from './Text';

const meta = {
  title: 'Kit/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <Stage>
      <Stack gap={4}>
        <Heading as="h1">Cinematic type</Heading>
        <Heading as="h2">Section title</Heading>
        <Heading as="h3">Card title</Heading>
        <Text>
          Body copy sits on the warm paper tone, with the same system font stack
          as the rest of the kit.
        </Text>
        <Text tone="muted" size="sm">
          Muted captions, hints, and supporting lines.
        </Text>
      </Stack>
    </Stage>
  ),
};
