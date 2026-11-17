// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arvinroeslim.my.id',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
});
