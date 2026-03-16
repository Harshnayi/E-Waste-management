import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    ArrowLeft,
    Download,
    Share2,
    Award,
    ShieldCheck,
    Leaf,
    QrCode,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRecyclingHistory, RecyclingRecord, getCurrentUser } from "@/lib/localAuth";
import { toast } from "sonner";

const ImpactCertificate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState<RecyclingRecord | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const history = getRecyclingHistory();
        const found = history.find(r => r.id === id || r.trackingId === id);
        const currentUser = getCurrentUser();

        if (found && found.status === 'Verified') {
            setRecord(found);
            setUser(currentUser);
        } else if (found && found.status !== 'Verified') {
            toast.error("Certificate is only available after verification.");
            navigate(`/tracking/${found.id}`);
        } else {
            toast.error("Record not found.");
            navigate("/rewards");
        }
    }, [id, navigate]);

    const handleDownload = () => {
        toast.success("Downloading Certificate...");
        // Future: Use html2canvas or similar for real download
    };

    if (!record || !user) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => navigate("/rewards")} className="gap-2 text-muted-foreground hover:text-primary">
                            <ArrowLeft className="w-4 h-4" /> Back to Rewards
                        </Button>
                        <div className="flex gap-3">
                            <Button onClick={handleDownload} className="gap-2 rounded-2xl shadow-lg shadow-primary/20">
                                <Download className="w-4 h-4" /> Download PDF
                            </Button>
                            <Button variant="outline" className="gap-2 rounded-2xl">
                                <Share2 className="w-4 h-4" /> Share
                            </Button>
                        </div>
                    </div>

                    {/* Certificate Frame */}
                    <div className="bg-white rounded-[2rem] p-1 shadow-2xl border-8 border-primary/5">
                        <div className="border-2 border-primary/20 rounded-[1.8rem] p-10 md:p-16 space-y-12 text-center relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

                            {/* Logo & Header */}
                            <div className="space-y-4">
                                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
                                    <Award className="w-10 h-10 text-primary" />
                                </div>
                                <h1 className="text-4xl font-black text-foreground tracking-tight">Environmental Impact <span className="text-primary italic">Statement</span></h1>
                                <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-sm">Certificate of Sustainable Recycling</p>
                            </div>

                            {/* Recipient */}
                            <div className="space-y-3">
                                <p className="text-muted-foreground">This is to certify that</p>
                                <h2 className="text-3xl font-black border-b-2 border-slate-100 pb-2 inline-block px-12">{user.displayName}</h2>
                            </div>

                            {/* Achievement details */}
                            <div className="grid md:grid-cols-2 gap-8 text-left max-w-xl mx-auto">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                                        <Leaf className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400">Resource Recycled</p>
                                        <p className="text-lg font-bold">{record.deviceName}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400">Carbon offset</p>
                                        <p className="text-lg font-bold">{record.creditsEarned * 0.5} kg CO₂</p>
                                    </div>
                                </div>
                            </div>

                            {/* Validation Footer */}
                            <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100">
                                <div className="text-left space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <p className="text-sm font-bold text-slate-600">Issued: {new Date(record.recycledAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Tracking ID: #{record.trackingId}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100/50">
                                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                                        <QrCode className="w-12 h-12 text-slate-900" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Verified Asset</p>
                                        <p className="text-[9px] text-slate-400 leading-tight">Secured and validated by E-Locator Sustainability Network.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ImpactCertificate;
