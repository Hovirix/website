"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "homelab" | "cybersecurity" | "productivity";

interface Post {
	id: string;
	title: string;
	description: string;
	pubDate: string;
	category: Category;
	image: { src: string; alt: string };
}

interface BlogGridProps {
	featured: Post;
	posts: Post[];
}

function PostCell({ post }: { post: Post }) {
	return (
		<a
			href={`/blog/${post.id}`}
			class="group flex flex-col gap-0 border-b border-r no-underline transition-colors hover:bg-muted/40 [&:nth-child(even)]:border-r-0"
		>
			<img
				src={post.image.src}
				alt={post.image.alt}
				class="aspect-video w-full object-cover"
			/>
			<div class="flex flex-col gap-2 p-6">
				<div class="flex items-center gap-2">
					<Badge variant="outline">{post.category}</Badge>
					<span class="text-xs text-muted-foreground">
						{new Date(post.pubDate).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</span>
				</div>
				<p class="text-base font-semibold leading-snug text-foreground">
					{post.title}
				</p>
				<p class="line-clamp-2 text-sm text-muted-foreground">
					{post.description}
				</p>
			</div>
		</a>
	);
}

const categories = ["all", "homelab", "cybersecurity", "productivity"] as const;

export default function BlogGrid({ featured, posts }: BlogGridProps) {
	const [active, setActive] = React.useState<string>("all");

	const filtered =
		active === "all" ? posts : posts.filter((p) => p.category === active);

	return (
		<div>
			{/* Featured post — spans full width */}
			<a
				href={`/blog/${featured.id}`}
				className="group relative flex flex-col border-b no-underline transition-colors hover:bg-muted/40 md:flex-row"
			>
				<img
					src={featured.image.src}
					alt={featured.image.alt}
					className="aspect-video w-full object-cover md:aspect-[16/7]"
				/>
				<div className="flex flex-col justify-end gap-3 p-8 md:absolute md:inset-0 md:bg-gradient-to-t md:from-background/90 md:via-background/40 md:to-transparent">
					<div className="flex items-center gap-2">
						<Badge variant="outline">{featured.category}</Badge>
						<span className="text-xs text-muted-foreground">
							{new Date(featured.pubDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</div>
					<p className="text-2xl font-bold leading-snug text-foreground md:text-3xl">
						{featured.title}
					</p>
					<p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">
						{featured.description}
					</p>
				</div>
			</a>

			{/* Category filter */}
			<div className="border-b">
				<Tabs value={active} onValueChange={setActive}>
					<TabsList className="h-12 w-full justify-start gap-0 rounded-none bg-transparent p-0">
						{categories.map((cat) => (
							<TabsTrigger
								key={cat}
								value={cat}
								className="h-full rounded-none border-r px-6 text-xs uppercase tracking-widest hover:bg-muted/60 data-[state=active]:bg-muted data-[state=active]:shadow-none data-[state=active]:after:opacity-0"
							>
								{cat}
							</TabsTrigger>
						))}
					</TabsList>

					{categories.map((cat) => (
						<TabsContent key={cat} value={cat} className="m-0">
							<div className="grid grid-cols-1 md:grid-cols-2">
								{filtered.map((post) => (
									<a
										key={post.id}
										href={`/blog/${post.id}`}
										className="group flex flex-col gap-0 border-b border-r no-underline transition-colors hover:bg-muted/40 [&:nth-child(even)]:border-r-0"
									>
										<img
											src={post.image.src}
											alt={post.image.alt}
											className="aspect-video w-full object-cover"
										/>
										<div className="flex flex-col gap-2 p-6">
											<div className="flex items-center gap-2">
												<Badge variant="outline">{post.category}</Badge>
												<span className="text-xs text-muted-foreground">
													{new Date(post.pubDate).toLocaleDateString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
													})}
												</span>
											</div>
											<p className="text-base font-semibold leading-snug text-foreground">
												{post.title}
											</p>
											<p className="line-clamp-2 text-sm text-muted-foreground">
												{post.description}
											</p>
										</div>
									</a>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
