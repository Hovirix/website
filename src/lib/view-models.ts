import type { CollectionEntry } from "astro:content";

export type BlogCardViewModel = {
	id: string;
	title: string;
	description: string;
	pubDate: string;
	category: CollectionEntry<"blog">["data"]["category"];
	image: CollectionEntry<"blog">["data"]["image"];
};

export function toBlogCardViewModel(
	post: CollectionEntry<"blog">,
): BlogCardViewModel {
	return {
		id: post.id,
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate.toISOString(),
		category: post.data.category,
		image: post.data.image,
	};
}
