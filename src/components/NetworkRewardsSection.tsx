import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Settings2, Award } from "lucide-react";
import { Map } from "./Map";
import { useState, useEffect } from "react";

const mockSmallFacilities = [
  { id: 1, name: "Eco Hub", address: "Mumbai Central", lat: 18.9696, lng: 72.8193, rating: 4.8 },
  { id: 2, name: "Green Recyclers", address: "Bandra West", lat: 19.0596, lng: 72.8295, rating: 4.6 },
];

export const NetworkRewardsSection = () => {
  return (
    <section className="py-20 px-4 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="animate-fade-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Network & <span className="text-gradient">Rewards</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg font-medium leading-relaxed">
              Unlock the power of your impact. Track your carbon offsets, earn corporate-grade credits,
              and redeem them for premium rewards across our global ecosystem.
            </p>
          </div>
          <Link to="/facilities" className="inline-flex items-center gap-2 text-primary font-bold mt-6 md:mt-0 hover:gap-3 transition-all animate-fade-in group px-6 py-3 bg-primary/5 rounded-full">
            Explore Full Network
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Card */}
          <div className="lg:col-span-2 card-elevated rounded-3xl overflow-hidden border border-border/50 shadow-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="p-6 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Nearby Facilities
                </p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">REAL-TIME DISCOVERY ACTIVE</p>
              </div>
              <Link to="/facilities">
                <Button variant="ghost" size="sm" className="font-bold text-xs gap-2 rounded-xl">
                  <Settings2 className="w-4 h-4" />
                  EXPAND
                </Button>
              </Link>
            </div>
            <div className="h-80 relative">
              <Map facilities={mockSmallFacilities as any} zoom={12} center={[19.0176, 72.8561]} />
              <div className="absolute top-4 right-4 z-10">
                <div className="glass-card px-4 py-2 rounded-xl text-xs font-bold text-primary flex items-center gap-2 shadow-xl border-primary/20 animate-pulse">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  LIVE DATA FEED
                </div>
              </div>
            </div>
          </div>

          {/* Credits Card */}
          <div className="card-elevated rounded-3xl p-8 border border-border/50 shadow-2xl relative overflow-hidden animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none mb-1 text-primary/60">YOUR TIER</p>
                <p className="text-xl font-black text-foreground">Gold Partner</p>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-sm font-bold text-muted-foreground mb-2 flex items-center gap-2">
                Available Carbon Credits
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-foreground tracking-tighter">4,850</span>
                <span className="text-lg font-bold text-primary/60 uppercase tracking-widest">pts</span>
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between mb-8 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xl">
                  🎫
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Equipment Rebate</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Valid for Q3 2024</p>
                </div>
              </div>
              <Button size="sm" className="rounded-lg h-8 px-4 font-black text-[10px] tracking-widest bg-primary hover:bg-primary/90">
                CLAIM
              </Button>
            </div>

            <Link to="/rewards">
              <Button className="w-full h-14 rounded-2xl font-black text-sm tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all">
                REDEEM CREDITS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
