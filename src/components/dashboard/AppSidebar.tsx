import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Plus,
  MoreHorizontal,
  Settings,
  FileText,
  HelpCircle,
  Zap,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
}

const projects: Project[] = [
  { id: "1", name: "Starter Project" },
  { id: "2", name: "New Project" },
  { id: "3", name: "New Project (1)" },
];

const navItems = [
  { icon: Layers, label: "Projects", active: true },
  { icon: Settings, label: "Settings" },
  { icon: FileText, label: "Docs" },
];

const sidebarVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const, staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export function AppSidebar() {
  const [activeProject, setActiveProject] = useState("1");

  const usagePercent = 68;

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-[280px] min-w-[280px] glass border-r flex flex-col h-full"
    >
      {/* Nav Icons */}
      <div className="px-4 pt-5 pb-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            variants={itemVariants}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              item.active
                ? "nav-glow text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="h-px bg-border mx-4 my-2" />

      {/* Projects Section */}
      <motion.div variants={itemVariants} className="px-4 pt-2 pb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Projects</span>
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-all duration-200"
        >
          <Plus size={14} />
        </motion.button>
      </motion.div>

      <nav className="px-3 space-y-0.5 overflow-y-auto">
        {projects.map((project) => (
          <motion.button
            key={project.id}
            variants={itemVariants}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveProject(project.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
              activeProject === project.id
                ? "nav-glow text-primary font-medium"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <motion.div
                animate={activeProject === project.id ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activeProject === project.id ? "cat-workflow-gradient" : "bg-muted"
                }`}
              />
              <span className="truncate">{project.name}</span>
            </div>
            <MoreHorizontal
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
            />
          </motion.button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Usage Card */}
      <motion.div variants={itemVariants} className="mx-4 mb-3">
        <div className="rounded-xl border border-border/60 bg-accent/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg cat-workflow-gradient flex items-center justify-center">
                <Zap size={14} className="text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold text-foreground">API Usage</span>
            </div>
            <span className="text-xs font-bold text-primary">{usagePercent}%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePercent}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" as const }}
              className="h-full rounded-full cat-workflow-gradient"
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            6,800 / 10,000 requests this month
          </p>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={itemVariants} className="mx-4 mb-3">
        <div className="rounded-xl border border-border/60 bg-accent/30 p-3 space-y-1">
          <motion.button
            whileHover={{ x: 3 }}
            className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle size={14} />
              <span>Help & Support</span>
            </div>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          <motion.button
            whileHover={{ x: 3 }}
            className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink size={14} />
              <span>API Reference</span>
            </div>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </motion.div>

      {/* Upgrade CTA */}
      <motion.div variants={itemVariants} className="mx-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl cat-chatbot-gradient p-3.5 text-primary-foreground text-center shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <Zap size={14} />
            <span className="text-xs font-bold uppercase tracking-wide">Upgrade to Pro</span>
          </div>
          <p className="text-[10px] mt-1 opacity-80">Unlock unlimited flows & agents</p>
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}
