import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const tutorials = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/features/tutorials/content",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(999),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tutorials };
