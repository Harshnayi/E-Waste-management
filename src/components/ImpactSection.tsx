import { StatCard } from "./StatCard";

const stats = [
  { value: "1.4M", label: "Devices Recycled" },
  { value: "820k", label: "CO2 Reduced (KG)" },
  { value: "15k", label: "Active Partners" },
  { value: "94%", label: "Recovery Rate" },
];

export const ImpactSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Impact Report
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Together, we're making a measurable difference in reducing electronic waste and protecting our environment.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={`${0.1 + index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
