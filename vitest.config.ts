import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const source = (pkg: string) =>
  fileURLToPath(new URL(`./packages/@counting-rods/${pkg}/src/index.ts`, import.meta.url));

export default defineConfig({
  resolve: {
    // Test against source, matching the paths in tsconfig.json.
    alias: {
      '@counting-rods/core': source('core'),
      '@counting-rods/raster': source('raster'),
    },
  },
  test: {
    include: ['packages/*/*/test/**/*.test.ts'],
  },
});
