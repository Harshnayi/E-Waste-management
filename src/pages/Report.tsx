import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Camera, MapPin, AlertTriangle, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    location: "",
    wasteType: "",
    description: "",
    email: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Report Submitted!",
      description: "We'll investigate within 48 hours.",
    });
    setIsSubmitting(false);
    setFormData({ location: "", wasteType: "", description: "", email: "" });
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Report Illegal Dumping
            </h1>
            <p className="text-muted-foreground">
              Help protect your community by reporting illegal e-waste disposal
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              All reports are reviewed within 48 hours. Your identity remains anonymous.
            </p>
          </div>

          {/* Report Form */}
          <form onSubmit={handleSubmit} className="card-elevated rounded-2xl p-6">
            <div className="space-y-5">
              {/* Photo Upload */}
              <div>
                <Label className="text-sm text-foreground mb-2 block">Photo Evidence</Label>
                {uploadedImage ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={uploadedImage} alt="Evidence" className="w-full h-40 object-cover" />
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2 w-6 h-6 bg-foreground/80 text-background rounded-full text-sm hover:bg-foreground"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Uploaded
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all">
                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-sm text-foreground mb-2 block">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter address or describe location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10 h-10"
                    required
                  />
                </div>
              </div>

              {/* Waste Type */}
              <div>
                <Label className="text-sm text-foreground mb-2 block">Type of E-Waste</Label>
                <Select
                  value={formData.wasteType}
                  onValueChange={(value) => setFormData({ ...formData, wasteType: value })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computers">Computers & Laptops</SelectItem>
                    <SelectItem value="phones">Phones & Tablets</SelectItem>
                    <SelectItem value="tvs">TVs & Monitors</SelectItem>
                    <SelectItem value="batteries">Batteries</SelectItem>
                    <SelectItem value="mixed">Mixed E-Waste</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm text-foreground mb-2 block">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you observed..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm text-foreground mb-2 block">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="For updates on your report"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10"
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;
