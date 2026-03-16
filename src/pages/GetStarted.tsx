import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Mail, Lock, User, ArrowRight, Check, Loader2, AlertCircle, Eye, EyeOff, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const GetStarted = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    if (!mobileNumber) {
      toast({
        title: "Missing Information",
        description: "Mobile number is required for registration.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, name, mobileNumber);

    if (error) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created!",
        description: "Welcome to ELocate. Start your recycling journey!",
      });
      navigate("/rewards");
    }

    setLoading(false);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setPasswordStrength(score);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-emerald-500";
      default: return "bg-muted";
    }
  };

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "Too brief";
    }
  };

  const benefits = [
    "Track your recycling impact",
    "Earn carbon credits",
    "Find nearby facilities",
    "Real-time eco-analytics",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Benefits */}
            <div className="hidden md:block">
              <span className="inline-block px-3 py-1 bg-emerald-light text-primary rounded-full text-sm font-medium mb-4">
                Join ELocate
              </span>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Start Your Sustainable Journey Today
              </h1>
              <p className="text-muted-foreground mb-8">
                Join thousands of eco-conscious individuals making a difference through responsible e-waste recycling.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-light flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-secondary rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">JD</span>
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      "ELocate made recycling so easy! I've already earned 500 carbon credits."
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">— Jane Doe, Member since 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="w-full max-w-md mx-auto">
              {/* Mobile Header */}
              <div className="text-center mb-8 md:hidden">
                <Link to="/" className="inline-flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-semibold text-foreground">ELocate</span>
                </Link>
                <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
                <p className="text-muted-foreground">Start your recycling journey</p>
              </div>

              {/* Desktop Header */}
              <div className="hidden md:block text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
                <p className="text-muted-foreground">Free forever. No credit card required.</p>
              </div>

              {/* Demo Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800">
                  <strong>Demo Mode:</strong> Data is stored locally in your browser. Complete your profile to earn badges!
                </p>
              </div>

              <div className="card-elevated rounded-2xl p-8 animate-fade-up">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-muted/50"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-muted/50"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="pl-10 bg-muted/50"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          calculateStrength(e.target.value);
                        }}
                        className="pl-10 pr-10 bg-muted/50"
                        required
                        minLength={4}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Password Strength</span>
                          <span className={`text-[10px] font-bold uppercase ${passwordStrength > 2 ? "text-emerald-600" : "text-amber-600"}`}>
                            {getStrengthLabel()}
                          </span>
                        </div>
                        <div className="h-1 w-full bg-muted rounded-full overflow-hidden flex gap-1">
                          {[1, 2, 3, 4].map((s) => (
                            <div
                              key={s}
                              className={`h-full flex-1 transition-all duration-500 ${passwordStrength >= s ? getStrengthColor() : "bg-transparent"}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">Must be at least 4 characters</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-0.5"
                      disabled={loading}
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the{" "}
                      <Link to="/policy" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full rounded-full gap-2" disabled={!agreeTerms || loading}>
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Create Account <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="rounded-xl gap-2 h-11"
                    onClick={() => toast({ title: "Coming Soon", description: "Google signup is currently being simulated." })}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="rounded-xl gap-2 h-11"
                    onClick={() => toast({ title: "Coming Soon", description: "Apple signup is currently being simulated." })}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M17.05 20.28c-.96.95-2.44.8-4.02 0-1.56-.81-2.53-.81-4.07 0-2.14 1.13-3.11.49-4.09-.54-2.47-2.52-2.85-7.18-1.49-9.66 1.13-2.02 3.08-3.2 4.92-3.2 1.62 0 2.42.44 3.51.44 1.1 0 1.67-.44 3.48-.44 1.78 0 3.5 1.02 4.54 2.53-3.66 1.73-3.07 6.83.69 8.32-.78 1.95-1.98 3.03-3.47 4.55zm-3.1-15.3c-.04-1.85 1.58-3.4 3.43-3.4.1 1.96-1.78 3.53-3.43 3.4z" />
                    </svg>
                    Apple
                  </Button>
                </div>

                {/* Sign In Link */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
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

export default GetStarted;
