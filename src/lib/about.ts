export const ABOUT_SKILLS = [
	{
		area: "Infrastructure",
		items: [
			"Kubernetes",
			"Docker",
			"Ansible",
			"Terraform",
			"Flux CD",
			"Proxmox",
		],
	},
	{
		area: "Security",
		items: [
			"pfSense",
			"Authelia",
			"WireGuard",
			"VLAN segmentation",
			"LDAP",
			"WebAuthn",
		],
	},
	{
		area: "Development",
		items: ["TypeScript", "React", "Astro", "Node.js", "Python", "PostgreSQL"],
	},
	{
		area: "Tooling",
		items: ["NixOS", "Git", "Grafana", "Prometheus", "Gitea", "Vaultwarden"],
	},
] as const;

export const ABOUT_TIMELINE = [
	{
		year: "2025",
		role: "Platform Engineer",
		org: "Consulting engagements",
		note: "Designed and stabilized self-hosted platform stacks with observability, backup, and deployment automation.",
	},
	{
		year: "2023",
		role: "Infrastructure Builder",
		org: "Independent projects",
		note: "Built secure networking patterns and identity gateways for internal services and personal products.",
	},
	{
		year: "2022",
		role: "Frontend + DX Engineer",
		org: "Web applications",
		note: "Shipped polished interfaces in React and Astro while improving build, lint, and deployment feedback loops.",
	},
	{
		year: "2020",
		role: "Started building homelab",
		org: "Self-directed",
		note: "Began running self-hosted infrastructure - the foundation for everything else.",
	},
] as const;
