# Your WiFi Already Sees You, But Beware of AI-Generated Open-Source Scams

Your WiFi router is constantly sending 5 GHz radio waves that bounce off everything in your home, including your body. When you move, those reflections change. Modern routers track Channel State Information (CSI) to optimize signal strength, but this data also encodes the shape and movement of people in the room.

While the physics are real, the hype has attracted bad actors. I recently set out to test this by running a massively trending GitHub repository called **RuView** (WiFi-DensePose), which claimed to offer through-wall human sensing using cheap ESP32 chips. Here is what I actually found, and why the real-world applications of this tech are happening far away from fake open-source repos.

---

## Testing RuView and the Technical Audit

My experience attempting to test RuView was an immediate red flag. The installation instructions were broken, the codebase was padded with useless boilerplate, and it entirely failed to process real wireless signals.

A deeper look into the community's response—specifically a technical audit hosted at the deletexiumu/wifi-densepose repository—revealed that the entire project is an elaborate scam. The audit uncovered that RuView is a non-functional, AI-generated facade:

* **Fake Data Generators:** The system does not actually process WiFi CSI data; instead, tests pass because they rely on random-number generators designed to output mock data.
* **No Actual Neural Networks:** Despite the author claiming a "94.2% pose detection accuracy," the audit confirmed there are no pretrained weights, no datasets, and no training scripts anywhere in the project.
* **Star Inflation and Censorship:** The repository artificially inflated its star count overnight, and the creator actively deletes GitHub issues from developers who point out that the code doesn't work.

---

## The Reality: RF Sensing is Already Here

While the RuView repository is an AI-generated grift, the underlying science it attempted to mimic is actively being deployed by major tech and defense companies.

The gap between simply detecting motion and identifying a specific person is ultimately just a software update to hardware you already own.

### 1. Consumer and Academic Proof

* **Presence Detection:** Xfinity already offers a feature called "WiFi Motion" to customers with newer gateways. It turns the existing network into a motion sensor for presence detection, without requiring extra hardware or cameras.
* **Full Body Pose:** In 2023, Carnegie Mellon University researchers published "DensePose from WiFi". They demonstrated that an AI model can reconstruct full human body poses—mapping the precise position of arms, legs, and posture—through walls using just standard WiFi signals.
* **Biometric Signatures:** A 2025 paper called "WhoFi" proved that WiFi signals interact uniquely with different bodies based on mass, bone density, and posture. By analyzing how someone walks, a transformer neural network can match biometric signatures in the WiFi signal to specific individuals.

### 2. Commercialization at Scale

The physics of radio waves as a sensing medium is being scaled globally:

* **ZaiNar:** A startup that emerged from 9 years of stealth with a $1 billion valuation. They synchronize existing WiFi and 5G signals to sub-nanosecond precision, providing sub-meter indoor and outdoor positioning without the need for GPS.
* **Anduril:** The defense company recently raised $4 billion at a $60 billion valuation. Their "Pulsar" system is an AI-powered electromagnetic warfare platform that passively senses, classifies, and geolocates RF emissions entirely on the edge.
* **HawkEye 360:** Operating a constellation of 30 satellites, this company's purpose is to detect and geolocate RF emitters on Earth, including tracking "dark ships" that have turned off their standard transponders.

