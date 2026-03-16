import { Award, Shield, Leaf, CheckCircle } from "lucide-react";

const certifications = [
  { icon: Award, name: "ISO 14001", description: "Environmental Management" },
  { icon: Shield, name: "R2 Certified", description: "Responsible Recycling" },
  { icon: Leaf, name: "e-Stewards", description: "Ethical E-Waste Handling" },
  { icon: CheckCircle, name: "EPA Approved", description: "Environmental Protection" },
];

export const CertificationsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Trusted Certifications
          </h2>
          <p className="text-muted-foreground">
            Our facilities meet the highest environmental standards
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <cert.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
