import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Text, type TextProps } from './Text';

type TextStoryArgs = TextProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Body copy. Choose `size`, `tone` (default or muted), and optional `as` for the rendered element.',
      },
    },
  },
  args: {
    children:
      'Body copy sits on the warm paper tone, with the same system font stack as the rest of the kit.',
    tone: 'default',
    size: 'md',
    as: 'p',
    theme: 'dark',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content.',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'strong', 'em'],
      description: 'Rendered HTML element (default `p`).',
    },
    tone: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'Color tone.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Type scale (`br-text--*`).',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Text prop.',
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
  render: ({ theme: _theme, ...args }) => <Text {...args} />,
} satisfies Meta<TextStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    tone: 'muted',
    size: 'sm',
    children: 'Muted captions, hints, and supporting lines.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Larger body for lead paragraphs.',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    tone: 'muted',
    children: 'Fine print and helper text.',
  },
};
