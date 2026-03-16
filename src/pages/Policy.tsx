import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, FileText, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Policy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-emerald-light text-primary rounded-full text-sm font-medium mb-4">
              Legal & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Policies & Compliance
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Learn about our commitment to responsible e-waste management and data protection
            </p>
          </div>

          {/* Policy Tabs */}
          <Tabs defaultValue="compliance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="compliance" className="gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="terms" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Terms</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="space-y-6">
              <div className="card-elevated rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Regulatory Compliance</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ELocate is committed to full compliance with all applicable e-waste regulations and environmental laws. Our operations adhere to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>EPA Resource Conservation and Recovery Act (RCRA)</li>
                    <li>State-specific e-waste disposal regulations</li>
                    <li>R2 (Responsible Recycling) certification standards</li>
                    <li>e-Stewards certification requirements</li>
                    <li>ISO 14001 Environmental Management Standards</li>
                  </ul>
                </div>
              </div>

              <div className="card-elevated rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Data Destruction Compliance</h3>
                <p className="text-muted-foreground mb-4">
                  All electronic devices containing data storage are processed according to NIST 800-88 guidelines for media sanitization. We provide certificates of destruction upon request.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">NIST</p>
                    <p className="text-xs text-muted-foreground">800-88 Compliant</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">DoD</p>
                    <p className="text-xs text-muted-foreground">5220.22-M Standard</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">HIPAA</p>
                    <p className="text-xs text-muted-foreground">Compliant Disposal</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="card-elevated rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Privacy Policy</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Last Updated:</strong> January 2026</p>
                  
                  <h4 className="font-semibold text-foreground">Information We Collect</h4>
                  <p>
                    We collect information you provide directly, including name, email address, phone number, and location data when using our facility locator services.
                  </p>

                  <h4 className="font-semibold text-foreground">How We Use Your Information</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>To provide and improve our recycling services</li>
                    <li>To process your recycling requests and rewards</li>
                    <li>To send you updates about nearby facilities and promotions</li>
                    <li>To comply with legal obligations</li>
                  </ul>

                  <h4 className="font-semibold text-foreground">Data Security</h4>
                  <p>
                    We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-6">
              <div className="card-elevated rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Terms of Service</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Effective Date:</strong> January 2026</p>
                  
                  <h4 className="font-semibold text-foreground">1. Acceptance of Terms</h4>
                  <p>
                    By accessing or using ELocate services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                  </p>

                  <h4 className="font-semibold text-foreground">2. Service Description</h4>
                  <p>
                    ELocate provides an electronic waste location and recycling service platform, connecting users with certified e-waste recycling facilities.
                  </p>

                  <h4 className="font-semibold text-foreground">3. User Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide accurate information about items for recycling</li>
                    <li>Remove personal data from devices before recycling</li>
                    <li>Follow facility guidelines for drop-off procedures</li>
                    <li>Not dispose of prohibited or hazardous materials</li>
                  </ul>

                  <h4 className="font-semibold text-foreground">4. Rewards Program</h4>
                  <p>
                    Carbon credits and rewards are subject to program terms. Credits have no cash value and may expire. ELocate reserves the right to modify the rewards program.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Policy;
