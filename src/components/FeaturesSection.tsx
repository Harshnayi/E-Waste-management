import { FeatureCard } from "./FeatureCard";
import { Award, ShieldCheck, LineChart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "ISO 14001 Certified",
    description: "Internationally recognized environmental management standards",
  },
  {
    icon: ShieldCheck,
    title: "Data Destruction",
    description: "Secure and certified data wiping for all devices",
  },
  {
    icon: LineChart,
    title: "AI-Driven Tracking",
    description: "Real-time impact monitoring and analytics",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={`${0.1 + index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
