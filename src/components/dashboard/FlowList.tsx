import { useState } from "react";
import {
  Search,
  List,
  LayoutGrid,
  Plus,
  MoreHorizontal,
  Lock,
  GitBranch,
  Shield,
  MessageSquare,
  Network,
  Workflow,
} from "lucide-react";

type FlowCategory = "risk" | "recommend" | "chatbot" | "workflow";

interface Flow {
  id: string;
  name: string;
  description: string;
  editedAgo: string;
  isProtected: boolean;
  category: FlowCategory;
  icon: "branch" | "shield" | "chat" | "network" | "workflow";
}

const flows: Flow[] = [
  { id: "1", name: "Simple Agent (1)", description: "Basic agent workflow", editedAgo: "3 days ago", isProtected: false, category: "workflow", icon: "workflow" },
  { id: "2", name: "Basic Prompting", description: "Prompt engineering template", editedAgo: "4 days ago", isProtected: false, category: "workflow", icon: "network" },
  { id: "3", name: "LAP - Credit Risk Flow v1.0", description: "Credit risk decision engine", editedAgo: "13 days ago", isProtected: true, category: "risk", icon: "branch" },
  { id: "4", name: "CC Recommendation - Conversation Flow v2.2", description: "Customer conversation recommender", editedAgo: "13 days ago", isProtected: true, category: "recommend", icon: "branch" },
  { id: "5", name: "CC Recommendation - Customer Cluster GEN v1.0", description: "Customer segmentation cluster", editedAgo: "13 days ago", isProtected: true, category: "recommend", icon: "network" },
  { id: "6", name: "Motor Insurance - Underwriting Risk Model v1.0", description: "Underwriting risk assessment", editedAgo: "13 days ago", isProtected: true, category: "risk", icon: "shield" },
  { id: "7", name: "Bharti AXA Chatbot - OpenAI v1.0", description: "AI-powered customer chatbot", editedAgo: "13 days ago", isProtected: true, category: "chatbot", icon: "chat" },
];

const iconMap = {
  branch: GitBranch,
  shield: Shield,
  chat: MessageSquare,
  network: Network,
  workflow: Workflow,
};

const categoryConfig: Record<FlowCategory, { gradient: string; glow: string; glowHover: string; iconBg: string }> = {
  risk: {
    gradient: "cat-risk-gradient",
    glow: "glow-risk",
    glowHover: "glow-risk-hover",
    iconBg: "cat-risk-gradient",
  },
  recommend: {
    gradient: "cat-recommend-gradient",
    glow: "glow-recommend",
    glowHover: "glow-recommend-hover",
    iconBg: "cat-recommend-gradient",
  },
  chatbot: {
    gradient: "cat-chatbot-gradient",
    glow: "glow-chatbot",
    glowHover: "glow-chatbot-hover",
    iconBg: "cat-chatbot-gradient",
  },
  workflow: {
    gradient: "cat-workflow-gradient",
    glow: "glow-workflow",
    glowHover: "glow-workflow-hover",
    iconBg: "cat-workflow-gradient",
  },
};

export function FlowList() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = flows.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-full overflow-y-auto">
      {/* Breadcrumb & Title */}
      <div className="px-8 pt-7 pb-5">
        <nav className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
          <span className="hover:text-foreground cursor-pointer transition-colors">Projects</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Starter Project</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-medium">Flows</span>
        </nav>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Starter Project</h1>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-border/60">
        <button className="pb-3 text-sm font-semibold text-primary border-b-2 border-primary px-1">
          Flows
        </button>
      </div>

      {/* Action Bar */}
      <div className="px-8 py-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search flows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-transparent border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
          />
        </div>

        <div className="flex items-center glass border rounded-xl overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`p-2.5 transition-all duration-200 ${view === "list" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-2.5 transition-all duration-200 ${view === "grid" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>

        <button className="ml-auto flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-primary to-blue-400 text-primary-foreground text-sm font-semibold transition-all duration-200 cta-pulse hover:scale-[1.02] active:scale-[0.98]">
          <Plus size={16} />
          New Flow
        </button>
      </div>

      {/* Flow Smart Cards */}
      <div className={`px-8 pb-8 ${view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-3"}`}>
        {filtered.map((flow, index) => {
          const IconComp = iconMap[flow.icon];
          const config = categoryConfig[flow.category];

          return (
            <div
              key={flow.id}
              className={`group bg-surface rounded-2xl border border-border/60 p-5 cursor-pointer transition-all duration-300 opacity-0 animate-fade-up hover:-translate-y-1 ${config.glow}`}
              style={{
                animationDelay: `${index * 60}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.classList.remove(config.glow);
                el.classList.add(config.glowHover);
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.classList.remove(config.glowHover);
                el.classList.add(config.glow);
              }}
            >
              <div className={`flex ${view === "grid" ? "flex-col gap-4" : "items-center gap-5"}`}>
                {/* Gradient Icon */}
                <div className={`w-11 h-11 rounded-xl ${config.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <IconComp size={20} className="text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {flow.name}
                    </span>
                    {flow.isProtected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-gold text-primary-foreground shadow-sm flex-shrink-0 uppercase tracking-wide">
                        <Lock size={9} />
                        Protected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{flow.description}</p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">
                    Edited {flow.editedAgo}
                  </span>
                  <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-accent text-muted-foreground transition-all duration-200">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
