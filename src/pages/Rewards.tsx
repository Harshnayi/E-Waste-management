import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaf, Trophy, Gift, TrendingUp, Crown, Medal, Star, LogIn, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getRecyclingHistory, RecyclingRecord, redeemReward, getRedemptionHistory, RedemptionRecord } from "@/lib/localAuth";
import { useToast } from "@/hooks/use-toast";
import { Ticket, Copy } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "EcoWarrior_Jane", credits: 12450, avatar: "J" },
  { rank: 2, name: "GreenTech_Mike", credits: 11200, avatar: "M" },
  { rank: 3, name: "RecycleKing", credits: 10890, avatar: "R" },
  { rank: 4, name: "EarthFirst_Sarah", credits: 9750, avatar: "S" },
  { rank: 5, name: "SustainableSteve", credits: 8920, avatar: "S" },
];

const rewards = [
  { name: "Eco Coffee Promo", credits: 100, icon: "☕", brand: "Starbucks" },
  { name: "Tree Plantation", credits: 250, icon: "🌳", brand: "Grow-Trees" },
  { name: "Biodegradable Case", credits: 500, icon: "📱", brand: "Pela Case" },
  { name: "Samsung Galaxy Discount", credits: 1500, icon: "📱", brand: "Samsung" },
  { name: "Apple Store Voucher", credits: 2000, icon: "🍏", brand: "Apple" },
  { name: "Dell Accessories Card", credits: 1200, icon: "💻", brand: "Dell" },
  { name: "HP Sustainable Paper", credits: 300, icon: "📄", brand: "HP" },
];

const deviceTypes = [
  { value: "smartphone", label: "Smartphone", credits: 50 },
  { value: "laptop", label: "Laptop", credits: 100 },
  { value: "tablet", label: "Tablet", credits: 75 },
  { value: "tv", label: "TV/Monitor", credits: 150 },
  { value: "battery", label: "Battery", credits: 25 },
  { value: "appliance", label: "Appliance", credits: 200 },
  { value: "other", label: "Other", credits: 30 },
];

const badges = [
  { id: 1, name: "Eco Starter", icon: "🌱", description: "Recycled your first device", unlocked: true },
  { id: 2, name: "Lead Buster", icon: "🛡️", description: "Recycled 5 hazardous items", unlocked: true },
  { id: 3, name: "Carbon Neutral", icon: "☁️", description: "Offset 100kg of CO2", unlocked: false },
  { id: 4, name: "Master Recycler", icon: "👑", description: "Reached 10,000 credits", unlocked: false },
];

