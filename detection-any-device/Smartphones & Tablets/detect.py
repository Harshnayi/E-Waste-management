import random
import json
import math

# =================================================================
# E-WASTE AI DETECTION HUB: SMARTPHONES & TABLETS
# Implementation based on SIH Scientific Specifications (v2)
# =================================================================

class DeviceAI:
    def __init__(self):
        # Risk Weights based on Toxicity and Safety levels
        self.risk_weights = {
            "Lithium Battery": 1.0,    # Fire/Explosion Risk
            "Lead Solder (PCB)": 0.7,   # Toxic heavy metal
            "Mercury (Backlight)": 0.8, # Environmental toxin
            "LCD/OLED Screen": 0.1,     # Mostly Glass (Safe)
            "Aluminum Casing": 0.1,     # Highly Recyclable (Safe)
            "Plastic Frame": 0.1,       # Safe
            "Copper Wiring": 0.2        # Valuable/Safe
        }

    def level_a_classify(self, image_data):
        """Identify Device Category"""
        categories = ["iPhone 13 Pro", "Samsung S22 Ultra", "Google Pixel 7", "iPad Pro (11-inch)"]
        return random.choice(categories)

    def level_b_extract_components(self, image_data):
        """Locate visible parts and identify material signatures"""
        # Mocking YOLO/Faster R-CNN segmentation results
        return [
            {"name": "Lithium Battery", "confidence": 0.95, "material": "Lithium/Cobalt"},
            {"name": "LCD/OLED Screen", "confidence": 0.92, "material": "Glass/Silicon"},
            {"name": "Lead Solder (PCB)", "confidence": 0.88, "material": "Lead/Copper"},
            {"name": "Aluminum Casing", "confidence": 0.94, "material": "Aluminum"}
        ]

    def level_d_assess_damage(self, image_data):
        """Analyze physical integrity via Edge Detection & baseline comparison"""
        # Damage Cues: Cracks, Burns, Swelling, Corrosion
        damage_incidents = []
        
        # Randomly simulate some damage for demo variety
        if random.random() > 0.3:
            damage_incidents.append({"type": "Cracked Screen", "severity": 0.6})
        if random.random() > 0.7:
            damage_incidents.append({"type": "Swollen Battery", "severity": 0.9})
        if random.random() > 0.8:
            damage_incidents.append({"type": "Thermal Discoloration (Burn)", "severity": 0.8})
            
        return damage_incidents

    def level_f_calculate_damage_score(self, incidents):
        """Compute Damage Score (0-1)"""
        if not incidents:
            return 0.0
        # Average of top 2 severe incidents to determine overall damage
        sorted_severity = sorted([i['severity'] for i in incidents], reverse=True)
        avg_severity = sum(sorted_severity[:2]) / min(len(sorted_severity), 2)
        return round(avg_severity, 2)

    def level_c_calculate_harmlessness(self, components, damage_score, incidents):
        """
        Compute Harmlessness using the Weighted Risk Formula:
        Harmlessness = 1 - [ Σ(Hazard Confidence * Risk Weight * Amplification) / Max Risk ]
        """
        total_risk = 0.0
        max_possible_risk = len(components) * 1.0 # Normalizing factor
        
        # Identify Amplifiers (Hazards + Damage)
        has_swelling = any(i['type'] == "Swollen Battery" for i in incidents)
        has_cracked_screen = any(i['type'] == "Cracked Screen" for i in incidents)
        
        for comp in components:
            weight = self.risk_weights.get(comp['name'], 0.1)
            
            # Level E: Hazard Amplification
            multiplier = 1.0
            if comp['name'] == "Lithium Battery" and has_swelling:
                multiplier = 2.5 # Critical hazard increase
            if comp['name'] == "LCD/OLED Screen" and has_cracked_screen:
                multiplier = 1.5 # Toxicity exposure increase
                
            total_risk += (comp['confidence'] * weight * multiplier)
            
        # Final normalized score (cap at 1.0)
        harmlessness = 1 - (total_risk / max_possible_risk)
        return round(max(0, harmlessness), 2)

    def level_g_interpret(self, h_score, d_score):
        """Severity Grading Interpretation"""
        if h_score <= 0.3 or d_score >= 0.8:
            return "HIGHLY HAZARDOUS", "Danger: Fire/Toxic risk detected. Warn user immediately."
        elif h_score <= 0.6 or d_score >= 0.4:
            return "MODERATELY HAZARDOUS", "Warning: Requires specialized recycler handling."
        else:
            return "MOSTLY HARMLESS", "Safe: Eligible for standard recycling flow."

    def run_full_smart_assessment(self, image_data):
        device = self.level_a_classify(image_data)
        components = self.level_b_extract_components(image_data)
        incidents = self.level_d_assess_damage(image_data)
        
        damage_score = self.level_f_calculate_damage_score(incidents)
        harmlessness_score = self.level_c_calculate_harmlessness(components, damage_score, incidents)
        
        status, message = self.level_g_interpret(harmlessness_score, damage_score)
        
        return {
            "assessment_id": f"AI-{random.randint(1000, 9999)}",
            "device_name": device,
            "category": "Smartphones & Tablets",
            "metrics": {
                "harmlessness_score": harmlessness_score,
                "damage_score": damage_score
            },
            "verdict": {
                "status": status,
                "message": message
            },
            "analysis": {
                "detected_components": components,
                "damage_incidents": incidents
            }
        }

# =================================================================
# MAIN INTEGRATION POINT (For Backend connection)
# =================================================================
if __name__ == "__main__":
    ai = DeviceAI()
    result = ai.run_full_smart_assessment("mock_image_binary_data")
    
    # Returning JSON output for the Web System to read
    print(json.dumps(result, indent=4))
