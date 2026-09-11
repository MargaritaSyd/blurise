import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Link, type LinkProps } from './Link';

type LinkStoryArgs = LinkProps & {
  theme?: 'dark' | 'light';
};

const meta = {
  title: 'Kit/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text link styled with `.br-link`. Accepts native anchor props (`href`, `target`, `rel`, …).',
      },
    },
  },
  args: {
    children: 'Open the kit',
    href: '#kit',
    theme: 'dark',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Link label.',
    },
    href: {
      control: 'text',
      description: 'Destination URL.',
    },
    target: {
      control: 'select',
      options: [undefined, '_blank', '_self'],
      description: 'Browsing context.',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description:
        'Storybook preview theme (`data-br-theme`). Not a Link prop.',
      table: { category: 'Preview' },
    },
    className: { control: false },
    onClick: { control: false },
  },
  decorators: [
    (Story, context) => (
      <Stage theme={context.args.theme ?? 'dark'}>
        <Story />
      </Stage>
    ),
  ],
  render: ({ theme: _theme, ...args }) => <Link {...args} />,
} satisfies Meta<LinkStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const External: Story = {
  args: {
    children: 'blurise on npm',
    href: 'https://www.npmjs.com/package/blurise',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};
