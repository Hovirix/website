import { type CollectionEntry, getCollection } from "astro:content";

export async function getPublishedBlogPosts(): Promise<
	CollectionEntry<"blog">[]
> {
	return (await getCollection("blog"))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getVisibleProjects(): Promise<
	CollectionEntry<"projects">[]
> {
	return (await getCollection("projects"))
		.filter((project) => !project.data.draft)
		.sort((a, b) => {
			if (a.data.featured !== b.data.featured) {
				return a.data.featured ? -1 : 1;
			}
			return b.data.year - a.data.year;
		});
}
