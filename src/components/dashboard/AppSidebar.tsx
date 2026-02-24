import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Plus,
  MoreHorizontal,
  Settings,
  FileText,
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
    transition: { duration: 0.4, ease: "easeOut" as const, staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { x: -16, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export function AppSidebar() {
  const [activeProject, setActiveProject] = useState("1");

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-[280px] min-w-[280px] flex flex-col h-full border-r border-border/50 bg-card/60 backdrop-blur-xl"
    >
      {/* Nav Section */}
      <div className="px-4 pt-6 pb-4 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            variants={itemVariants}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
              item.active
                ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <item.icon size={17} strokeWidth={item.active ? 2.2 : 1.8} />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Projects Header */}
      <motion.div variants={itemVariants} className="px-5 pt-5 pb-2.5 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70">
          Projects
        </span>
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1 rounded-md hover:bg-accent text-muted-foreground/60 hover:text-primary transition-all duration-200"
        >
          <Plus size={13} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      {/* Project List */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto relative">
        {projects.map((project) => {
          const isActive = activeProject === project.id;
          return (
            <motion.button
              key={project.id}
              variants={itemVariants}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveProject(project.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-200 group ${
                isActive
                  ? "bg-primary/10 text-primary font-medium shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "cat-workflow-gradient shadow-[0_0_6px_hsl(221_83%_53%/0.5)]" : "bg-muted-foreground/25"
                    }`}
                  />
                </div>
                <span className="truncate">{project.name}</span>
              </div>
              <MoreHorizontal
                size={14}
                className="opacity-0 group-hover:opacity-60 transition-opacity text-muted-foreground flex-shrink-0"
              />
            </motion.button>
          );
        })}

        {/* Fade overlay at bottom */}
        <div className="sticky bottom-0 h-12 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
      </nav>
    </motion.aside>
  );
}
