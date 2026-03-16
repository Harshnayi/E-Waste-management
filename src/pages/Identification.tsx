import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeviceIdentifier } from "@/components/DeviceIdentifier";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Identification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category || "Device";

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-8 gap-2 -ml-4 text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Categories
                    </Button>

                    {/* Header */}
                    <div className="mb-12 animate-fade-up">
                        <h1 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
                            Identify your <span className="text-gradient">{category}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                            Upload a clear photo of your hardware. Our AI will analyze the components,
                            detect hazardous materials, and calculate its recycling value.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="glass-card rounded-[2rem] p-8 shadow-2xl border-primary/10">
                                <DeviceIdentifier />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-card rounded-2xl p-6 bg-primary/5 border-primary/20">
                                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-primary" />
                                    Why identify?
                                </h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2 leading-relaxed">
                                        <span className="text-primary font-bold">•</span>
                                        Determine if the device contains lithium, lead, or mercury.
                                    </li>
                                    <li className="flex gap-2 leading-relaxed">
                                        <span className="text-primary font-bold">•</span>
                                        Get an instant estimate of carbon credits you'll earn.
                                    </li>
                                    <li className="flex gap-2 leading-relaxed">
                                        <span className="text-primary font-bold">•</span>
                                        Unlock safe disposal guides tailored to the hardware.
                                    </li>
                                </ul>
                            </div>

                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs text-muted-foreground leading-relaxed text-center italic">
                                    "Your contribution helps us keep over 50 million tons of toxic waste out of landfills yearly."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Identification;
