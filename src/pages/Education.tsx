import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Newspaper,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Scan,
  Truck,
  ShieldCheck,
  Coins,
  ChevronRight,
  AlertTriangle,
  Droplets,
  Skull,
  Globe,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

const articles = [
  {
    id: 1,
    title: "The Global E-Waste Crisis: What You Need to Know",
    excerpt: "Over 50 million tons of e-waste is generated annually, yet only 20% is properly recycled...",
    category: "Awareness",
    readTime: "5 min",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    title: "How to Prepare Your Electronics for Recycling",
    excerpt: "Before dropping off your old devices, follow these essential steps to protect your data...",
    category: "Guide",
    readTime: "3 min",
    date: "Jan 12, 2024",
  },
  {
    id: 3,
    title: "The Environmental Impact of Smartphone Production",
    excerpt: "From mining rare earth minerals to manufacturing, the true cost of your phone...",
    category: "Research",
    readTime: "7 min",
    date: "Jan 10, 2024",
  },
];

const faqs = [
  {
    question: "What is considered e-waste?",
    answer: "E-waste includes any discarded electronic or electrical devices such as computers, phones, TVs, refrigerators, and their components.",
  },
  {
    question: "Why can't I throw electronics in the regular trash?",
    answer: "Electronics contain hazardous materials like lead, mercury, and cadmium that can leach into soil and groundwater.",
  },
  {
    question: "How do I ensure my data is secure before recycling?",
    answer: "Perform a factory reset on your devices and remove any storage media. For sensitive data, use certified data destruction services.",
  },
];

const news = [
  { title: "India's New E-Waste Management Rules 2024", date: "Jan 20, 2024" },
  { title: "Surat Becomes Model City for Electronic Disposal", date: "Jan 18, 2024" },
  { title: "Hazardous Materials Found in 60% of Informal Sector Landfills", date: "Jan 15, 2024" },
];

