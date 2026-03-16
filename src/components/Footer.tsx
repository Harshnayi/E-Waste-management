import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Twitter, Github, Linkedin, ArrowRight, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const footerLinks = {
  Services: [
    { name: "E-Facilities", href: "/facilities" },
    { name: "Recycling Process", href: "/recycle" },
    { name: "Education Hub", href: "/education" },
    { name: "Enterprise Requests", href: "/enterprise" },
  ],
  Resources: [
    { name: "Documentation", href: "/education" },
    { name: "Hazardous Materials", href: "/hazards" },
    { name: "Rewards Program", href: "/rewards" },
    { name: "Policy & Ethics", href: "/policy" },
  ],
  Connect: [
    { name: "Help Center", href: "#" },
    { name: "Contact Support", href: "#" },
    { name: "Sustainability Report", href: "/report" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
  { icon: Github, href: "#", color: "hover:bg-slate-800" },
  { icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed successfully! Welcome to our newsletter.");
    setEmail("");
  };

  return (
    <footer className="bg-black text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ELocate</span>
            </Link>
            <p className="text-base text-slate-400 mb-8 max-w-sm leading-relaxed">
              Leading the transition to a circular economy. We provide secure, data-backed
              solutions for responsible electronic waste management and recovery.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Us</p>
                  <p className="text-sm text-slate-300">hello@elocate.sih</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Call Us</p>
                  <p className="text-sm text-slate-300">+91 (800) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest leading-none">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-primary transition-all duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & Socials Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:max-w-md">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Join our Newsletter</h4>
            <form onSubmit={handleSubscribe} className="relative group">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:ring-primary pl-4 pr-12 rounded-xl transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className={`w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 transition-all duration-300 hover:text-white ${social.color} hover:-translate-y-1 hover:shadow-lg`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 font-medium">
            © 2024 ELocate Professional SIH Edition. Empowering India's circular economy.
          </p>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <Link to="/policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/policy" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/policy" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
