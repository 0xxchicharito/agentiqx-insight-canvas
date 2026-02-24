import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sun, Moon, LogOut } from "lucide-react";
import agentiqxLogo from "@/assets/agentiqx-logo.png";

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const setThemeTo = (t: "light" | "dark") => {
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-16 glass border-b flex items-center justify-between px-6 sticky top-0 z-30"
    >
      {/* Logo */}
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={agentiqxLogo} alt="AgentIQX" className="h-8 dark:invert" />
      </motion.div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button
          className="p-2.5 rounded-xl glass border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Bell size={18} />
          
        </button>

        {/* Avatar with dropdown */}
        <div className="relative">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl cat-workflow-gradient flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-lg cursor-pointer"
          >
            A
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-xl z-50 py-1.5"
                >
                  {/* Theme toggle row */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">Theme</span>
                    <div className="flex items-center bg-muted rounded-lg p-0.5">
                      <button
                        onClick={() => setThemeTo("light")}
                        className={`p-1.5 rounded-md transition-all duration-200 ${
                          theme === "light"
                            ? "bg-surface text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Sun size={14} />
                      </button>
                      <button
                        onClick={() => setThemeTo("dark")}
                        className={`p-1.5 rounded-md transition-all duration-200 ${
                          theme === "dark"
                            ? "bg-surface text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Moon size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-border mx-2" />
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-accent/60 transition-colors"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
