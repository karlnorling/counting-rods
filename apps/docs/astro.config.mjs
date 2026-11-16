// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://karlnorling.github.io',
  base: '/counting-rods',
  integrations: [
    starlight({
      title: 'Counting Rods',
      description:
        'Render any number as Counting rods: SVG, PNG, JPEG and WebP, from code or the command line.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/karlnorling/counting-rods',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/karlnorling/counting-rods/edit/main/apps/docs/',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: '' },
            { label: 'Getting started', slug: 'getting-started' },
          ],
        },
        {
          label: 'Try it',
          items: [
            { label: 'Playground', slug: 'playground' },
            { label: 'How numbers are drawn', slug: 'how-it-works' },
          ],
        },
        {
          label: 'Packages',
          items: [
            { label: 'Core (SVG)', slug: 'packages/core' },
            { label: 'Raster (PNG, JPEG, WebP)', slug: 'packages/raster' },
            { label: 'CLI', slug: 'packages/cli' },
          ],
        },
        {
          label: 'Reference',
          items: [{ label: 'Storybook', link: '/storybook/' }],
        },
      ],
    }),
  ],
});
