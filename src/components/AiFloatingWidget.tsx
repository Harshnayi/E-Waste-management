import { useState } from "react";
import { Bot, X, Camera, Lightbulb } from "lucide-react";
import { DeviceIdentifier } from "./DeviceIdentifier";
import { RecyclingTips } from "./RecyclingTips";

type TabKey = "identify" | "tips";

export const AiFloatingWidget = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("identify");

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: "identify", label: "Identify", icon: Camera },
    { key: "tips", label: "Tips", icon: Lightbulb },
  ];

  return (
    <>
      {/* FAB Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary/70 rounded-full animate-pulse" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">ELocate AI</h3>
                <p className="text-[11px] text-muted-foreground">Smart recycling assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "identify" && <DeviceIdentifier />}
            {activeTab === "tips" && <RecyclingTips />}
          </div>
        </div>
      )}
    </>
  );
};
