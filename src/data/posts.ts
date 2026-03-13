import wifiSensingContent from '../content/posts/wifi-sensing.md?raw';

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
    id: "1",
    title: "The Reality of Edge ML",
    date: "Mar 24, 2026",
    author: "Rishi",
    category: "Architecture",
    description: "Deploying machine learning models to the edge is fraught with physical constraints. This architectural deep-dive explores how to optimize memory allocation.",
    content: `
Deploying machine learning models to the edge is fraught with physical constraints. This architectural deep-dive explores how to optimize memory allocation, manage power states, and reduce inference latency on ultra-low-power microcontrollers without compromising accuracy.

## The Memory Wall

When working with microcontrollers (MCUs) boasting less than 256KB of RAM, standard deep learning frameworks simply crash. 
The solution isn't to just compress the model—it's to completely rethink how weights are loaded into execution memory.

### Key Strategies
* **Quantization:** Moving from FP32 to INT8 is non-negotiable.
* **Pruning:** Removing near-zero weights dynamically.
* **Memory Mapping:** Streaming weights directly from flash storage without caching them in RAM.

Here is an example snippet of a memory-optimized generic buffer pipeline:
\`\`\`c
#include <stdint.h>

void allocate_tensor_arena(uint8_t* base_address, size_t size) {
    // Ensuring aligned memory for SIMD instructions
    uint32_t aligned_ptr = (uint32_t)base_address;
    if (aligned_ptr % 16 != 0) {
        aligned_ptr += 16 - (aligned_ptr % 16);
    }
    // Arena initialization...
}
\`\`\`

By rigorously analyzing memory maps, we can reliably run TinyML vision models on chips powered by a coin cell battery for years.
    `.trim()
  },
  {
    id: "2",
    title: "Building Resilient IoT Protocols",
    date: "Feb 24, 2026",
    author: "Rishi",
    category: "Architecture",
    description: "Why standard MQTT and CoAP fail when connection drops are the norm. We break down custom acknowledgement handshakes.",
    content: `
Why standard MQTT and CoAP fail when connection drops are the norm. We break down custom acknowledgement handshakes and message queuing strategies built to survive erratic remote sensor deployments in off-grid environments.

## The Flaw in TCP/IP Assumptions

Most standard IoT libraries implicitly assume an "always-on" or "usually-on" network link.
Even protocols designed for lightweight communications, like MQTT, rely on TCP underneath.
In remote structural health monitoring (where nodes might communicate over LoRa or erratic satellite links), this falls apart quickly.

### Custom Polling Handshakes

When designing the networking layer for an off-grid system, UDP with custom resilience wrappers usually out-performs TCP.

1. **State Preservation:** Store the absolute minimal delta of device state in non-volatile memory before every network radio transmission.
2. **Deterministic Backoff:** Exponential backoffs must account for synchronous network flooding when a gateway re-appears. 
3. **Hardware Watchdogs:** An unreachable sub-routine must trigger a hardware reset from the baseboard, avoiding "zombie" zombie connection states.

These constraints fundamentally alter how you design software for the physical world.
    `.trim()
  },
  {
    id: "3",
    title: "ROS vs Custom Stacks in Autonomy",
    date: "Jan 12, 2026",
    author: "Rishi",
    category: "Robotics",
    description: "An evaluation of the Robot Operating System (ROS) ecosystem against custom-built software stacks for autonomous vehicles.",
    content: `
An evaluation of the Robot Operating System (ROS / ROS2) ecosystem against custom-built software stacks for autonomous vehicles and robotics platforms.

More content coming soon...
    `.trim()
  },
  {
    id: "4",
    title: "When to avoid MQTT at the edge",
    date: "Dec 08, 2025",
    author: "Rishi",
    category: "Networking",
    description: "MQTT is the standard for IoT, but it has severe limitations in constrained, high-latency edge environments.",
    content: `
MQTT is the standard for IoT, but it has severe limitations in constrained, high-latency edge environments. Discover when and why you should look for lightweight alternatives.

More content coming soon...
    `.trim()
  }
];

export const getPostById = (id: string) => {
  return posts.find((p) => p.id === id);
};