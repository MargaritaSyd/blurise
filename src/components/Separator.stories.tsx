import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Separator, type SeparatorProps } from './Separator';
import { Stack } from './Stack';
import { Text } from './Text';

type SeparatorStoryArgs = SeparatorProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Divider (`hr`) for horizontal or vertical separation. Sets `aria-orientation`.',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    theme: 'dark',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider axis.',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Separator prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <div style={{ width: '18rem' }}>
          <Story />
        </div>
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => {
    if (args.orientation === 'vertical') {
      return (
        <Stack direction="row" gap={4} align="stretch" style={{ height: '4rem' }}>
          <Text size="sm">Before</Text>
          <Separator {...args} />
          <Text size="sm">After</Text>
        </Stack>
      );
    }

    return (
      <Stack gap={3}>
        <Text size="sm">Above</Text>
        <Separator {...args} />
        <Text size="sm">Below</Text>
      </Stack>
    );
  },
} satisfies Meta<SeparatorStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};
