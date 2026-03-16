import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Smartphone, Laptop, Battery, Tv, Refrigerator, Printer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  name: string;
  description: string;
  items: string[];
  delay?: string;
}

const CategoryCard = ({ icon: Icon, iconBg, iconColor, name, description, items, delay = "0s" }: CategoryCardProps) => {
  const navigate = useNavigate();
  const categorySlug = name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  return (
    <div
      className="card-elevated rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-fade-up group flex flex-col h-full"
      style={{ animationDelay: delay }}
    >
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-auto space-y-3">
        <Button
          onClick={() => navigate(`/recycle/${categorySlug}`)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 font-bold shadow-lg shadow-primary/20"
        >
          START RECYCLE
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/facilities")}
          className="w-full gap-1 text-primary group-hover:gap-2 transition-all font-semibold"
        >
          View Nearby Centers <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const categories = [
  {
    icon: Smartphone,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    name: "Smartphones & Tablets",
    description: "Recycle your old mobile devices responsibly and earn rewards.",
    items: ["iPhones", "Android Phones", "iPads", "Tablets", "Smartwatches"],
  },
  {
    icon: Laptop,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    name: "Laptops & Computers",
    description: "Safely dispose of computers with secure data destruction.",
    items: ["Laptops", "Desktops", "Monitors", "Keyboards", "Mice"],
  },
  {
    icon: Battery,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    name: "Batteries",
    description: "Proper battery disposal prevents environmental contamination.",
    items: ["Lithium-ion", "Alkaline", "Lead-acid", "NiMH", "Button Cells"],
  },
  {
    icon: Tv,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    name: "TVs & Displays",
    description: "Recycle screens and displays containing hazardous materials.",
    items: ["LED TVs", "LCD Monitors", "CRT TVs", "Projectors", "Displays"],
  },
  {
    icon: Refrigerator,
    iconBg: "bg-emerald-light",
    iconColor: "text-primary",
    name: "Large Appliances",
    description: "Schedule pickup for large household appliances (AC, Fridge, etc).",
    items: ["Refrigerators", "Washers", "Dishwashers", "AC Units", "Dryers"],
  },
  {
    icon: Printer,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    name: "Others",
    description: "Recycle miscellaneous electronics and office equipment.",
    items: ["Printers", "Scanners", "Cables", "Keyboards", "Small gadgets"],
  },
];

import { useNavigate } from "react-router-dom";

const Recycle = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
              Recycle Categories
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Ready to <span className="text-gradient hover:brightness-110 transition-all">Impact?</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Select a category below to discover smart recycling methods and locate the
              nearest certified facilities in your area.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.name}
                {...category}
                delay={`${index * 0.05}s`}
              />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recycle;