const lifecycleSteps = [
  {
    id: 1,
    title: "Eco-Scan",
    description: "Our AI identifies the device and assesses its reusable or recyclable value.",
    icon: Scan,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: 2,
    title: "Secure Pickup",
    description: "A certified agent collects the device with a secure OTP handshake.",
    icon: Truck,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    id: 3,
    title: "Hub Verification",
    description: "Devices are verified at certified hubs in Surat to ensure safe processing.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    id: 4,
    title: "Green Rewards",
    description: "Credits are released to your wallet for brand vouchers and impact certificates.",
    icon: Coins,
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

const indiaStats = [
  { label: "Annual Waste", value: "3.2 Million Tons", detail: "3rd largest producer globally", icon: Globe },
  { label: "Recycling Rate", value: "Below 10%", detail: "Mostly handled by informal sector", icon: AlertTriangle },
  { label: "Water Poisoning", value: "High Risk", detail: "Lead & Mercury leaching in soil", icon: Droplets },
  { label: "Health Impact", value: "Cancerous Risk", detail: "Informal burning releases toxins", icon: Skull },
];

const Education = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % lifecycleSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Knowledge <span className="text-gradient hover:brightness-110 transition-all">Hub</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Empowering you with scientific insights and practical guides to lead the
              transition towards a sustainable circular economy in India.
            </p>
          </div>

          {/* Solution Lifecycle Animation */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-3 block">The Real-World Journey</span>
              <h2 className="text-3xl font-black text-foreground">Our <span className="text-primary">E-Solution</span> in Action</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                {lifecycleSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-6 rounded-[2rem] transition-all duration-500 border ${activeStep === index
                      ? "bg-white dark:bg-slate-900 border-primary shadow-xl shadow-primary/10 translate-x-4"
                      : "bg-transparent border-transparent opacity-50 grayscale hover:opacity-80"
                      }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shrink-0`}>
                        <step.icon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-foreground">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{step.description}</p>
                      </div>
                      {activeStep === index && <ChevronRight className="w-5 h-5 text-primary ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="relative aspect-square flex items-center justify-center p-8 bg-secondary/50 rounded-[3rem] border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-20"></div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="relative z-10 text-center"
                  >
                    {lifecycleSteps[activeStep] && (
                      <>
                        <div className={`w-48 h-48 rounded-[3rem] ${lifecycleSteps[activeStep].bg} flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/10`}>
                          {(() => {
                            const Icon = lifecycleSteps[activeStep].icon;
                            return <Icon className={`w-24 h-24 ${lifecycleSteps[activeStep].color} animate-pulse`} />;
                          })()}
                        </div>
                        <h4 className="text-4xl font-black text-foreground mb-4">{lifecycleSteps[activeStep].title}</h4>
                      </>
                    )}
                    <div className="flex justify-center gap-1.5">
                      {lifecycleSteps.map((_, i) => (
                        <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${activeStep === i ? "w-8 bg-primary" : "w-1.5 bg-muted"}`} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* India E-Waste Section */}
          <div className="mb-24 p-8 sm:p-12 glass-card rounded-[3rem] border-red-500/10 bg-red-500/[0.02]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200 mb-6 inline-block">
                  National Crisis
                </span>
                <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
                  India's <span className="text-red-600">Toxic Challenge</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  India is currently the **3rd largest producer** of electronic waste in the world. With over **3.2 million tons** generated annually, less than 10% is processed by the formal sector. The rest ends up in informal "burning yards" where it poisons the soil, water, and air.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {indiaStats.map((stat, i) => (
                    <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm">
                      <stat.icon className="w-5 h-5 text-red-500 mb-2" />
                      <p className="text-sm font-black text-foreground">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-border shadow-sm">
                  <h4 className="font-bold text-foreground flex items-center gap-2 mb-3">
                    <Skull className="w-5 h-5 text-red-500" />
                    Environmental Harms
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-red-500 mt-1.5"></span>
                      **Leachate Contamination**: Lead and Cadmium seep into groundwater during monsoons.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-red-500 mt-1.5"></span>
                      **Atmospheric Toxins**: Open burning releases Brominated Flame Retardants & Dioxins.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-red-500 mt-1.5"></span>
                      **Informal Sector Risk**: Over 1 million children are exposed to toxins while dismantling.
                    </li>
                  </ul>
                </div>
                <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20">
                  <h4 className="font-bold text-primary flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5" />
                    The E-Locate Solution
                  </h4>
                  <p className="text-xs text-primary/80 leading-relaxed font-medium">
                    We bridge the gap by connecting individuals directly with **Certified Facilities**. By formalizing the collection process via our app, we ensure that hazardous metals are extracted in controlled environments, preventing 99% of toxic emissions compared to informal methods.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Articles */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  Featured Learning
                </h2>
                <div className="space-y-6">
                  {articles.map((article, index) => (
                    <article
                      key={article.id}
                      onClick={() => navigate("/hazards")}
                      className="glass-card rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 animate-fade-up group hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
                          {article.category}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{article.readTime} read</span>
                      </div>
                      <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed font-medium">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{article.date}</span>
                        <div className="flex items-center gap-2 text-primary font-bold text-xs group-hover:gap-3 transition-all">
                          READ ARTICLE <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="animate-fade-up">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  Core Knowledge
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="glass-card rounded-2xl px-6 border-0 shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="text-left py-5 hover:no-underline hover:text-primary transition-colors font-bold text-foreground">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6 leading-relaxed font-medium">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8 animate-fade-up">
              {/* News */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-primary" />
                  </div>
                  Industry Feed
                </h2>
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  {news.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate("/")}
                      className="pb-5 border-b border-border/10 last:border-0 last:pb-0 group cursor-pointer"
                    >
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                        {item.title}
                      </p>
                      <p className="text-[10px] font-black text-muted-foreground mt-2 uppercase tracking-widest opacity-60">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-card rounded-2xl p-6 bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20">
                <h3 className="text-sm font-black text-primary mb-6 flex items-center gap-3 uppercase tracking-widest">
                  <TrendingUp className="w-5 h-5" />
                  Impact Metrics
                </h3>
                <div className="space-y-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Annual Waste</span>
                    <span className="text-2xl font-black text-foreground tabular-nums">53.6M <span className="text-xs text-primary/60">TONS</span></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Recovery Success</span>
                    <span className="text-2xl font-black text-emerald-500 tabular-nums">17.4% <span className="text-xs opacity-60">AVG</span></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Material Value</span>
                    <span className="text-2xl font-black text-foreground tabular-nums">$57B <span className="text-xs text-primary/60">USD</span></span>
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

export default Education;
