import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Stage } from '../stories/Stage';
import { Grid, type GridProps } from './Grid';

type GridStoryArgs = GridProps & {
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
  title: 'Kit/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CSS grid with equal columns. Set `columns` and `gap` (space tokens).',
      },
    },
  },
  args: {
    columns: 3,
    gap: 4,
    theme: 'dark',
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of equal-width columns.',
    },
    gap: {
      control: 'select',
      options: [...spaceOptions],
      description: 'Gap between cells (`--br-space-*`).',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Grid prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
    style: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <div style={{ width: '28rem' }}>
          <Story />
        </div>
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => (
    <Grid {...args}>
      <DemoItem>One</DemoItem>
      <DemoItem>Two</DemoItem>
      <DemoItem>Three</DemoItem>
      <DemoItem>Four</DemoItem>
      <DemoItem>Five</DemoItem>
      <DemoItem>Six</DemoItem>
    </Grid>
  ),
} satisfies Meta<GridStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoColumns: Story = {
  args: { columns: 2 },
};

export const FourColumns: Story = {
  args: { columns: 4, gap: 3 },
};
