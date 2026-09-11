import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonProps } from './Button';
import { Stage } from '../stories/Stage';

type ButtonStoryArgs = ButtonProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary action button. Supports primary, ghost, and danger variants; sm/md sizes; and a loading state that disables the control and sets `aria-busy`.',
      },
    },
  },
  args: {
    children: 'Continue',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    theme: 'dark',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'danger'],
      description: 'Visual style of the button.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Control size.',
    },
    loading: {
      control: 'boolean',
      description:
        'Shows a spinner, sets `aria-busy`, and disables the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction. Also forced when `loading` is true.',
    },
    children: {
      control: 'text',
      description: 'Button label.',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Button prop.',
      table: { category: 'Preview' },
    },
    onClick: { control: false },
    type: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <Story />
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Button {...args} />,
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};
