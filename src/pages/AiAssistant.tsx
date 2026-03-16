import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeviceIdentifier } from "@/components/DeviceIdentifier";
import { RecyclingTips } from "@/components/RecyclingTips";
import { Bot, Camera, Lightbulb } from "lucide-react";

const AiAssistant = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              AI Recycling Assistant
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Use AI to identify your electronic devices and get personalized recycling recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Device Identifier */}
            <section>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Device Identifier</h2>
                  <p className="text-xs text-muted-foreground">Upload a photo to identify & get recycling info</p>
                </div>
              </div>
              <div className="card-elevated rounded-2xl p-5">
                <DeviceIdentifier />
              </div>
            </section>

            {/* Recycling Tips */}
            <section>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Smart Tips</h2>
                  <p className="text-xs text-muted-foreground">Personalized recycling recommendations</p>
                </div>
              </div>
              <div className="card-elevated rounded-2xl p-5">
                <RecyclingTips />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiAssistant;
