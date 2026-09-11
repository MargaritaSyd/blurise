import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Stage } from '../stories/Stage';
import { Stack, type StackProps } from './Stack';

type StackStoryArgs = StackProps & {
  theme?: 'dark' | 'light';
};

const spaceOptions = [1, 2, 3, 4, 5, 6, 8, 10] as const;

function DemoItem({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: '0.75rem 1rem',
        border: '1px solid var(--br-color-border)',
        borderRadius: 'var(--br-radius-md)',
        background: 'var(--br-color-elevated)',
        fontSize: 'var(--br-font-size-sm)',
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Kit/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Flex layout primitive. Controls direction, gap (space tokens), alignment, justification, and wrap.',
      },
    },
  },
  args: {
    direction: 'column',
    gap: 4,
    wrap: false,
    theme: 'dark',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Flex direction.',
    },
    gap: {
      control: 'select',
      options: [...spaceOptions],
      description: 'Gap between children (`--br-space-*`).',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment (`align-items`).',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
      description: 'Main-axis distribution (`justify-content`).',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow flex wrap.',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Stack prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
    style: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <div style={{ width: '22rem' }}>
          <Story />
        </div>
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => (
    <Stack {...args}>
      <DemoItem>One</DemoItem>
      <DemoItem>Two</DemoItem>
      <DemoItem>Three</DemoItem>
    </Stack>
  ),
} satisfies Meta<StackStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Row: Story = {
  args: { direction: 'row', gap: 3 },
};

export const Between: Story = {
  args: {
    direction: 'row',
    justify: 'between',
    align: 'center',
  },
};

export const Wrap: Story = {
  args: {
    direction: 'row',
    gap: 3,
    wrap: true,
  },
  render: ({ theme: _theme, ...args }) => (
    <Stack {...args}>
      <DemoItem>One</DemoItem>
      <DemoItem>Two</DemoItem>
      <DemoItem>Three</DemoItem>
      <DemoItem>Four</DemoItem>
      <DemoItem>Five</DemoItem>
    </Stack>
  ),
};
