import wifiSensingContent from '../content/posts/wifi-sensing.md?raw';
import mcpContent from '../content/posts/decoding-mcp-hype.md?raw';
import gpuPassthroughContent from '../content/posts/Proxmox LXC GPU Passthruogh Setup Guide.md?raw';

export interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  description: string;
  content: string;
  image?: string;
}

export const posts: Post[] = [
  {
    id: "wifi-sensing",
    title: "Your WiFi Already Sees You",
    date: "Mar 13, 2026",
    author: "Rishi",
    category: "RF Sensing",
    description: "While the physics of RF sensing are real, the hype attracts bad actors. An audit into the massively trending RuView WiFi-DensePose repo reveals a complex, AI-generated scam. Here is the reality of RF sensing.",
    content: wifiSensingContent,
    image: "/wifi-sensing.png"
  },
  {
    id: "decoding-mcp-hype",
    title: "Decoding the Hype: Is mCP the Key to Unleashing LLM Potential?",
    date: "Mar 18, 2025",
    author: "Rishi",
    category: "AI",
    description: "mCP is the new tech buzzword. Is it a fad or the foundation for the next generation of AI apps? Let's break down how this universal translator gives LLMs their true superpowers.",
    content: mcpContent,
    image: "/mcp.png"
  },
  {
    id: "gpu-passthrough",
    title: "Proxmox LXC GPU Passthrough Setup Guide",
    date: "Mar 06, 2025",
    author: "Rishi",
    category: "Homelab",
    description: "A step-by-step guide to setting up NVIDIA GPU passthrough for LXC containers in Proxmox, enabling GPU-accelerated AI workloads with Docker, Ollama, and OpenWebUI.",
    content: gpuPassthroughContent,
    image: "/gpu.png"
  }
];

export const getPostById = (id: string) => {
  return posts.find((p) => p.id === id);
};