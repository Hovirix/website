import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
	currentPath: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
	const [open, setOpen] = React.useState(false);
	const [dark, setDark] = React.useState(
		typeof document === "undefined"
			? true
			: document.documentElement.classList.contains("dark"),
	);

	const toggleDark = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch (_) {}
	};

	const isActive = (href: string) =>
		href === "/" ? currentPath === "/" : currentPath.startsWith(href);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
			<div className="mx-auto flex h-12 max-w-6xl items-center px-8">
				{/* Logo */}
				<a
					href="/"
					className="flex items-center font-mono text-sm font-medium tracking-tight text-foreground no-underline transition-opacity hover:opacity-70"
					aria-label="Hovirix home"
				>
					<span className="text-primary font-bold">[</span>
					<span className="mx-0.5">hovirix</span>
					<span className="text-primary font-bold">]</span>
				</a>

				{/* Desktop nav — center */}
				<nav className="hidden md:flex items-center gap-0 ml-10 flex-1">
					{NAV_LINKS.map(({ label, href }) => (
						<a
							key={href}
							href={href}
							className={cn(
								"relative px-4 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
								isActive(href)
									? "text-primary"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{isActive(href) && (
								<span className="absolute inset-x-4 bottom-0 h-px bg-primary" />
							)}
							{label}
						</a>
					))}
				</nav>

				{/* Right: status + theme toggle */}
				<div className="ml-auto flex items-center gap-4">
					<div className="hidden md:flex items-center gap-2">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
						</span>
						<span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
							Open to work
						</span>
					</div>

					<span className="hidden md:block h-3 w-px bg-border" />

					<button
						type="button"
						aria-label="Toggle dark mode"
						onClick={toggleDark}
						className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
					>
						{dark ? <SunIcon size={13} /> : <MoonIcon size={13} />}
					</button>

					{/* Mobile menu */}
					<div className="md:hidden">
						<Sheet open={open} onOpenChange={setOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									aria-label="Toggle menu"
									className="h-7 w-7"
								>
									{open ? <XIcon size={14} /> : <MenuIcon size={14} />}
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-60 border-l bg-background p-0"
							>
								<SheetTitle className="sr-only">Navigation</SheetTitle>
								<div className="flex h-full flex-col">
									<div className="flex items-center justify-between border-b px-6 py-4">
										<span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
											Menu
										</span>
									</div>
									<nav className="flex flex-col py-4">
										{NAV_LINKS.map(({ label, href }, i) => (
											<a
												key={href}
												href={href}
												className={cn(
													"flex items-center gap-3 px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
													isActive(href)
														? "text-primary border-l-2 border-primary pl-[calc(1.5rem-2px)]"
														: "text-muted-foreground hover:text-foreground",
												)}
											>
												<span className="text-muted-foreground/40 tabular-nums">
													{String(i + 1).padStart(2, "0")}
												</span>
												{label}
											</a>
										))}
									</nav>
									<div className="mt-auto border-t px-6 py-4">
										<div className="flex items-center gap-2">
											<span className="relative flex h-1.5 w-1.5">
												<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
												<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
											</span>
											<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
												Open to work
											</span>
										</div>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
