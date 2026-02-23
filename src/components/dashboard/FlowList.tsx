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

interface Flow {
  id: string;
  name: string;
  editedAgo: string;
  isProtected: boolean;
  icon: "branch" | "shield" | "chat" | "network" | "workflow";
}

const flows: Flow[] = [
  { id: "1", name: "Simple Agent (1)", editedAgo: "3 days ago", isProtected: false, icon: "workflow" },
  { id: "2", name: "Basic Prompting", editedAgo: "4 days ago", isProtected: false, icon: "network" },
  { id: "3", name: "LAP - Credit Risk Flow v1.0", editedAgo: "13 days ago", isProtected: true, icon: "branch" },
  { id: "4", name: "CC Recommendation - Conversation Flow v2.2", editedAgo: "13 days ago", isProtected: true, icon: "branch" },
  { id: "5", name: "CC Recommendation - Customer Cluster GEN v1.0", editedAgo: "13 days ago", isProtected: true, icon: "network" },
  { id: "6", name: "Motor Insurance - Underwriting Risk Model v1.0", editedAgo: "13 days ago", isProtected: true, icon: "shield" },
  { id: "7", name: "Bharti AXA Chatbot - OpenAI v1.0", editedAgo: "13 days ago", isProtected: true, icon: "chat" },
];

const iconMap = {
  branch: GitBranch,
  shield: Shield,
  chat: MessageSquare,
  network: Network,
  workflow: Workflow,
};

const iconColorMap: Record<string, string> = {
  branch: "text-primary bg-primary/10",
  shield: "text-red-500 bg-red-50",
  chat: "text-emerald-600 bg-emerald-50",
  network: "text-violet-600 bg-violet-50",
  workflow: "text-amber-600 bg-amber-50",
};

export function FlowList() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = flows.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-background min-h-screen">
      {/* Breadcrumb & Project Title */}
      <div className="px-8 pt-6 pb-4">
        <nav className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
          <span className="hover:text-foreground cursor-pointer transition-colors">Projects</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Starter Project</span>
          <span>/</span>
          <span className="text-foreground font-medium">Flows</span>
        </nav>
        <h1 className="text-xl font-semibold text-foreground">Starter Project</h1>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-border">
        <button className="pb-3 text-sm font-medium text-primary border-b-2 border-primary px-1">
          Flows
        </button>
      </div>

      {/* Action Bar */}
      <div className="px-8 py-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search flows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
          />
        </div>

        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`p-2 transition-colors ${view === "list" ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-2 transition-colors ${view === "grid" ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>

        <button className="ml-auto flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus size={16} />
          New Flow
        </button>
      </div>

      {/* Flow List */}
      <div className="px-8 pb-8 space-y-2">
        {filtered.map((flow) => {
          const IconComp = iconMap[flow.icon];
          const colorClass = iconColorMap[flow.icon];

          return (
            <div
              key={flow.id}
              className="flex items-center gap-4 px-4 py-3.5 bg-surface rounded-xl border border-border hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                <IconComp size={18} />
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <span className="text-sm font-medium text-foreground truncate">
                  {flow.name}
                </span>
                {flow.isProtected && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-badge-amber-bg text-badge-amber-text border border-badge-amber-border flex-shrink-0">
                    <Lock size={10} />
                    Protected
                  </span>
                )}
              </div>

              {/* Meta */}
              <span className="text-xs text-muted-foreground flex-shrink-0">
                Edited {flow.editedAgo}
              </span>

              {/* Actions */}
              <button className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-accent text-muted-foreground transition-all">
                <MoreHorizontal size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
