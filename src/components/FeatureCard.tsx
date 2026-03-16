import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = "0s" }: FeatureCardProps) => {
  return (
    <div 
      className="glass-card rounded-2xl p-6 hover:shadow-hover transition-all duration-300 animate-fade-up group"
      style={{ animationDelay: delay }}
    >
      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};
