import { MenuIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
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
];

function Logo() {
	return (
		<a
			href="/"
			className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground no-underline"
			aria-label="Hovirix home"
		>
			hovirix
		</a>
	);
}

interface NavbarProps {
	currentPath: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
	const [open, setOpen] = React.useState(false);

	const isActive = (href: string) =>
		href === "/" ? currentPath === "/" : currentPath.startsWith(href);

	return (
		<header className="sticky top-0 z-50 w-full border-t border-b bg-background/85 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				<Logo />

				{/* Desktop Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						{links.map(({ label, href }) => (
							<NavigationMenuItem key={href}>
								<NavigationMenuLink
									href={href}
									className={navigationMenuTriggerStyle()}
									data-active={isActive(href) ? "" : undefined}
								>
									{label}
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right: CTA + Mobile toggle */}
				<div className="flex items-center gap-3">
					<Button asChild variant="outline" className="hidden md:inline-flex">
						<a href="/contact">Contact</a>
					</Button>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Toggle menu"
								className="md:hidden"
							>
								{open ? <XIcon data-icon /> : <MenuIcon data-icon />}
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<SheetTitle className="sr-only">Navigation menu</SheetTitle>
							<div className="flex h-full flex-col gap-6 pt-6">
								<Logo />
								<Separator />
								<nav className="flex flex-col gap-1">
									{links.map(({ label, href }) => (
										<a
											key={href}
											href={href}
											className={cn(
												"rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
												isActive(href)
													? "bg-accent text-accent-foreground"
													: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
											)}
										>
											{label}
										</a>
									))}
								</nav>
								<Separator />
								<Button asChild variant="outline" className="w-full">
									<a href="/contact">Contact</a>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
