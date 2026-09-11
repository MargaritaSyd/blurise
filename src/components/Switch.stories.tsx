import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, type SwitchProps } from './Switch';
import { Stack } from './Stack';
import { Text } from './Text';
import { Stage } from '../stories/Stage';

type SwitchStoryArgs = SwitchProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle control (`role="switch"`). Supports controlled (`checked` + `onCheckedChange`) and uncontrolled (`defaultChecked`) usage.',
      },
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
    'aria-label': 'Idle float',
    theme: 'dark',
  },
  argTypes: {
    defaultChecked: {
      control: 'boolean',
      description: 'Initial on state (uncontrolled).',
    },
    checked: {
      control: false,
      description: 'Controlled on state. Prefer with `onCheckedChange`.',
    },
    disabled: {
      control: 'boolean',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible name when no visible label is present.',
    },
    onCheckedChange: { control: false },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Switch prop.',
      table: { category: 'Preview' },
    },
    onClick: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <Story />
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Switch {...args} />,
} satisfies Meta<SwitchStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  args: {
    defaultChecked: true,
    'aria-label': undefined,
  },
  render: ({ theme: _theme, ...args }) => (
    <Stack direction="row" gap={2} align="center">
      <Switch {...args} aria-label="Idle float" />
      <Text as="span" size="sm">
        Enable idle float
      </Text>
    </Stack>
  ),
};
