import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, type LabelProps } from './Label';
import { Stage } from '../stories/Stage';

type LabelStoryArgs = LabelProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form label styled with `.br-label`. Pair with a control via `htmlFor`.',
      },
    },
  },
  args: {
    children: 'Name',
    htmlFor: 'name',
    theme: 'dark',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text.',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a control `id`.',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Label prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <Story />
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Label {...args} />,
} satisfies Meta<LabelStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