const Rewards = () => {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { toast } = useToast();
  const [history, setHistory] = useState<RecyclingRecord[]>([]);
  const [redemptions, setRedemptions] = useState<RedemptionRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showRedemptions, setShowRedemptions] = useState(false);

  const isLoading = authLoading || profileLoading;
  const userCredits = profile?.carbonCredits ?? 0;
  const pendingCredits = profile?.pendingCredits ?? 0;
  const devicesRecycled = profile?.devicesRecycled ?? 0;
  const nextMilestone = Math.ceil((userCredits + 1) / 500) * 500;
  const progress = nextMilestone > 0 ? (userCredits / nextMilestone) * 100 : 0;


  const loadHistory = () => {
    if (user) {
      setHistory(getRecyclingHistory(user.id));
      setRedemptions(getRedemptionHistory(user.id));
      setShowHistory(true);
      setShowRedemptions(true);
    }
  };

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userCredits < reward.credits) return;

    const result = redeemReward(reward);
    if (result.success && result.record) {
      refreshUser();
      loadHistory();
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.name} from ${reward.brand}. Code: ${result.record.code}`,
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to redeem reward.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Voucher code copied to clipboard." });
  };


  // Show sign-in prompt if not authenticated
  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-elevated rounded-2xl p-12">
              <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Sign In to View Your Rewards
              </h1>
              <p className="text-muted-foreground mb-8">
                Track your carbon credits, recycling history, and redeem exclusive rewards.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sign-in">
                  <Button size="lg" className="rounded-full px-8">
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto relative">
          {/* SIH Showcase Background Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 -right-10 w-64 h-64 bg-emerald/5 rounded-full blur-3xl animate-pulse" />

          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <div className="flex justify-center mb-4">
              <span className="sih-badge">
                Verified Eco-Wallet
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-3 tracking-tighter">
              {isLoading ? "Loading Wallet..." : <span>Welcome, <span className="text-gradient">{profile?.displayName?.split(' ')[0] || 'Recycler'}</span>!</span>}
            </h1>
            <p className="text-muted-foreground font-medium text-sm uppercase tracking-widest opacity-80">
              National E-Waste Circularity Network
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12 relative z-10">
            <div className="glass-card rounded-3xl p-8 text-center animate-fade-up border-primary/30 bg-primary/10 shadow-[0_20px_50px_rgba(16,185,129,0.1)]">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Leaf className="w-8 h-8 text-primary-foreground animate-float" />
              </div>
              <p className="text-4xl font-black text-foreground mb-1 tracking-tight">
                {isLoading ? "..." : userCredits.toLocaleString()}
              </p>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Available Credits</p>
                {pendingCredits > 0 && (
                  <span className="text-[10px] text-amber-600 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                    +{pendingCredits} Pending
                  </span>
                )}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 text-center animate-fade-up border-blue-500/10" style={{ animationDelay: "0.05s" }}>
              <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Smartphone className="w-8 h-8 text-white animate-float" />
              </div>
              <p className="text-4xl font-black text-foreground mb-1 tracking-tight">
                {isLoading ? "..." : devicesRecycled}
              </p>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Devices Recycled</p>
            </div>

            <div className="glass-card rounded-3xl p-8 text-center animate-fade-up border-purple-500/10" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white animate-float" />
              </div>
              <p className="text-4xl font-black text-foreground mb-1 tracking-tight">
                {isLoading ? "..." : `${Math.round(userCredits * 0.5)}kg`}
              </p>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">CO₂ Prevented</p>
            </div>
          </div>

          {/* View History Button */}
          <div className="flex justify-center mb-10">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full gap-2"
              onClick={loadHistory}
            >
              View History
            </Button>
          </div>

          {/* Redemption History */}
          {showRedemptions && redemptions.length > 0 && (
            <div className="card-elevated rounded-2xl p-6 mb-10 border-amber-500/10 bg-amber-50/5">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" />
                Voucher Wallet
              </h2>
              <div className="space-y-3">
                {redemptions.map((red) => (
                  <div key={red.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-border">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-[10px] font-black uppercase text-muted-foreground mb-0.5 tracking-widest">{red.brand}</p>
                      <p className="font-bold text-foreground text-sm truncate">{red.rewardName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-secondary px-3 py-1 rounded text-primary font-mono text-xs font-bold">{red.code}</code>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(red.code)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">{new Date(red.redeemedAt).toLocaleDateString()}</p>
                      <p className="text-xs font-bold text-primary mt-1">Claimed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recycling History */}
          {showHistory && history.length > 0 && (
            <div className="card-elevated rounded-2xl p-6 mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Recycling History</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {history.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl group hover:bg-secondary/80 transition-all">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-bold text-foreground text-sm flex items-center gap-2 truncate">
                        {record.deviceName}
                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase shrink-0 ${record.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                          {record.status}
                        </span>
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {record.facilityName} • {new Date(record.recycledAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex flex-col items-end">
                        {record.status === 'Verified' ? (
                          <Link to={`/certificate/${record.id}`} className="text-[10px] font-black text-primary uppercase underline-offset-4 hover:underline">
                            View Certificate
                          </Link>
                        ) : (
                          <Link to={`/tracking/${record.id}`} className="text-[10px] font-black text-amber-600 uppercase underline-offset-4 hover:underline">
                            Track Live
                          </Link>
                        )}
                      </div>
                      <span className="text-sm font-bold text-primary">+{record.creditsEarned}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Medal className="w-6 h-6 text-primary" />
              Impact Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`glass-card p-6 rounded-3xl text-center transition-all duration-300 ${badge.unlocked ? 'opacity-100 hover-scale' : 'opacity-40 grayscale'}`}
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{badge.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="card-elevated rounded-2xl p-6 sm:p-8 mb-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="text-center lg:text-left">
                <p className="text-sm text-muted-foreground mb-1">Your Carbon Credits</p>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Leaf className="w-8 h-8 text-primary" />
                  <span className="text-4xl font-bold text-foreground">{userCredits.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  = {(userCredits * 0.5).toFixed(1)} kg CO₂ offset
                </p>
              </div>

              <div className="flex-1 w-full max-w-sm">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Progress to milestone</span>
                  <span className="font-medium text-foreground">{userCredits} / {nextMilestone}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Button
                className="gap-2 rounded-full px-6"
                onClick={() => {
                  const el = document.getElementById('rewards-list');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Gift className="w-4 h-4" />
                Redeem Credits
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Available Rewards */}
            <div>
              <h2 id="rewards-list" className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Available Rewards
              </h2>
              <div className="space-y-3">
                {rewards.map((reward, index) => (
                  <div
                    key={reward.name}
                    className="card-elevated rounded-xl p-4 flex items-center justify-between animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reward.icon}</span>
                      <div>
                        <p className="font-medium text-foreground text-sm">{reward.name}</p>
                        <p className="text-xs text-muted-foreground">{reward.credits} credits</p>
                      </div>
                    </div>
                    <Button
                      variant={userCredits >= reward.credits ? "default" : "outline"}
                      disabled={userCredits < reward.credits}
                      size="sm"
                      className="text-xs"
                      onClick={() => handleRedeem(reward)}
                    >
                      {userCredits >= reward.credits ? "Redeem" : "Locked"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Top Recyclers
              </h2>
              <div className="card-elevated rounded-2xl p-5">
                <div className="space-y-3">
                  {leaderboard.map((leaderUser, index) => (
                    <div
                      key={leaderUser.name}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors animate-fade-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-6 text-center">
                        {leaderUser.rank === 1 ? (
                          <Crown className="w-5 h-5 text-amber-500 mx-auto" />
                        ) : leaderUser.rank === 2 ? (
                          <Medal className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : leaderUser.rank === 3 ? (
                          <Medal className="w-5 h-5 text-amber-600 mx-auto" />
                        ) : (
                          <span className="text-xs text-muted-foreground">#{leaderUser.rank}</span>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-medium">
                        {leaderUser.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{leaderUser.name}</p>
                        <p className="text-xs text-muted-foreground">{leaderUser.credits.toLocaleString()} (Lifetime)</p>
                      </div>
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
                    <div className="w-6 text-center">
                      <span className="text-xs text-muted-foreground">#--</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {profile?.displayName?.charAt(0)?.toUpperCase() || "Y"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">You</p>
                      <p className="text-xs text-muted-foreground">{(profile?.totalCreditsEarned || 0).toLocaleString()} credits (Lifetime)</p>
                    </div>
                    <Star className="w-4 h-4 text-primary" />
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

export default Rewards;
