import { Bell } from "lucide-react";

export function AppHeader() {
  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-foreground">
          agent<span className="text-primary">IQX</span>
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors relative">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
