export const BLOG_CATEGORIES = [
	"homelab",
	"cybersecurity",
	"productivity",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
