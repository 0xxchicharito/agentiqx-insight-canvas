import { Bell, Sparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="h-16 glass border-b flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg cat-workflow-gradient flex items-center justify-center">
          <Sparkles size={16} className="text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          agent<span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">IQX</span>
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-xl glass border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all duration-200">
          <Bell size={18} />
        </button>
        <div className="w-9 h-9 rounded-xl cat-workflow-gradient flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-lg">
          A
        </div>
      </div>
    </header>
  );
}
