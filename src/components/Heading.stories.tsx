import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Heading, type HeadingProps } from './Heading';

type HeadingStoryArgs = HeadingProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Title element. `as` sets the semantic level (default `h2`); `size` overrides the visual scale mapped from that level.',
      },
    },
  },
  args: {
    children: 'Cinematic type',
    as: 'h2',
    theme: 'dark',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Heading text.',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Semantic heading level (and default size).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Visual size override (`br-heading--*`).',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Heading prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <div style={{ maxWidth: '28rem' }}>
          <Story />
        </div>
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Heading {...args} />,
} satisfies Meta<HeadingStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Display: Story = {
  args: { as: 'h1', children: 'Blurise' },
};

export const Section: Story = {
  args: { as: 'h2', children: 'Section title' },
};

export const CardTitle: Story = {
  args: { as: 'h3', children: 'Card title' },
};

export const SizeOverride: Story = {
  args: {
    as: 'h3',
    size: '3xl',
    children: 'Large visual, h3 semantics',
  },
};
