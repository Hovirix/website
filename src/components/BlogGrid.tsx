import * as React from "react";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/content";

type ActiveCategory = "all" | BlogCategory;

interface Post {
	id: string;
	title: string;
	description: string;
	pubDate: string;
	category: BlogCategory;
	image: { src: string; alt: string };
}

interface BlogGridProps {
	featured: Post;
	posts: Post[];
}

const categories: readonly ActiveCategory[] = ["all", ...BLOG_CATEGORIES];

const CATEGORY_LABELS: Record<ActiveCategory, string> = {
	all: "All",
	homelab: "Homelab",
	cybersecurity: "Security",
	productivity: "Productivity",
};

function fmt(iso: string) {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default function BlogGrid({ featured, posts }: BlogGridProps) {
	const [active, setActive] = React.useState<ActiveCategory>("all");

	const filtered =
		active === "all" ? posts : posts.filter((p) => p.category === active);

	return (
		<div>
			{/* ── Featured post ──────────────────────────────── */}
			<a
				href={`/blog/${featured.id}`}
				className="group relative flex flex-col border-b no-underline transition-colors hover:bg-muted/20 md:flex-row md:items-stretch"
			>
				{/* Primary accent bar */}
				<span className="absolute left-0 top-0 h-full w-[3px] bg-primary" />

				{/* Image — right side on desktop, top on mobile */}
				<div className="order-first shrink-0 overflow-hidden md:order-last md:w-80 lg:w-96">
					<img
						src={featured.image.src}
						alt={featured.image.alt}
						className="h-48 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03] md:h-full"
					/>
				</div>

				{/* Text content */}
				<div className="flex flex-1 flex-col justify-between gap-6 px-10 py-10 md:py-12">
					{/* Eyebrow */}
					<div className="flex items-center gap-4">
						<span className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
							{featured.category}
						</span>
						<span className="h-px w-6 bg-border" />
						<span className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase border border-primary/40 px-1.5 py-0.5">
							Featured
						</span>
					</div>

					<div>
						<h2 className="mb-3 text-2xl font-extrabold leading-tight tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
							{featured.title}
						</h2>
						<p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
							{featured.description}
						</p>
					</div>

					<div className="flex items-center justify-between">
						<span className="font-mono text-[11px] text-muted-foreground">
							{fmt(featured.pubDate)}
						</span>
						<span className="translate-x-0 font-mono text-sm text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
							Read →
						</span>
					</div>
				</div>
			</a>

			{/* ── Category filter ────────────────────────────── */}
			<div className="flex items-stretch border-b">
				<span className="hidden items-center border-r px-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase sm:flex">
					Filter
				</span>
				{categories.map((cat) => (
					<button
						type="button"
						key={cat}
						onClick={() => setActive(cat)}
						className={[
							"relative flex-1 border-r py-4 font-mono text-[10px] tracking-widest uppercase transition-colors last:border-r-0",
							active === cat
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
						].join(" ")}
					>
						{active === cat && (
							<span className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
						)}
						{CATEGORY_LABELS[cat]}
					</button>
				))}
			</div>

			{/* ── Post grid ─────────────────────────────────── */}
			<div className="grid grid-cols-1 md:grid-cols-2">
				{filtered.map((post, i) => (
					<a
						key={post.id}
						href={`/blog/${post.id}`}
						className={[
							"group relative flex flex-col border-b no-underline transition-colors hover:bg-muted/20",
							i % 2 === 0 ? "md:border-r" : "",
						].join(" ")}
					>
						{/* Hover accent bar */}
						<span className="absolute left-0 top-0 h-full w-[3px] bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

						<div className="flex flex-1 flex-col gap-4 px-8 py-8">
							{/* Index + meta row */}
							<div className="flex items-center gap-3">
								<span className="font-mono text-[10px] text-muted-foreground tabular-nums">
									{String(i + 1).padStart(2, "0")}
								</span>
								<span className="h-px flex-1 bg-border" />
								<span className="font-mono text-[10px] tracking-wider text-primary uppercase">
									{post.category}
								</span>
							</div>

							{/* Title */}
							<h3 className="text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
								{post.title}
							</h3>

							{/* Description */}
							<p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
								{post.description}
							</p>

							{/* Footer row */}
							<div className="mt-auto flex items-center justify-between pt-2">
								<span className="font-mono text-[11px] text-muted-foreground">
									{fmt(post.pubDate)}
								</span>
								<span className="translate-x-0 font-mono text-[11px] text-primary opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
									Read →
								</span>
							</div>
						</div>
					</a>
				))}

				{filtered.length === 0 && (
					<div className="col-span-2 flex flex-col items-center justify-center gap-3 py-20 text-center">
						<span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
							No posts in this category
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
