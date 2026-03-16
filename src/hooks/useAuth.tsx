import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  getCurrentUser,
  signUp as localSignUp,
  signIn as localSignIn,
  signOut as localSignOut,
  updateUser,
} from "@/lib/localAuth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string, mobileNumber?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    refreshUser();
    setLoading(false);

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = () => {
      refreshUser();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signUp = async (email: string, password: string, displayName?: string, mobileNumber?: string) => {
    const result = localSignUp(email, password, displayName || email, mobileNumber);
    if (result.success && result.user) {
      setUser(result.user);
      return { error: null };
    }
    return { error: new Error(result.error || "Sign up failed") };
  };

  const signIn = async (email: string, password: string) => {
    const result = localSignIn(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      return { error: null };
    }
    return { error: new Error(result.error || "Sign in failed") };
  };

  const signOut = async () => {
    localSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
