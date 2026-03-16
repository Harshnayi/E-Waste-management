import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { getCurrentUser, updateUser as localUpdateUser, User } from "@/lib/localAuth";

export const useProfile = () => {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfile(getCurrentUser());
    } else {
      setProfile(null);
    }
    setLoading(false);
  }, [user]);

  const updateProfile = async (updates: Partial<User>) => {
    const updated = localUpdateUser(updates);
    if (updated) {
      setProfile(updated);
      refreshUser();
      return { error: null };
    }
    return { error: new Error("Failed to update profile") };
  };

  return { profile, loading, updateProfile };
};
