import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";

export const RewardsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Start Earning Rewards Today
            </h2>
            
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Recycle your electronics responsibly and earn carbon credits that can be redeemed for exclusive benefits.
            </p>
            
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-hover transition-all duration-300 gap-2 px-8">
              View Rewards Program
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
