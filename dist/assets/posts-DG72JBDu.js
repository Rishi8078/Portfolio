const t=`# Your WiFi Already Sees You — I Tested the Open-Source Repo That Proves It

*I tested RuView, an open-source WiFi sensing system, on a home server with ESP32 nodes. Here's what I found — and why RF sensing is becoming the next spatial modality from smart homes to satellite orbit.*

---

## Introduction

Your WiFi router is already sending radio waves at about 5 GHz. Those waves bounce off your walls, your furniture, and your body. When you move — or even breathe — the reflections change in ways that are specific to what moved and how.

Your router already tracks something called **Channel State Information (CSI)** to optimize the signal between itself and your devices. But CSI also encodes the shape and movement of everything between the router and the device — including you.

This isn't new. Xfinity already ships a feature called **WiFi Motion** to every customer with a newer gateway. No extra hardware, no extra cost. Your existing network becomes a motion sensor. They market it as a smart home feature, but the underlying capability is **presence detection** — your router knows you're there.

After watching [Matt Belaval's deep dive on WiFi sensing](https://www.youtube.com/watch?v=0OdR8rRMz3I&t=298s), I wanted to see how far the open-source world has come. So I tested **RuView** ([github.com/ruvnet/RuView](https://github.com/ruvnet/RuView)) — an edge AI system that implements WiFi DensePose on commodity ESP32 hardware. This post covers what I found, how I set it up, and the broader landscape that makes this technology both exciting and unsettling.

📺 **Video reference:** [Watch on YouTube](https://www.youtube.com/watch?v=0OdR8rRMz3I&t=298s)  
🔗 **Source code:** [github.com/ruvnet/RuView](https://github.com/ruvnet/RuView)

---

## The Research Pipeline: From Motion to Identity

WiFi sensing progresses in three stages — and published research already covers all three.

### Step 1: Presence Detection (Already Deployed)

This is the easiest: detect that *someone* is in the room. Xfinity, Linksys Aware, and others already ship this to millions of homes. CSI variance spikes when a body moves through the radio field. It's a binary signal — someone is there, or they're not.

### Step 2: Full Body Pose (CMU, 2023)

In 2023, Carnegie Mellon University published **DensePose from WiFi** — using just WiFi signals from a standard router, an AI model reconstructs full body pose. Not just "someone's in the room" but the position of arms, legs, posture. Multiple people. Through walls. No camera.

### Step 3: Person Re-Identification (HuFi, 2025)

A 2025 paper called **HuFi** showed that WiFi signals interact with your body uniquely — based on bone density, body mass, posture, gait. A transformer neural network can match those signatures to specific individuals. Your walk creates a biometric fingerprint in the WiFi signal.

As Matt Belaval puts it: *"The gap between 'detect motion' and 'identify the person' is a simple software update. The hardware is already installed."*

---

## How WiFi Sensing Works (Technical)

Every WiFi router floods its surroundings with radio waves. When those waves hit a human body — or when a person breathes, walks, or gestures — the signal scatters differently. Modern WiFi chipsets can expose this scattering pattern as **Channel State Information (CSI)**: per-subcarrier amplitude and phase data that encodes fine-grained information about the environment.

RuView's processing pipeline looks like this:

\`\`\`
WiFi Router → radio waves fill the room → hit human body → scatter
    ↓
ESP32-S3 mesh (3-6 nodes) captures CSI on multiple channels
    ↓
Multi-Band Fusion: 3 channels × 56 subcarriers = 168 virtual subcarriers per link
    ↓
Signal Processing: Hampel filter, SpotFi phase correction, Fresnel zone modeling
    ↓
AI Backbone (RuVector): attention networks, graph algorithms, compression
    ↓
Output: real-time pose, breathing rate, heart rate, presence detection
\`\`\`

The key insight is that WiFi signals pass through walls, furniture, and even rubble. This makes WiFi sensing useful in scenarios where cameras simply cannot work — dark rooms, disaster zones, privacy-sensitive environments.

---

## Testing RuView: My Setup

I set up a test deployment on my home network to evaluate RuView's open-source implementation.

### The Server

I'm running the RuView sensing server on a machine at \`192.168.0.212\` (hostname: \`wify\` — fitting). The server runs inside Docker:

\`\`\`bash
docker pull ruvnet/wifi-densepose:latest
docker run -p 3000:3000 ruvnet/wifi-densepose:latest
\`\`\`

The container ships a **Rust-based sensing server** (\`sensing-server\`) that processes CSI frames at 54,000+ frames per second — 810x faster than the original Python implementation. Here's the actual CLI from my deployment:

\`\`\`bash
root@wify:~/RuView/docker# docker exec docker-sensing-server-1 /app/sensing-server --help
WiFi-DensePose sensing server

Usage: sensing-server [OPTIONS]

Options:
      --http-port <HTTP_PORT>    HTTP port for UI and REST API [default: 8080]
      --ws-port <WS_PORT>        WebSocket port for sensing stream [default: 8765]
      --udp-port <UDP_PORT>      UDP port for ESP32 CSI frames [default: 5005]
      --source <SOURCE>          Data source: auto, wifi, esp32, simulate [default: auto]
      --tick-ms <TICK_MS>        Tick interval in ms (default 100 = 10 fps) [default: 100]
      --benchmark                Run vital sign detection benchmark (1000 frames) and exit
      --load-rvf <PATH>          Load model config from an RVF container at startup
      --model <PATH>             Load a trained .rvf model for inference
      --progressive              Enable progressive loading (Layer A instant start)
      --train                    Run training mode (train a model and exit)
      --pretrain                 Run self-supervised contrastive pretraining (ADR-024)
      --embed                    Extract embeddings mode
      --build-index <TYPE>       Build fingerprint index (env|activity|temporal|person)
\`\`\`

The server hostname is \`wify\` — fitting. It exposes three ports by default:

| Port | Protocol | Purpose |
|------|----------|----------|
| **8080** | HTTP | UI dashboard + REST API |
| **8765** | WebSocket | Real-time sensing stream |
| **5005** | UDP | ESP32 CSI frame ingestion |

\`\`\`bash
# Health check
curl http://192.168.0.212:8080/health

# Latest sensing frame
curl http://192.168.0.212:8080/api/v1/sensing/latest

# Vital signs
curl http://192.168.0.212:8080/api/v1/vital-signs

# Pose estimation
curl http://192.168.0.212:8080/api/v1/pose/current
\`\`\`

The \`--source\` flag is particularly interesting — it supports \`auto\` (detect hardware), \`esp32\` (real CSI nodes), \`wifi\` (RSSI from standard WiFi), or \`simulate\` (demo mode). In my test I used \`auto\`, which detects the ESP32 mesh automatically.

### The Sensor Nodes — ESP32-S3

The sensor side uses **ESP32-S3 microcontrollers** — available for ~$8. These chips can expose raw CSI data, which standard WiFi hardware cannot.

Each ESP32 node captures WiFi CSI at ~20-28 Hz and streams it over UDP to the aggregator. I provisioned the nodes using the \`provision.py\` script from the repo, which writes WiFi credentials and the target server address directly to the chip's NVS (Non-Volatile Storage) partition — no firmware recompilation required.

My NVS configuration for the test:

\`\`\`csv
key,type,encoding,value
csi_cfg,namespace,,
ssid,data,string,MyNetwork
password,data,string,***
target_ip,data,string,192.168.0.212
target_port,data,u16,5005
channel,data,u8,13
\`\`\`

Provisioning is a single command:

\`\`\`bash
python provision.py --port /dev/ttyUSB0 --ssid "MyNetwork" --password "secret" --target-ip 192.168.0.212
\`\`\`

The script generates an NVS binary and flashes it to the ESP32 using \`esptool\`. The sensor immediately begins streaming CSI data to the Docker container.

### Network Architecture

\`\`\`
[ESP32 Node 1] --UDP:5005-->  [Docker: sensing-server]  <--HTTP:8080-- [Browser/Client]
[ESP32 Node 2] --UDP:5005-->     wify (192.168.0.212)    <--WS:8765--- [Real-time Dashboard]
[ESP32 Node 3] --UDP:5005-->
\`\`\`

Multiple nodes create overlapping signal paths. With 4-6 nodes, you get 12+ crossing links that provide 360° coverage of a room with sub-inch accuracy.

---

## What It Can Detect

| Capability | Method | Range |
|---|---|---|
| **Presence** | RSSI variance + motion band power | < 1ms latency |
| **Breathing rate** | Bandpass 0.1-0.5 Hz → FFT peak | 6-30 BPM |
| **Heart rate** | Bandpass 0.8-2.0 Hz → FFT peak | 40-120 BPM |
| **Body pose** | CSI amplitude/phase → DensePose UV maps | 17 keypoints |
| **Through-wall** | Fresnel zone geometry + multipath modeling | Up to 5m depth |
| **Multi-person** | Per-person tracking with independent vitals | ~3-5 per AP |

All of this happens without any camera, wearable, or internet connection. The signals are just WiFi — the same signals that are already everywhere.

---

## The Bigger Picture: RF as a Spatial Modality

Testing RuView was illuminating, but the broader landscape is what really struck me. As Matt Belaval's video lays out, the same fundamental physics — **radio waves as a sensing medium** — is being commercialized at every scale.

### Enterprise: Zar ($1B Valuation)

A company called **Zar** emerged after 9 years in stealth with a billion-dollar valuation and $100M+ in funding. Investors include Steve Jurvetson (SpaceX board), co-founders of Yahoo and Siri, and Skype's founding engineer. Their tech synchronizes existing WiFi and 5G signals to **sub-nanosecond precision** — radio waves travel at 30cm per nanosecond, so precise timing yields sub-meter positioning that works indoors, outdoors, and through walls. No GPS, no new sensors. They're calling it the foundational layer for physical AI, and they have 100+ patents with zero rejections.

### Defense: Anduril's Pulsar ($60B Valuation)

Palmer Luckey's defense company **Anduril** just raised $4B at a $60B valuation. Their **Pulsar** system is an AI-powered electromagnetic warfare platform that passively senses and classifies every RF emission in an area, geolocates the source, and can deliver electronic attacks — all autonomous, all on the edge. Same principle as your WiFi router sensing your body, except at military scale.

### Space: HawkEye 360

**HawkEye 360** has 30 satellites in clusters of three at ~500km altitude, with a single job: detect and geolocate every RF emitter on Earth. Ship radios, radar systems, GPS jammers, emergency beacons. They track "dark ships" that turn off their transponders — because you can go dark on AIS, but you can't go dark on physics. **Spire Global** has another 100 satellites doing similar RF intelligence work.

### The Common Thread

These aren't separate stories. Your living room, Zar, Anduril, HawkEye 360 — they all share the same insight: **radio waves are a sensing medium**. We just treated them as dumb pipes carrying data from A to B. In reality, every WiFi signal, every 5G pulse, every radio broadcast paints a spatial picture of the physical world.

RF is becoming the next spatial modality — alongside LiDAR, RGB cameras, and infrared — except it's **already deployed in every building, on every battlefield, and overhead in orbit**. It works through walls, in the dark, in bad weather, on hardware nobody thinks twice about.

---

## Privacy: The Uncomfortable Question

There's a Dark Knight quality to this — the scene where Batman uses sonar from cell phones to map the city. WiFi sensing has the same dual-use tension.

On one hand: cameras inside your home are creepy. Passive RF sensing that knows who's in a room, whether they're breathing, and if they've fallen — without recording a single image — is genuinely useful for elder care, home automation, and safety.

On the other hand: the gap between "detect motion" and "identify the specific person" is a software update. The hardware is already in your home. As Matt says, *"Most people don't even know their WiFi can see."*

RuView is privacy-preserving by design — no video, no images, just RF signal analysis. But the broader lesson from GPS location data applies here too: useful and scary are not mutually exclusive. We need eyes wide open about what this technology can and should do.

---

## Conclusion

Testing RuView convinced me that WiFi sensing has crossed the threshold from academic research to deployable open-source software. A $60 hardware setup and a Docker pull gets you real-time presence detection, vital sign monitoring, and body pose estimation — through walls, in the dark, with zero cameras.

But the bigger story isn't one repo. It's that RF-as-sensing is being commercialized from the living room to low Earth orbit. The signals are already there. The compute is cheap enough. The algorithms work. The question now is what we build with it — and what guardrails we put around it.

📺 **Watch Matt Belaval's video:** [YouTube](https://www.youtube.com/watch?v=0OdR8rRMz3I&t=298s)  
🔗 **RuView source code:** [github.com/ruvnet/RuView](https://github.com/ruvnet/RuView)  
🐳 **Docker:** \`docker pull ruvnet/wifi-densepose:latest\`

---

*Written by Rishi — tested RuView on a home server with ESP32 sensors. The repo is by [ruvnet](https://github.com/ruvnet). Questions? Open an issue on GitHub or drop a comment below.*
`,i=[{id:"wifi-sensing",title:"Your WiFi Already Sees You",date:"Mar 13, 2026",author:"Rishi",category:"RF Sensing",description:"I tested RuView, an open-source WiFi sensing system, on a home server with ESP32 nodes. Here's what I found — and why RF sensing is becoming the next spatial modality from smart homes to satellite orbit.",content:t},{id:"1",title:"The Reality of Edge ML",date:"Mar 24, 2026",author:"Rishi",category:"Architecture",description:"Deploying machine learning models to the edge is fraught with physical constraints. This architectural deep-dive explores how to optimize memory allocation.",content:`
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
    `.trim()},{id:"2",title:"Building Resilient IoT Protocols",date:"Feb 24, 2026",author:"Rishi",category:"Architecture",description:"Why standard MQTT and CoAP fail when connection drops are the norm. We break down custom acknowledgement handshakes.",content:`
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
    `.trim()},{id:"3",title:"ROS vs Custom Stacks in Autonomy",date:"Jan 12, 2026",author:"Rishi",category:"Robotics",description:"An evaluation of the Robot Operating System (ROS) ecosystem against custom-built software stacks for autonomous vehicles.",content:`
An evaluation of the Robot Operating System (ROS / ROS2) ecosystem against custom-built software stacks for autonomous vehicles and robotics platforms.

More content coming soon...
    `.trim()},{id:"4",title:"When to avoid MQTT at the edge",date:"Dec 08, 2025",author:"Rishi",category:"Networking",description:"MQTT is the standard for IoT, but it has severe limitations in constrained, high-latency edge environments.",content:`
MQTT is the standard for IoT, but it has severe limitations in constrained, high-latency edge environments. Discover when and why you should look for lightweight alternatives.

More content coming soon...
    `.trim()}],a=e=>i.find(n=>n.id===e);export{a as g,i as p};
