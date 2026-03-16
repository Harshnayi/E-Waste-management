import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Eye, Users, Mail, Phone, MapPin, Leaf, Recycle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-emerald-light text-primary rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Making E-Waste Recycling Accessible
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to create a sustainable future by connecting people with responsible e-waste recycling solutions.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card-elevated rounded-2xl p-8 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-emerald-light flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize e-waste management by providing accessible, transparent, and rewarding recycling solutions. We aim to reduce electronic waste in landfills by 50% by 2030 through community engagement and innovative technology.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Recycle className="w-5 h-5" />
                  <span className="text-sm font-medium">1.4M+ Devices Recycled</span>
                </div>
              </div>
            </div>

            <div className="card-elevated rounded-2xl p-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every electronic device is recycled responsibly, where communities are empowered with knowledge about e-waste, and where sustainable practices are the norm rather than the exception.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-500">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">50+ Countries Impacted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Core Values</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Every decision we make prioritizes environmental impact and long-term sustainability.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in the power of collective action to create meaningful change.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Open communication about our processes, impact, and goals.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Leadership Team</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { name: "Sarah Chen", role: "CEO & Co-Founder", image: "SC" },
                { name: "Michael Rivera", role: "CTO", image: "MR" },
                { name: "Dr. Emily Watson", role: "Chief Sustainability Officer", image: "EW" },
              ].map((member, index) => (
                <div key={member.name} className="card-elevated rounded-xl p-6 text-center animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{member.image}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-elevated rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">contact@elocate.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium text-foreground">123 Green Street, San Francisco, CA 94102</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              <form className="space-y-4">
                <Input placeholder="Your Name" className="bg-muted/50" />
                <Input type="email" placeholder="Your Email" className="bg-muted/50" />
                <Textarea placeholder="Your Message" rows={4} className="bg-muted/50" />
                <Button className="w-full rounded-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
