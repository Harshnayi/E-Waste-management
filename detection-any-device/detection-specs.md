# E-Waste Locator - AI Detection specifications (v2)

This document serves as the master technical reference for the future implementation of the AI/ML detection hub.

## 🎯 1. Detection Basis (Identification)
The model performs multi-layered analysis on input images:

### Level A: Classification
- **Goal**: Identify the overall device category.
- **Targets**: Smartphone, Laptop, Battery, TV, Large Appliance, Others.
- **Technique**: CNN (Convolutional Neural Network).

### Level B: Component & Material Analysis
- **Goal**: Location and identification of specific parts.
- **Technique**: YOLO / Faster R-CNN (Object Detection).
- **Targets**: Batteries, PCBs, Screens, Wires, Casings.
- **Material Signatures**:
    - **Metallic Luster**: Copper/Aluminum.
    - **Cylindrical Shape**: Lithium-ion cells.
    - **Green/Blue Boards**: Lead-solder PCBs.
    - **Glass Panels**: Display units.

---

## 💥 2. Damage Detection Logic (Integrity)
Damage level directly influences the recyclability and hazard rating.

### Level C: Visual Damage Cues
- **Cracks, Dents, Scratches**: Detected via edge detection.
- **Burn Marks/Discoloration**: Indicates fire hazard or internal circuit failure.
- **Corrosion/Rust**: Signals chemical leakage or improper storage history.
- **Broken Components**: Missing or detached parts (wires, screens).

### Level D: Component Integrity
- **Swelling**: Comparing battery shape to "flat" baselines (indicates high fire risk).
- **Continuity**: Identifying broken solder lines or burnt tracks on PCBs.

### Level E: Hazard Amplification
Physical damage increases the severity of existing hazards:
- **Swollen Battery** ➔ Exponential Increase in Fire Risk.
- **Cracked Screen** ➔ Increased Mercury/Toxic exposure risk.
- **Exposed Wires** ➔ Direct Electrical Hazard.

---

## ⚖️ 3. Scoring & Interpretation
The AI calculates numerical scores for automated decision making.

### Harmlessness Score (0 - 1)
`Harmlessness = 1 - [ Σ(Hazard Confidence * Risk Weight) / Max Possible Risk ]`

### Damage Score (0 - 1)
- **0.0**: Fully Intact (Factory condition).
- **0.5**: Moderate Damage (Visible cracks, minor swelling).
- **1.0**: Severe Damage (Burnt, leaking, shattered).

### Severity Grading
- **0.0 - 0.3**: **Highly Hazardous** (Danger: Fire/Toxic risk, warn user immediately).
- **0.3 - 0.6**: **Moderately Hazardous** (Requires specialized recycler handling).
- **0.6 - 1.0**: **Mostly Harmless** (Safe for standard recycling/logistics).
