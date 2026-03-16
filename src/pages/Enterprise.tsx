import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building2, Package, FileText, Shield, CheckCircle, TrendingUp, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const features = [
  { icon: Package, title: "Bulk Pickup", description: "Scheduled pickups for large quantities" },
  { icon: FileText, title: "Compliance Reports", description: "EPA and state regulation documentation" },
  { icon: Shield, title: "Data Destruction", description: "NIST-compliant data wiping" },
  { icon: TrendingUp, title: "Impact Analytics", description: "Track your footprint reduction" },
];

const stats = [
  { value: "500+", label: "Enterprise Clients" },
  { value: "2M+", label: "Devices Processed" },
  { value: "99.9%", label: "Data Security" },
  { value: "24hr", label: "Response Time" },
];

const Enterprise = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Request Submitted!",
      description: "Our team will contact you within 24 hours.",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-xs font-medium mb-4">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span className="text-secondary-foreground">Enterprise Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              E-Waste Management for Enterprise
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive disposal, compliance reporting, and sustainability tracking for organizations
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-5 card-elevated rounded-xl animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-2xl font-bold text-foreground mb-0.5">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated rounded-xl p-5 text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Request Form */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Request Bulk Disposal
              </h2>
              <form onSubmit={handleSubmit} className="card-elevated rounded-2xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm mb-1.5 block">Company Name</Label>
                    <Input placeholder="Acme Inc." className="h-10" required />
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block">Contact Name</Label>
                    <Input placeholder="John Smith" className="h-10" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm mb-1.5 block">Email</Label>
                    <Input type="email" placeholder="john@company.com" className="h-10" required />
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block">Phone</Label>
                    <Input placeholder="(555) 123-4567" className="h-10" required />
                  </div>
                </div>

                <div>
                  <Label className="text-sm mb-1.5 block">Estimated Quantity</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50-100">50-100 devices</SelectItem>
                      <SelectItem value="100-500">100-500 devices</SelectItem>
                      <SelectItem value="500-1000">500-1,000 devices</SelectItem>
                      <SelectItem value="1000+">1,000+ devices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm mb-1.5 block">Device Types</Label>
                  <Textarea placeholder="e.g., 200 laptops, 150 monitors..." className="min-h-[80px]" />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </div>

            {/* Impact Report */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Sample Impact Report
              </h2>
              <div className="card-elevated rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">TechCorp Industries</p>
                    <p className="text-xs text-muted-foreground">Q4 2024 Report</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Devices Recycled</p>
                    <p className="text-2xl font-bold text-foreground">2,847</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">CO₂ Prevented</p>
                    <p className="text-2xl font-bold text-primary">42.7 tons</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Compliance Status</p>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">EPA Compliant</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  Download Report
                </Button>
              </div>

              <div className="card-elevated rounded-xl p-4 mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Need help?</p>
                  <p className="text-xs text-muted-foreground">Call our enterprise team</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  (800) 555-EWASTE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Enterprise;
