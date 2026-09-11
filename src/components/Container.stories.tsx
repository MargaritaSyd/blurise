import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Container, type ContainerProps } from './Container';
import { Text } from './Text';

type ContainerStoryArgs = ContainerProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Centered content shell with a max width from `--br-container-sm|md|lg` (32rem / 48rem / 72rem).',
      },
    },
  },
  args: {
    size: 'md',
    theme: 'dark',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Max-width token (`--br-container-*`).',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Container prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
    style: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <Story />
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => (
    <Container {...args}>
      <div
        style={{
          padding: 'var(--br-space-5)',
          border: '1px dashed var(--br-color-border)',
          borderRadius: 'var(--br-radius-md)',
          background: 'var(--br-color-elevated)',
        }}
      >
        <Text size="sm">
          Container content stays within the chosen max width.
        </Text>
      </div>
    </Container>
  ),
} satisfies Meta<ContainerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};
