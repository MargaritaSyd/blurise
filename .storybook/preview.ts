import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
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
