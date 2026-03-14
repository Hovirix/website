import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		draft: z.boolean().default(false),
		title: z.string(),
		description: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		pubDate: z.coerce.date(),
		category: z.enum(["homelab", "cybersecurity", "productivity"]),
		tags: z.array(z.string()),
	}),
});

export const collections = { blog };
