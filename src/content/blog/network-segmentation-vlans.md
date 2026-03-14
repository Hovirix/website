---
draft: false
title: "Understanding Network Segmentation with VLANs"
description: "A practical guide to isolating your home network with VLANs — keeping IoT devices, trusted clients, and servers on separate broadcast domains."
image:
  src: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80"
  alt: "Network cables plugged into a switch"
pubDate: 2026-02-03
category: cybersecurity
tags: ["vlans", "networking", "security", "firewall"]
---

Most home networks are a flat layer-2 mess. Everything from your smart fridge to your work laptop sits on the same broadcast domain. Let's fix that.

## Why VLANs Matter

When your IoT device gets compromised, you don't want it scanning your NAS. VLANs create hard boundaries enforced at the switch and router level.

## The Setup

Using a managed switch (I went with a TP-Link TL-SG108E) and pfSense, I carved out four VLANs:

1. **Trusted** — laptops and phones
2. **IoT** — smart home devices, no internet-to-LAN routing
3. **Servers** — the home lab
4. **Guest** — isolated internet-only access

## Firewall Rules

The key insight: default-deny between VLANs, then punch specific holes. Your IoT bulb never needs to talk to your file server.
