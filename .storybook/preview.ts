import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        // Compose-first: type → structure → surfaces → inputs → actions → overlays → page
        order: [
          'Docs',
          ['Introduction', 'Motion language'],
          'Foundations',
          'Motion',
          ['Primitives', 'Enter exit', 'Idle'],
          'Kit',
          [
            'Typography',
            'Heading',
            'Text',
            'Link',
            'Layout',
            'Stack',
            'Grid',
            'Container',
            'Separator',
            'Surfaces',
            'Form',
            'Label',
            'Input',
            'Textarea',
            'Checkbox',
            'Switch',
            'Actions',
            'Button',
            'Overlays',
            'Page',
          ],
        ],
      },
    },
    backgrounds: {
      default: 'cinematic',
      values: [
        { name: 'cinematic', value: '#0a0b0e' },
        { name: 'paper', value: '#f3efe6' },
      ],
    },
  },
};

export default preview;
