import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { NetworkRewardsSection } from "@/components/NetworkRewardsSection";
import { HazardSection } from "@/components/HazardSection";
import { StatsSection } from "@/components/StatsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <NetworkRewardsSection />
        <HazardSection />
        <StatsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
