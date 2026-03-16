import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { value: 1.4, suffix: "M", label: "DEVICES RECYCLED", progress: 85, duration: 2500 },
  { value: 820, suffix: "k", label: "CO2 REDUCED (KG)", progress: 72, duration: 2000 },
  { value: 15, suffix: "k", label: "ACTIVE PARTNERS", progress: 60, duration: 1500 },
  { value: 94, suffix: "%", label: "RECOVERY RATE", progress: 94, duration: 1000 },
];

export const StatsSection = () => {
  return (
    <section className="py-16 px-4 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center animate-fade-up hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Circular Progress */}
              <div className="relative w-24 h-24 mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${stat.progress * 2.64} 264`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={stat.duration} />
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
