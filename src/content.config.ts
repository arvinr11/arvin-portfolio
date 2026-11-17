import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.string(),
      year: z.number().int(),
      summary: z.string(),
      myPart: z.string(),
      stack: z.array(z.string()).min(1),
      platform: z.enum(['android', 'ios', 'both', 'web']),
      screens: z.array(z.object({ src: image(), alt: z.string().min(1) })).min(1).max(2),
      color: z.enum(['sky', 'sun', 'mint', 'white']).default('sky'),
      github: z.url().optional(),
      status: z.literal('coming-soon').optional(),
      featured: z.boolean().default(false),
      order: z.number().int(),
    }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/certificates' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      issuer: z.string(),
      date: z.coerce.date(),
      verifyUrl: z.url(),
      image: image(),
    }),
});

export const collections = { projects, certificates };
