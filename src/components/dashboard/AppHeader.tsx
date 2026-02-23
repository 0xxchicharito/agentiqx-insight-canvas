import { useState } from "react";
import { Bell, Sparkles, Sun, Moon, LogOut } from "lucide-react";

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    setMenuOpen(false);
  };

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

        {/* Avatar with dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-xl cat-workflow-gradient flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            A
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-44 rounded-xl glass border border-border/60 shadow-xl z-50 py-1.5 animate-fade-up" style={{ animationDuration: "0.15s" }}>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent/60 transition-colors"
                >
                  {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-accent/60 transition-colors"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
