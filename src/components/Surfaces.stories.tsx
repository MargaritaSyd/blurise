import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stagger } from '../motion/Stagger';
import { Stage } from '../stories/Stage';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Card } from './Card';
import { Heading } from './Heading';
import { Separator } from './Separator';
import { Stack } from './Stack';
import { Text } from './Text';

const meta = {
  title: 'Kit/Surfaces',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Cards: Story = {
  render: () => (
    <Stage>
      <Stagger
        gap={80}
        style={{ display: 'grid', gap: 'var(--br-space-4)', maxWidth: '22rem' }}
      >
        <Card rise grain>
          <Badge variant="accent">Rise</Badge>
          <Heading as="h3" size="lg" style={{ marginTop: 'var(--br-space-3)' }}>
            Quiet entry
          </Heading>
          <Text
            tone="muted"
            size="sm"
            style={{ marginTop: 'var(--br-space-2)' }}
          >
            Cards take rise and grain. Float stays on a wrapper so transforms do
            not collide.
          </Text>
        </Card>
        <Card rise grain>
          <Stack direction="row" gap={3} align="center">
            <Avatar initials="BR" />
            <Stack gap={1}>
              <Heading as="h3" size="md">
                blurise
              </Heading>
              <Text tone="muted" size="sm">
                Motion language
              </Text>
            </Stack>
          </Stack>
        </Card>
        <Card float grain>
          <Text size="sm">
            Idle float on a nested wrapper, grain on the card.
          </Text>
        </Card>
      </Stagger>
    </Stage>
  ),
};

export const Marks: Story = {
  render: () => (
    <Stage>
      <Stack direction="row" gap={3} align="center" wrap>
        <Badge>Muted</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="success">Success</Badge>
        <Separator orientation="vertical" />
        <Avatar size="sm" initials="SM" />
        <Avatar initials="MD" />
        <Avatar size="lg" initials="LG" />
      </Stack>
    </Stage>
  ),
};
