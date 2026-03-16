import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    ArrowLeft,
    Smartphone,
    Laptop,
    Battery,
    Tv,
    Refrigerator,
    Plus,
    CheckCircle2,
    AlertTriangle,
    Info,
    Calendar,
    MapPin,
    Truck,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeviceIdentifier } from "@/components/DeviceIdentifier";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

import { addRecyclingRecord } from "@/lib/localAuth";

const RecycleWorkflow = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categoryInfo: Record<string, any> = {
        "smartphones-tablets": {
            name: "Smartphones & Tablets",
            icon: Smartphone,
            color: "text-blue-500",
            bg: "bg-blue-50",
            steps: ["Identify Device", "Smart Assessment", "Condition Report", "Confirmation"],
            credits: 50
        },
        "laptops-computers": {
            name: "Laptops & Computers",
            icon: Laptop,
            color: "text-purple-500",
            bg: "bg-purple-50",
            steps: ["Identify Device", "Smart Assessment", "Specs & Data", "Confirmation"],
            credits: 100
        },
        "batteries": {
            name: "Batteries",
            icon: Battery,
            color: "text-amber-500",
            bg: "bg-amber-50",
            steps: ["Safety Checklist", "Quantity", "Confirmation"],
            credits: 25
        },
        "tvs-displays": {
            name: "TVs & Displays",
            icon: Tv,
            color: "text-red-500",
            bg: "bg-red-50",
            steps: ["Device Info", "Condition", "Confirmation"],
            credits: 150
        },
        "large-appliances": {
            name: "Large Appliances",
            icon: Refrigerator,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            steps: ["Appliance Details", "Pickup Schedule", "Confirmation"],
            credits: 200
        },
        "others": {
            name: "Others",
            icon: Plus,
            color: "text-slate-600",
            bg: "bg-slate-50",
            steps: ["Item Details", "Submission", "Confirmation"],
            credits: 30
        }
    };

    const currentCategory = categoryInfo[category || "others"] || categoryInfo.others;
    const Icon = currentCategory.icon;

    const handleNext = () => setStep(step + 1);
    const handleBack = () => step > 1 ? setStep(step - 1) : navigate("/recycle");

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/log-recycle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: currentCategory.name,
                    data: formData,
                    user: user?.email || "anonymous",
                    timestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) throw new Error("Failed to log data");

            // Grant rewards locally
            if (user) {
                const newRecord = addRecyclingRecord({
                    userId: user.id,
                    deviceType: category || "other",
                    deviceName: formData.model || formData.appliance || formData.description || currentCategory.name,
                    creditsEarned: currentCategory.credits,
                    facilityName: "Surat E-Waste Hub"
                });

                toast.success(`Recycling request submitted! You earned ${currentCategory.credits} credits.`);

                // Redirect to the new tracking page
                setTimeout(() => {
                    navigate(`/tracking/${newRecord.id}`);
                }, 1500);
            } else {
                toast.success("Recycling request submitted!");
                setStep(step + 1);
            }
        } catch (err) {
            toast.error("Error submitting request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const runAssessment = (deviceName: string) => {
        setIsSubmitting(true);
        // Simulate AI Assessment
        setTimeout(() => {
            const isReusable = Math.random() > 0.4; // 60% chance reusable for newer devices
            const condition = isReusable ? "Excellent" : "Fair";
            const amount = isReusable ? "₹2,500 - ₹5,000" : "₹500 - ₹1,200";

            setFormData(prev => ({
                ...prev,
                assessment: {
                    type: isReusable ? "REUSABLE" : "RECYCLABLE",
                    grade: isReusable ? "Grade A" : "Grade C",
                    estimatedValue: amount,
                    impact: isReusable ? "Prevents 4.5kg of e-waste" : "Safe extraction of 0.5g gold/silver"
                }
            }));
            setIsSubmitting(false);
            setStep(2);
        }, 2000);
    };


    const renderStep = () => {
        // Shared Confirmation Step
        if (step === currentCategory.steps.length + 1 || step === 4) {
            return (
                <div className="text-center py-12 animate-fade-up">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Your recycling request for {currentCategory.name} has been logged. Our team will review the details and contact you for the next steps.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => navigate("/rewards")} variant="outline" className="rounded-xl px-8">
                            View My Rewards
                        </Button>
                        <Button onClick={() => navigate("/recycle")} className="rounded-xl px-8">
                            Recycle More
                        </Button>
                    </div>
                </div>
            );
        }

        // Category Specific Flows
        switch (category) {
            case "smartphones-tablets":
            case "laptops-computers":
                if (step === 1) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 text-sm text-primary">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p>Scan your device to automatically identify its model and type. Advanced AI assessment will follow.</p>
                            </div>
                            <DeviceIdentifier
                                expectedCategory={currentCategory.name}
                                onSuccess={(res) => {
                                    setFormData({ ...formData, model: res.deviceName, type: res.category });
                                    runAssessment(res.deviceName);
                                }}
                            />
                            <div className="pt-6">
                                <Button variant="ghost" onClick={handleNext} className="w-full h-12 rounded-xl text-muted-foreground italic">
                                    Skip setup if identification is not required
                                </Button>
                            </div>
                        </div>
                    );
                }
                if (step === 2) {
                    const { assessment } = formData;
                    return (
                        <div className="space-y-6 animate-fade-up">
                            {isSubmitting ? (
                                <div className="text-center py-12 space-y-4">
                                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
                                    <h3 className="text-xl font-bold">AI Assessment in Progress...</h3>
                                    <p className="text-muted-foreground">Evaluating device condition and material value.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center space-y-2 mb-6">
                                        <div className={`inline-flex px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${assessment?.type === 'REUSABLE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {assessment?.type}
                                        </div>
                                        <h3 className="text-2xl font-black">{formData.model}</h3>
                                        <p className="text-sm text-muted-foreground">{assessment?.grade}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Redeemable Value</p>
                                            <p className="text-lg font-black text-primary">{assessment?.estimatedValue}</p>
                                        </div>
                                        <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Eco Impact</p>
                                            <p className="text-xs font-bold leading-tight">{assessment?.impact}</p>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex gap-3">
                                        <Info className="w-5 h-5 text-primary shrink-0" />
                                        <p className="text-xs leading-relaxed">
                                            {assessment?.type === 'REUSABLE'
                                                ? "This device is in good condition and will be refurbished for resale."
                                                : "This device will be safely dismantled for precious metal extraction."}
                                        </p>
                                    </div>

                                    <Button onClick={handleNext} className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
                                        Continue to Condition Report
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </>
                            )}
                        </div>
                    );
                }
                return (
                    <div className="space-y-6 animate-fade-up">
                        {formData.model && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">AI Assessment Verified</p>
                                        <h4 className="font-bold text-foreground">{formData.model}</h4>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-white rounded-full text-[10px] font-black shadow-sm border border-emerald-100">
                                    {formData.assessment?.type}
                                </div>
                            </div>
                        )}
                        <div className="space-y-4">
                            <Label className="text-sm font-bold">Refined Condition (Final Check)</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {["Like New", "Good", "Cracked Screen", "Not Working"].map(c => (
                                    <Button
                                        key={c}
                                        variant={formData.condition === c ? "default" : "outline"}
                                        onClick={() => setFormData({ ...formData, condition: c })}
                                        className={`h-12 rounded-xl border-2 transition-all ${formData.condition === c ? "border-primary bg-primary/10 text-primary hover:bg-primary/20" : "hover:border-primary/50"}`}
                                    >
                                        {c}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-bold">Manual Overrides/Details</Label>
                            <Input
                                placeholder="Enter details if identification was incorrect..."
                                className="rounded-xl h-12 border-2 focus-visible:ring-primary shadow-sm"
                                value={formData.model || ""}
                                onChange={e => setFormData({ ...formData, model: e.target.value })}
                            />
                        </div>
                        <Button onClick={submitForm} disabled={isSubmitting} className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 mt-4 group">
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Confirm & Log Recycling
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </div>
                );

            case "batteries":
                if (step === 1) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                                <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-4">
                                    <AlertTriangle className="w-5 h-5" />
                                    Safety & Identification
                                </h3>
                                <p className="text-sm text-amber-900/70 mb-4">First, scan your battery or its packaging to identify the chemistry. Then follow safety guides.</p>
                            </div>
                            <DeviceIdentifier
                                expectedCategory={currentCategory.name}
                                onSuccess={(res) => {
                                    setFormData({ ...formData, type: res.deviceName });
                                    setTimeout(() => setStep(2), 2000);
                                }}
                            />
                            <div className="pt-6">
                                <Button variant="ghost" onClick={handleNext} className="w-full h-12 rounded-xl text-muted-foreground italic">
                                    Manual Input & Safety Guide
                                </Button>
                            </div>
                        </div>
                    );
                }
                if (step === 2) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                                <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-4">
                                    <AlertTriangle className="w-5 h-5" />
                                    Safety First
                                </h3>
                                <ul className="space-y-3 text-sm text-amber-900/80">
                                    <li className="flex gap-2"><span>1.</span> Tape over the battery terminals.</li>
                                    <li className="flex gap-2"><span>2.</span> Do not dispose of damaged/leaking batteries in standard bins.</li>
                                    <li className="flex gap-2"><span>3.</span> Place in a cool, dry plastic container.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <Label>Battery Type (Identified: {formData.type || "Pending"})</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["Lithium-ion", "Alkaline", "Lead-acid", "Rechargeable"].map(t => (
                                        <Button
                                            key={t}
                                            variant={formData.type === t ? "default" : "outline"}
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className="h-12 rounded-xl"
                                        >
                                            {t}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={handleNext} className="w-full h-12 rounded-xl">I've Read the Safety Guide</Button>
                        </div>
                    );
                }
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Approximate Quantity/Weight</Label>
                            <Input
                                type="text"
                                placeholder="e.g., 5 batteries or 2kg"
                                className="rounded-xl"
                                value={formData.quantity || ""}
                                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                        <Button onClick={submitForm} disabled={isSubmitting} className="w-full h-12 rounded-xl">
                            Submit Disposal Request
                        </Button>
                    </div>
                );

            case "large-appliances":
                if (step === 1) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3 text-sm text-emerald-700">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p>Scan the appliance label or the product itself for accurate identification.</p>
                            </div>
                            <DeviceIdentifier
                                expectedCategory={currentCategory.name}
                                onSuccess={(res) => {
                                    setFormData({ ...formData, appliance: res.deviceName });
                                    setTimeout(() => setStep(2), 2000);
                                }}
                            />
                            <div className="pt-6">
                                <Button variant="ghost" onClick={handleNext} className="w-full h-12 rounded-xl text-muted-foreground italic">
                                    Skip Identification
                                </Button>
                            </div>
                        </div>
                    );
                }
                if (step === 2) {
                    return (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Label>Appliance Type (Identified: {formData.appliance || "Pending"})</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["Refrigerator", "Washing Machine", "AC Unit", "Dishwasher", "Microwave"].map(a => (
                                        <Button
                                            key={a}
                                            variant={formData.appliance === a ? "default" : "outline"}
                                            onClick={() => setFormData({ ...formData, appliance: a })}
                                            className="h-12 rounded-xl"
                                        >
                                            {a}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Condition & Details</Label>
                                <Input
                                    placeholder="e.g. Broken compressor, 5 years old"
                                    className="rounded-xl"
                                    value={formData.details || ""}
                                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                                />
                            </div>
                            <Button onClick={handleNext} className="w-full h-12 rounded-xl">Continue to Logistics</Button>
                        </div>
                    );
                }
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Pick-up Address
                                </Label>
                                <Textarea
                                    placeholder="Enter full address for pickup"
                                    className="rounded-xl min-h-[100px]"
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Preferred Date
                                </Label>
                                <Input
                                    type="date"
                                    className="rounded-xl"
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3 text-sm text-emerald-700">
                            <Truck className="w-5 h-5 flex-shrink-0" />
                            <p>Bulky item pickup may require a handling fee which will be calculated after review.</p>
                        </div>
                        <Button onClick={submitForm} disabled={isSubmitting} className="w-full h-12 rounded-xl">
                            Request Professional Pickup
                        </Button>
                    </div>
                );

            case "tvs-displays":
                if (step === 1) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 text-sm text-primary">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p>Scan your TV or monitor to identify screen type and size.</p>
                            </div>
                            <DeviceIdentifier
                                expectedCategory={currentCategory.name}
                                onSuccess={(res) => {
                                    setFormData({ ...formData, type: res.deviceName });
                                    setTimeout(() => setStep(2), 2000);
                                }}
                            />
                            <div className="pt-6">
                                <Button variant="ghost" onClick={handleNext} className="w-full h-12 rounded-xl text-muted-foreground italic">
                                    Manual Input
                                </Button>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Display Details (Identified: {formData.type || "Pending"})</Label>
                            <Input
                                placeholder="e.g. 55-inch OLED, Broken glass"
                                className="rounded-xl"
                                value={formData.details || ""}
                                onChange={e => setFormData({ ...formData, details: e.target.value })}
                            />
                        </div>
                        <Button onClick={submitForm} disabled={isSubmitting} className="w-full h-12 rounded-xl">
                            Submit Recycling Request
                        </Button>
                    </div>
                );

            default:
                if (step === 1) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 text-sm text-primary">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p>You can scan any electronic item to identify it, or skip to manual input.</p>
                            </div>
                            <DeviceIdentifier
                                expectedCategory="Others"
                                onSuccess={(res) => {
                                    setFormData({ ...formData, description: res.deviceName });
                                    setTimeout(() => setStep(2), 2000);
                                }}
                            />
                            <div className="pt-6">
                                <Button variant="ghost" onClick={handleNext} className="w-full h-12 rounded-xl text-muted-foreground italic">
                                    Skip to manual description
                                </Button>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Description of Items (Detected: {formData.description || "None"})</Label>
                            <Textarea
                                placeholder="What are you recycling?"
                                className="rounded-xl"
                                value={formData.description || ""}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Estimated Quantity</Label>
                            <Input
                                placeholder="e.g., 2 units"
                                className="rounded-xl"
                                value={formData.quantity || ""}
                                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                        <Button onClick={submitForm} disabled={isSubmitting} className="w-full h-12 rounded-xl">
                            {isSubmitting ? "Submitting..." : "Submit Recycling Request"}
                        </Button>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <Button variant="ghost" onClick={handleBack} className="gap-2 -ml-4 text-muted-foreground hover:text-primary">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Button>
                        <div className="flex gap-1">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-1 w-8 rounded-full transition-colors ${step >= s ? "bg-primary" : "bg-muted"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-10 text-center">
                        <div className={`w-16 h-16 ${currentCategory.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border shadow-sm`}>
                            <Icon className={`w-8 h-8 ${currentCategory.color}`} />
                        </div>
                        <h1 className="text-3xl font-black text-foreground">
                            Recycling <span className="text-primary">{currentCategory.name}</span>
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {step <= currentCategory.steps.length ? currentCategory.steps[step - 1] : "Request Submitted"}
                        </p>
                    </div>

                    {/* Workflow Content */}
                    <div className="glass-card rounded-3xl p-8 border-primary/10 shadow-xl">
                        {renderStep()}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RecycleWorkflow;
