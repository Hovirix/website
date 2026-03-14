---
draft: false
title: "Building a Home Server from Scratch"
description: "How I turned an old PC into a full-featured home lab running Proxmox, with self-hosted services including Nextcloud, Gitea, and a reverse proxy."
image:
  src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
  alt: "Server rack with blinking lights in a dark room"
pubDate: 2026-01-15
category: homelab
tags: ["proxmox", "self-hosted", "linux", "networking"]
---

Running your own server is one of the most rewarding things you can do as a developer. This is the story of how I built mine.

## Hardware

I started with an old Ryzen 5 machine with 32GB of RAM — more than enough to run a dozen VMs and containers comfortably.

## Proxmox Setup

Proxmox VE is the backbone. It gives you a clean web UI for managing VMs and LXC containers without having to remember every `virsh` command.

## Services Running

- **Nextcloud** — personal cloud storage
- **Gitea** — self-hosted Git
- **Nginx Proxy Manager** — reverse proxy with Let's Encrypt SSL
- **Uptime Kuma** — monitoring dashboard
