import { SearchBar } from "./SearchBar";
import { CheckCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 px-4 overflow-hidden relative mesh-gradient">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_60%)] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-up relative z-10">
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="sih-badge">
                  SIH 2024 Showcase
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-600">
                  Python AI Engine Live
                </span>
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-[0.9] mb-8 tracking-tighter">
              The Future of <br />
              <span className="text-gradient">E-Waste</span> Hub
            </h1>

            <p className="text-muted-foreground text-xl mb-12 max-w-lg leading-snug font-medium border-l-4 border-primary pl-6 py-2">
              Transforming India's e-waste crisis into a circular economy through
              <span className="text-foreground font-black"> AI-powered material identification</span> and certified recycling.
            </p>

            {/* Integrated SearchBar */}
            <div className="mb-10 w-full lg:max-w-xl">
              <SearchBar />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>ISO 14001 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Data Destruction</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
                alt="E-waste recycling facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
                <p className="text-primary-foreground font-semibold">Global Innovation Hub</p>
                <p className="text-primary-foreground/70 text-sm">Processing 50 tons daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
