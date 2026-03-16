import { useState, useEffect, useRef } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const suggestions = [
  "Laptops in Mumbai Central",
  "Mobile recycling centers Bandra",
  "Where to dispose batteries",
  "E-waste pick up near me",
  "Computer monitor disposal Pune",
  "Recycle old printers"
];

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={containerRef}>
      <div className="relative flex items-center gap-2 p-2 bg-card rounded-2xl shadow-card border border-border group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search for recycling centers near you..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/facilities");
            }}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 hover:bg-muted rounded-full">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button
          onClick={() => navigate("/facilities")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 rounded-xl hover-scale"
        >
          <MapPin className="w-4 h-4" />
          Find Centers
        </Button>
      </div>

      {showSuggestions && query.length > 0 && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in divide-y divide-border/10">
          <div className="p-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-3 opacity-60">Smart Suggestions</p>
            <div className="space-y-1">
              {filteredSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(s);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/10 rounded-xl flex items-center gap-3 transition-all duration-200 group active:scale-[0.98]"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{s}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
