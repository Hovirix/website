"use client";

import * as React from "react";

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

const categories = ["all", "homelab", "cybersecurity", "productivity"] as const;

const CATEGORY_LABELS: Record<string, string> = {
	all: "All",
	homelab: "Homelab",
	cybersecurity: "Security",
	productivity: "Productivity",
};

export default function BlogGrid({ featured, posts }: BlogGridProps) {
	const [active, setActive] = React.useState<string>("all");

	const filtered =
		active === "all" ? posts : posts.filter((p) => p.category === active);

	return (
		<div>
			{/* Featured post — full bleed with overlay text */}
			<a
				href={`/blog/${featured.id}`}
				className="group relative block border-b no-underline overflow-hidden"
			>
				<div className="relative aspect-[16/7] w-full overflow-hidden">
					<img
						src={featured.image.src}
						alt={featured.image.alt}
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
				</div>

				<div className="absolute inset-0 flex flex-col justify-end p-8">
					{/* Eyebrow */}
					<div className="mb-3 flex items-center gap-4">
						<span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
							{featured.category}
						</span>
						<span className="h-px w-4 bg-border" />
						<span className="font-mono text-[11px] text-muted-foreground">
							{new Date(featured.pubDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
						<span className="font-mono text-[11px] tracking-widest text-primary uppercase border border-primary/40 px-1.5 py-0.5">
							Featured
						</span>
					</div>

					<h2 className="mb-2 max-w-2xl text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl">
						{featured.title}
					</h2>
					<p className="max-w-xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
						{featured.description}
					</p>
				</div>
			</a>

			{/* Category filter — precision bar */}
			<div className="flex items-stretch border-b">
				<span className="hidden items-center px-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase sm:flex">
					Filter
				</span>
				<span className="hidden w-px bg-border sm:block" />
				{categories.map((cat) => (
					<button
						type="button"
						key={cat}
						onClick={() => setActive(cat)}
						className={[
							"flex-1 border-r py-4 font-mono text-[11px] tracking-widest uppercase transition-colors last:border-r-0",
							active === cat
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
						].join(" ")}
					>
						{CATEGORY_LABELS[cat]}
					</button>
				))}
			</div>

			{/* Post grid — numbered entries */}
			<div className="grid grid-cols-1 md:grid-cols-2">
				{filtered.map((post, i) => (
					<a
						key={post.id}
						href={`/blog/${post.id}`}
						className={[
							"group flex flex-col border-b no-underline transition-colors hover:bg-muted/30",
							i % 2 === 0 ? "md:border-r" : "",
						].join(" ")}
					>
						{/* Image */}
						<div className="overflow-hidden">
							<img
								src={post.image.src}
								alt={post.image.alt}
								className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
							/>
						</div>

						{/* Content */}
						<div className="flex flex-1 flex-col gap-2 p-6">
							<div className="flex items-center gap-3">
								<span className="font-mono text-[11px] text-muted-foreground">
									{String(i + 1).padStart(2, "0")}
								</span>
								<span className="h-px flex-1 bg-border" />
								<span className="font-mono text-[11px] tracking-wider text-primary uppercase">
									{post.category}
								</span>
							</div>
							<p className="text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
								{post.title}
							</p>
							<p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
								{post.description}
							</p>
							<div className="mt-auto pt-3 flex items-center justify-between">
								<span className="font-mono text-[11px] text-muted-foreground">
									{new Date(post.pubDate).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
								<span className="font-mono text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
									Read →
								</span>
							</div>
						</div>
					</a>
				))}

				{filtered.length === 0 && (
					<div className="col-span-2 flex flex-col items-center justify-center gap-3 py-20 text-center">
						<span className="font-mono text-xs text-muted-foreground">
							No posts in this category
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
