import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Plus,
  MoreHorizontal,
  FileText,
  Settings,
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

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-[280px] min-w-[280px] glass border-r flex flex-col h-full"
    >
      {/* Nav Icons */}
      <div className="px-4 pt-5 pb-3 flex flex-col gap-1">
        {navItems.map((item, i) => (
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

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
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
    </motion.aside>
  );
}
