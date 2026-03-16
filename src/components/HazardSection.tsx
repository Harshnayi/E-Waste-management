import { Smartphone, Monitor, Battery } from "lucide-react";

const hazards = [
  {
    icon: Smartphone,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    title: "Mobile Devices",
    description: "Logic boards in smartphones often contain Lead, Mercury, and Cadmium. Proper extraction is critical to prevent soil contamination.",
    risk: "HIGH TOXICITY RISK",
    riskColor: "text-red-500",
  },
  {
    icon: Monitor,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    title: "Computing Units",
    description: "Plastic casings in older laptops may contain brominated flame retardants. Screens contain mercury that requires specialized handling.",
    risk: "MEDIUM TOXICITY RISK",
    riskColor: "text-amber-500",
  },
  {
    icon: Battery,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    title: "Power Storage",
    description: "Lithium-ion batteries pose severe fire hazards and chemical leak risks if punctured or improperly processed in landfills.",
    risk: "CRITICAL HANDLING",
    riskColor: "text-purple-500",
  },
];

export const HazardSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Hazard Identification
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understand the environmental impact of electronic components. Our platform automatically categorizes risks based on device type.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {hazards.map((hazard, index) => (
            <div
              key={hazard.title}
              className="card-elevated rounded-2xl p-6 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${hazard.iconBg} flex items-center justify-center mb-5`}>
                <hazard.icon className={`w-6 h-6 ${hazard.iconColor}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {hazard.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {hazard.description}
              </p>
              
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${hazard.riskColor.replace('text-', 'bg-')}`} />
                <span className={`text-xs font-medium ${hazard.riskColor}`}>
                  {hazard.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
