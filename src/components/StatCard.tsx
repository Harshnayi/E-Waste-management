interface StatCardProps {
  value: string;
  label: string;
  delay?: string;
}

export const StatCard = ({ value, label, delay = "0s" }: StatCardProps) => {
  return (
    <div 
      className="text-center p-6 animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
        {value}
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};
