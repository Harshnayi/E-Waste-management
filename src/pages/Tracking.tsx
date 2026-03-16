import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    ArrowLeft,
    MapPin,
    Clock,
    Package,
    CheckCircle2,
    Truck,
    Building2,
    ShieldCheck,
    QrCode,
    Info,
    Copy,
    Gift,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRecyclingHistory, RecyclingRecord, updateRecyclingStatus } from "@/lib/localAuth";
import { toast } from "sonner";
import { Map } from "@/components/Map";

const Tracking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState<RecyclingRecord | null>(null);
    const [loading, setLoading] = useState(true);

    const copyTrackingLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success("Tracking link copied to clipboard!");
    };

    useEffect(() => {
        const history = getRecyclingHistory();
        const found = history.find(r => r.id === id || r.trackingId === id);
        if (found) {
            setRecord(found);
        } else {
            toast.error("Tracking record not found");
            navigate("/rewards");
        }
        setLoading(false);
    }, [id, navigate]);

    const stages = [
        { key: 'Requested', icon: Package, label: 'Request Placed', color: 'text-blue-500', bg: 'bg-blue-50' },
        { key: 'Pickup Assigned', icon: Clock, label: 'Pickup Assigned', color: 'text-amber-500', bg: 'bg-amber-50' },
        { key: 'In Transit', icon: Truck, label: 'In Transit', color: 'text-purple-500', bg: 'bg-purple-50' },
        { key: 'Arrived at Facility', icon: Building2, label: 'At Facility', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { key: 'Verified', icon: ShieldCheck, label: 'Verified & Credited', color: 'text-primary', bg: 'bg-primary/10' },
    ];

    const currentStageIndex = stages.findIndex(s => s.key === record?.status);

    const handleManualVerify = () => {
        const updated = updateRecyclingStatus(record.id, 'Verified');
        if (updated) {
            setRecord(updated);
            toast.success("Transaction verified! Credits added to your wallet.");
        }
    };

    // Simulation: Move stage every few seconds for demo
    useEffect(() => {
        if (record && currentStageIndex < stages.length - 1 && record.status !== 'Verified') {
            const timer = setTimeout(() => {
                const nextStatus = stages[currentStageIndex + 1].key as RecyclingRecord['status'];
                const updated = updateRecyclingStatus(record.id, nextStatus);
                if (updated) setRecord(updated);
                toast.info(`Status updated: ${stages[currentStageIndex + 1].label}`);
            }, 10000); // 10 seconds per stage for demo
            return () => clearTimeout(timer);
        }
    }, [record, currentStageIndex]);

    if (loading) return null;
    if (!record) return null;

    return (
        <div className="min-h-screen mesh-gradient font-sans">
            <Navbar />
            <main className="pt-24 pb-16 px-4 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald/5 rounded-full blur-3xl" />

                <div className="max-w-5xl mx-auto space-y-8 relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <Button variant="ghost" onClick={() => navigate("/rewards")} className="gap-2 -ml-4 mb-4 text-muted-foreground hover:text-primary transition-all font-bold">
                                <ArrowLeft className="w-4 h-4" /> Eco-Wallet
                            </Button>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="sih-badge">
                                    Surat Logistics Network
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter">Live <span className="text-gradient">Lifecycle</span> Tracking</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-muted-foreground text-xs font-bold font-mono">TRACKING ID: <span className="text-foreground tracking-widest uppercase">#{record.trackingId}</span></p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-primary"
                                    onClick={copyTrackingLink}
                                >
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {record.status !== 'Verified' ? (
                                <Button
                                    onClick={handleManualVerify}
                                    className="h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 font-black shadow-[0_10px_30px_rgba(16,185,129,0.3)] animate-float"
                                >
                                    <ShieldCheck className="w-5 h-5 mr-2" />
                                    Handover Verified
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => navigate("/rewards")}
                                    className="h-12 glass-card border-emerald-500/30 text-emerald-600 hover:bg-white rounded-2xl px-8 font-black"
                                >
                                    <Gift className="w-5 h-5 mr-2" />
                                    View Rewards
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Timeline Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="glass-card rounded-3xl p-6 border-primary/10 shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-black text-lg mb-6">Pickup Timeline</h3>
                                    <div className="space-y-8 relative">
                                        {/* Vertical Line */}
                                        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-muted z-0"></div>

                                        {stages.map((stage, index) => {
                                            const isCompleted = index <= currentStageIndex;
                                            const isActive = index === currentStageIndex;
                                            const Icon = stage.icon;

                                            return (
                                                <div key={stage.key} className={`flex gap-4 relative z-10 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-500 ${isActive ? `border-primary ${stage.bg} shadow-lg shadow-primary/20` :
                                                        isCompleted ? 'border-primary bg-primary text-white' : 'border-muted bg-background'
                                                        }`}>
                                                        <Icon className={`w-6 h-6 ${isActive ? stage.color : isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                                                    </div>
                                                    <div className="pt-1.5 flex-1">
                                                        <p className={`font-black text-sm mb-0.5 ${isActive ? 'text-primary' : 'text-foreground'}`}>{stage.label}</p>
                                                        {isActive && (
                                                            <p className="text-[10px] text-muted-foreground leading-tight animate-pulse">Running final verification checks...</p>
                                                        )}
                                                    </div>
                                                    {isCompleted && !isActive && (
                                                        <div className="pt-1.5">
                                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Security Handshake (OTP) Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <QrCode className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <h3 className="font-bold">Security Handshake</h3>
                                </div>
                                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                    Provide this OTP to the recycling agent when they arrive to verify the handover.
                                </p>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Handover OTP</p>
                                    <p className="text-4xl font-black tracking-[0.5em] text-emerald-400 pl-[0.5em]">{record.otp || '----'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map & Details Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Map */}
                            <div className="card-elevated rounded-3xl h-[400px] overflow-hidden border border-border shadow-2xl relative group">
                                <Map
                                    facilities={[]}
                                    center={[21.1702, 72.8311]}
                                    zoom={14}
                                    userLocation={[21.1856, 72.7933]}
                                />
                                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-border/50 max-w-[200px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Truck className="w-4 h-4 text-primary animate-bounce" />
                                        <span className="text-xs font-black uppercase text-primary">In Transit</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">Agent arriving at Surat E-Waste Hub in 12 mins.</p>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="glass-card rounded-3xl p-8 border-primary/10 shadow-xl flex flex-col md:flex-row gap-8 items-center">
                                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 border shadow-inner bg-secondary`}>
                                    <Package className="w-10 h-10 text-primary" />
                                </div>
                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Device</p>
                                            <p className="text-sm font-bold truncate">{record.deviceName}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Type</p>
                                            <p className="text-sm font-bold">{record.deviceType.split('-').join(' ')}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Destination</p>
                                            <p className="text-sm font-bold truncate">{record.facilityName}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Reward</p>
                                            <p className="text-sm font-bold text-primary">+{record.creditsEarned} Credits</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-2xl border border-border/50">
                                        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Sustainable recycling in progress. Precious metals extraction will begin once verified at {record.facilityName}.
                                        </p>
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

export default Tracking;
