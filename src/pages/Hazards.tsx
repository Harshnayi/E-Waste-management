import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Smartphone, Laptop, Battery, Tv, Monitor, Printer, AlertTriangle, Info } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface HazardCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  name: string;
  toxicMaterials: string[];
  riskLevel: string;
  riskColor: string;
  disposalTip: string;
  delay?: string;
}

const HazardCard = ({ icon: Icon, iconBg, iconColor, name, toxicMaterials, riskLevel, riskColor, disposalTip, delay = "0s" }: HazardCardProps) => (
  <div
    className="card-elevated rounded-xl p-5 animate-fade-up"
    style={{ animationDelay: delay }}
  >
    <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>

    <h3 className="text-base font-semibold text-foreground mb-2">{name}</h3>

    <div className="mb-3">
      <div className="flex flex-wrap gap-1.5">
        {toxicMaterials.map((material) => (
          <span
            key={material}
            className="px-2 py-0.5 bg-destructive/10 text-destructive rounded text-xs"
          >
            {material}
          </span>
        ))}
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{disposalTip}</p>

    <div className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${riskColor.replace('text-', 'bg-')}`} />
      <span className={`text-xs font-medium ${riskColor}`}>{riskLevel}</span>
    </div>
  </div>
);

const hazards = [
  {
    icon: Smartphone,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    name: "Mobile Phones",
    toxicMaterials: ["Lithium", "Lead", "Mercury"],
    riskLevel: "HIGH TOXICITY RISK",
    riskColor: "text-red-500",
    disposalTip: "Remove battery if possible. Never dispose in regular trash.",
  },
  {
    icon: Laptop,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    name: "Laptops & Computers",
    toxicMaterials: ["Lead", "Mercury", "BFRs"],
    riskLevel: "MEDIUM TOXICITY RISK",
    riskColor: "text-amber-500",
    disposalTip: "Backup and wipe data before recycling.",
  },
  {
    icon: Battery,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    name: "Batteries",
    toxicMaterials: ["Lithium", "Lead", "Acid"],
    riskLevel: "CRITICAL HANDLING",
    riskColor: "text-purple-500",
    disposalTip: "Never puncture or expose to heat. Tape terminals.",
  },
  {
    icon: Tv,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    name: "TVs & Monitors",
    toxicMaterials: ["Lead", "Mercury", "Phosphors"],
    riskLevel: "HIGH TOXICITY RISK",
    riskColor: "text-red-500",
    disposalTip: "CRT monitors contain significant lead. Handle carefully.",
  },
  {
    icon: Monitor,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    name: "LCD Screens",
    toxicMaterials: ["Mercury", "Lead"],
    riskLevel: "MEDIUM TOXICITY RISK",
    riskColor: "text-amber-500",
    disposalTip: "Contains fluorescent backlighting with mercury.",
  },
  {
    icon: Printer,
    iconBg: "bg-emerald-light",
    iconColor: "text-primary",
    name: "Printers & Cartridges",
    toxicMaterials: ["Toner", "Plastics"],
    riskLevel: "LOW TOXICITY RISK",
    riskColor: "text-primary",
    disposalTip: "Return cartridges to manufacturer programs.",
  },
];

import { DeviceIdentifier } from "@/components/DeviceIdentifier";

const Hazards = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* AI Detection Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4">
                AI RECOGNITION (BETA)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Identified Device Hazards
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Upload a photo of your device to get an AI-powered safety risk report.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="glass-card rounded-3xl p-6 hover-glow">
                <DeviceIdentifier />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-16 mt-16">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                General Waste Hazard Guide
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Understanding common toxic materials and safe handling protocols.
              </p>
            </div>

            {/* Warning Banner */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 mb-10 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm mb-0.5">Safety Notice</p>
                <p className="text-sm text-muted-foreground">
                  Improper disposal can release toxic chemicals. If you see a leaking battery, do not touch it—use gloves and place it in a sealed container immediately.
                </p>
              </div>
            </div>

            {/* Hazard Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hazards.map((hazard, index) => (
                <HazardCard
                  key={hazard.name}
                  {...hazard}
                  delay={`${index * 0.05}s`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hazards;
