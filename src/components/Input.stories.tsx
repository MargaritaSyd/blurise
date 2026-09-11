import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, type InputProps } from './Input';
import { Stage } from '../stories/Stage';

type InputStoryArgs = InputProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text field styled with `.br-field`. Use `invalid` to set `aria-invalid` for error states.',
      },
    },
  },
  args: {
    placeholder: 'Your name',
    invalid: false,
    disabled: false,
    theme: 'dark',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'],
      description: 'Native input type.',
    },
    invalid: {
      control: 'boolean',
      description: 'Marks the field invalid via `aria-invalid`.',
    },
    disabled: {
      control: 'boolean',
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value (uncontrolled).',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not an Input prop.',
      table: { category: 'Preview' },
    },
    onChange: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <div style={{ width: '16rem' }}>
          <Story />
        </div>
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Input {...args} />,
} satisfies Meta<InputStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const Invalid: Story = {
  args: {
    type: 'email',
    invalid: true,
    defaultValue: 'not-an-email',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Read only value',
  },
};
