import { Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const StickyRewards = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <Link
            to="/rewards"
            className="fixed bottom-24 right-6 z-40 group flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1 active:scale-95 animate-fade-up"
        >
            <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 leading-none">Your Credits</span>
                <span className="text-sm font-bold leading-none mt-1">{user.carbonCredits?.toLocaleString() || 0} PTS</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Award className="w-5 h-5" />
            </div>
        </Link>
    );
};
