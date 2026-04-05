import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["INFRASTRUCTURE", "NETWORKING", "TOOLS"]),
    pubdate: z.string(),
    url: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    image: z.url(),
    imageAlt: z.string(),
    icon: z.string()
  })
});

const research = defineCollection({
  loader: glob({ base: "./src/content/research", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["VULNERABILITY RESEARCH", "SYSTEMS", "CRYPTOGRAPHY", "NETWORK"]),
    pubdate: z.string()
  })
});

export const collections = {
  projects,
  research
};
