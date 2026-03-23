import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "zod";
import { BLOG_CATEGORIES } from "./lib/content";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		title: z.string(),
		description: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		pubDate: z.coerce.date(),
		category: z.enum(BLOG_CATEGORIES),
		tags: z.array(z.string()),
	}),
});

const projects = defineCollection({
	loader: file("./src/content/projects.json"),
	schema: z.object({
		id: z.string(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		category: z.string(),
		image: z.url(),
		href: z.string(),
		year: z.coerce.number().int(),
	}),
});

export const collections = { blog, projects };
