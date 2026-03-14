import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
	{ label: "Home", href: "/" },
	{ label: "Portfolio", href: "/portfolio" },
	{ label: "Blog", href: "/blog" },
	{ label: "Contact", href: "/contact" },
];

interface NavbarProps {
	currentPath: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
	const [open, setOpen] = React.useState(false);
	const [dark, setDark] = React.useState(true);

	React.useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);

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
		<header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-8">
				{/* Logo — monospaced, amber accent on bracket */}
				<a
					href="/"
					className="flex items-center gap-0 font-mono text-sm font-medium tracking-tight text-foreground no-underline"
					aria-label="Hovirix home"
				>
					<span className="text-primary">[</span>
					<span>hovirix</span>
					<span className="text-primary">]</span>
				</a>

				{/* Desktop nav — right side */}
				<div className="hidden md:flex items-center gap-1">
					{links.map(({ label, href }) => (
						<a
							key={href}
							href={href}
							className={cn(
								"relative px-3 py-1.5 font-mono text-xs tracking-widest uppercase transition-colors",
								isActive(href)
									? "text-primary"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{isActive(href) && (
								<span className="absolute bottom-0 left-3 right-3 h-px bg-primary" />
							)}
							{label}
						</a>
					))}

					<div className="mx-3 h-4 w-px bg-border" />

					<button
						type="button"
						aria-label="Toggle dark mode"
						onClick={toggleDark}
						className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
					>
						{dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
					</button>
				</div>

				{/* Mobile */}
				<div className="flex items-center gap-2 md:hidden">
					<button
						type="button"
						aria-label="Toggle dark mode"
						onClick={toggleDark}
						className="flex h-8 w-8 items-center justify-center text-muted-foreground"
					>
						{dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
					</button>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Toggle menu"
								className="h-8 w-8"
							>
								{open ? <XIcon size={16} /> : <MenuIcon size={16} />}
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-64 border-l bg-background">
							<SheetTitle className="sr-only">Navigation menu</SheetTitle>
							<div className="flex flex-col gap-1 pt-12">
								<p className="mb-4 px-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
									Navigation
								</p>
								{links.map(({ label, href }) => (
									<a
										key={href}
										href={href}
										className={cn(
											"flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-widest uppercase transition-colors",
											isActive(href)
												? "text-primary border-l-2 border-primary pl-[calc(1rem-2px)]"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{label}
									</a>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
