import type { Preview } from '@storybook/html-vite';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        order: ['Introduction', 'Counting Rods', ['Number Builder', 'Digits']],
      },
    },
  },
};

export default preview;
