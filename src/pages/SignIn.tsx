import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate("/rewards");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen mesh-gradient font-sans">
      <Navbar />
      <main className="pt-24 pb-16 px-4 min-h-[calc(100vh-200px)] flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald/10 rounded-full blur-3xl animate-pulse" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo & SIH Badge */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <span className="sih-badge">
                Smart India Hackathon 2024
              </span>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-7 h-7 text-primary-foreground animate-float" />
              </div>
              <span className="text-2xl font-black text-foreground tracking-tight">ELocate<span className="text-primary">.</span></span>
            </Link>
            <h1 className="text-3xl font-black text-foreground mb-2 selection:bg-primary selection:text-white">Secure Access</h1>
            <p className="text-muted-foreground text-sm font-medium">Identify. Recycle. Earn Rewards.</p>
          </div>

          {/* Sign In Form */}
          <div className="glass-card rounded-[2.5rem] p-8 animate-fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Mobile Number</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email or $+91$ Mobile Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-muted/50"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-muted/50"
                    required
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => toast({ title: "Reset Link Sent", description: "If an account exists, you will receive a reset email shortly." })}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full gap-2" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
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
                onClick={() => toast({ title: "Coming Soon", description: "Google login is currently being simulated." })}
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
                onClick={() => toast({ title: "Coming Soon", description: "Apple login is currently being simulated." })}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.05 20.28c-.96.95-2.44.8-4.02 0-1.56-.81-2.53-.81-4.07 0-2.14 1.13-3.11.49-4.09-.54-2.47-2.52-2.85-7.18-1.49-9.66 1.49-2.02 3.08-3.2 4.92-3.2 1.62 0 2.42.44 3.51.44 1.1 0 1.67-.44 3.48-.44 1.78 0 3.5 1.02 4.54 2.53-3.66 1.73-3.07 6.83.69 8.32-.78 1.95-1.98 3.03-3.47 4.55zm-3.1-15.3c-.04-1.85 1.58-3.4 3.43-3.4.1 1.96-1.78 3.53-3.43 3.4z" />
                </svg>
                Apple
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/get-started" className="text-primary font-medium hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
