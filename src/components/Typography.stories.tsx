import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Heading } from './Heading';
import { Link } from './Link';
import { Stack } from './Stack';
import { Text } from './Text';

const meta = {
  title: 'Kit/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Type scale overview for the kit. `Heading` maps semantic levels (`h1`–`h6`) to visual sizes (`3xl`–`sm`); override with `size` when needed. `Text` covers body copy (`xs`–`lg`, default/muted). `Link` is the text link style. For interactive Controls and prop tables, open **Kit/Heading**, **Kit/Text**, and **Kit/Link**.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Full type ladder: headings by level, body sizes, muted tone, and a link.',
      },
    },
  },
  render: () => (
    <Stage>
      <Stack gap={5} style={{ maxWidth: '36rem' }}>
        <Stack gap={3}>
          <Heading as="h1">Heading h1 · 3xl</Heading>
          <Heading as="h2">Heading h2 · 2xl</Heading>
          <Heading as="h3">Heading h3 · xl</Heading>
          <Heading as="h4">Heading h4 · lg</Heading>
          <Heading as="h5">Heading h5 · md</Heading>
          <Heading as="h6">Heading h6 · sm</Heading>
        </Stack>
        <Stack gap={2}>
          <Text size="lg">
            Text lg — lead paragraphs and short introductions.
          </Text>
          <Text size="md">
            Text md — default body copy for the kit.
          </Text>
          <Text size="sm">Text sm — denser UI copy and secondary lines.</Text>
          <Text size="xs" tone="muted">
            Text xs muted — captions, hints, and helper text.
          </Text>
          <Text tone="muted" size="sm">
            Text sm muted — supporting lines under fields and cards.
          </Text>
        </Stack>
        <Text size="sm">
          Inline reference: <Link href="#kit">Open the kit</Link>
        </Text>
      </Stack>
    </Stage>
  ),
};

export const Light: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Same type scale on the light theme (`data-br-theme="light"`).',
      },
    },
  },
  render: () => (
    <Stage theme="light">
      <Stack gap={4} style={{ maxWidth: '36rem' }}>
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
        <Text size="sm">
          Continue in <Link href="#kit">Kit / Link</Link> for Controls.
        </Text>
      </Stack>
    </Stage>
  ),
};
