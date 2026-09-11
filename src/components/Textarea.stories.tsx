import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea, type TextareaProps } from './Textarea';
import { Stage } from '../stories/Stage';

type TextareaStoryArgs = TextareaProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Multiline field styled with `.br-field` and `.br-textarea`. Defaults to 4 rows. Use `invalid` for error states.',
      },
    },
  },
  args: {
    placeholder: 'A short message',
    rows: 4,
    invalid: false,
    disabled: false,
    theme: 'dark',
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Visible row count (default 4).',
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
        'Storybook preview theme (`data-br-theme`). Not a Textarea prop.',
      table: { category: 'Preview' },
    },
    onChange: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <div style={{ width: '20rem' }}>
          <Story />
        </div>
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Textarea {...args} />,
} satisfies Meta<TextareaStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: 'Too short',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Cannot edit this note',
  },
};

export const Tall: Story = {
  args: {
    rows: 8,
    placeholder: 'Longer notes…',
  },
};
