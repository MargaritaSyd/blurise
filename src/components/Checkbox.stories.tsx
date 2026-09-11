import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, type CheckboxProps } from './Checkbox';
import { Label } from './Label';
import { Stack } from './Stack';
import { Stage } from '../stories/Stage';

type CheckboxStoryArgs = CheckboxProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native checkbox styled with `.br-checkbox`. Pair with `Label` via `id` / `htmlFor` for accessible forms.',
      },
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
    'aria-label': 'Accept terms',
    theme: 'dark',
  },
  argTypes: {
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state (uncontrolled).',
    },
    disabled: {
      control: 'boolean',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible name when no visible label is present.',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Checkbox prop.',
      table: { category: 'Preview' },
    },
    onChange: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <Story />
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Checkbox {...args} />,
} satisfies Meta<CheckboxStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  args: {
    id: 'updates',
    name: 'updates',
    'aria-label': undefined,
  },
  render: ({ theme: _theme, ...args }) => (
    <Stack direction="row" gap={2} align="center">
      <Checkbox {...args} />
      <Label
        htmlFor="updates"
        style={{ textTransform: 'none', letterSpacing: 0 }}
      >
        Send me product updates
      </Label>
    </Stack>
  ),
};
