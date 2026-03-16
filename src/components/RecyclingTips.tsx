import { useState, useEffect } from "react";
import { Leaf, Recycle, Zap, Heart, Shield, Star, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  leaf: Leaf,
  recycle: Recycle,
  zap: Zap,
  heart: Heart,
  shield: Shield,
  star: Star,
};

const categoryColors: Record<string, string> = {
  beginner: "bg-blue-100 text-blue-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-purple-100 text-purple-700",
  "fun-fact": "bg-primary/10 text-primary",
};

interface Tip {
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface TipsResponse {
  tips: Tip[];
  motivationalMessage: string;
}

export const RecyclingTips = () => {
  const [tips, setTips] = useState<TipsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();

  const fetchTips = async () => {
    setLoading(true);
    try {
      let data;

      if (supabase) {
        try {
          const { data: responseData, error } = await supabase.functions.invoke("recycling-tips", {
            body: {
              context: {
                devicesRecycled: profile?.devicesRecycled || 0,
                currentPage: location.pathname.replace("/", "") || "home",
                recentDevices: [],
              },
            },
          });
          if (!error && responseData && !responseData.error) {
            data = responseData;
          }
        } catch (supaErr) {
          console.warn("Supabase tips function failed, falling back to local simulation:", supaErr);
        }
      }

      if (!data) {
        // Mock tips for fallbacks
        data = {
          motivationalMessage: profile?.displayName
            ? `Keep going, ${profile.displayName.split(' ')[0]}! You've already recycled ${profile.devicesRecycled} items.`
            : "Every small action counts towards a greener planet!",
          tips: [
            {
              title: "Battery Terminal Safety",
              description: "Always tape over battery terminals before recycling to prevent accidental short circuits or fires.",
              icon: "shield",
              category: "beginner"
            },
            {
              title: "Data Sanitization",
              description: "Perform a 'Factory Reset' multiple times or use specialized software to wipe SSDs/HDDs before disposal.",
              icon: "zap",
              category: "intermediate"
            },
            {
              title: "Precious Metals Recovery",
              description: "Did you know that 1 ton of mobile phone circuits contains 40 times more gold than 1 ton of gold ore?",
              icon: "star",
              category: "fun-fact"
            },
            {
              title: "Eco-Friendly Upgrades",
              description: "Consider RAM or SSD upgrades before replacing a slow laptop; often these fixes double the device's lifespan.",
              icon: "leaf",
              category: "advanced"
            }
          ]
        };
      }

      setTips(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load tips. Try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTips();
  }, []);

  if (loading && !tips) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Generating personalized tips...</p>
      </div>
    );
  }

  if (!tips) return null;

  return (
    <div className="space-y-5">
      {/* Motivational Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-foreground font-medium">{tips.motivationalMessage}</p>
      </div>

      {/* Tips */}
      <div className="space-y-3">
        {tips.tips.map((tip, i) => {
          const Icon = iconMap[tip.icon] || Leaf;
          return (
            <div
              key={i}
              className="card-elevated rounded-xl p-4 animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{tip.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${categoryColors[tip.category] || categoryColors["fun-fact"]}`}>
                      {tip.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Refresh */}
      <Button
        onClick={fetchTips}
        disabled={loading}
        variant="outline"
        className="w-full rounded-full"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4 mr-2" />
        )}
        Get New Tips
      </Button>
    </div>
  );
};
