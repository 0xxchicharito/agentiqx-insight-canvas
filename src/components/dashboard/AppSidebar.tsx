import { useState } from "react";
import { FolderOpen, Plus, Upload, MoreHorizontal, FileText } from "lucide-react";

interface Project {
  id: string;
  name: string;
  active?: boolean;
}

const projects: Project[] = [
  { id: "1", name: "Starter Project", active: true },
  { id: "2", name: "New Project" },
  { id: "3", name: "New Project (1)" },
];

export function AppSidebar() {
  const [activeProject, setActiveProject] = useState("1");

  return (
    <aside className="w-[280px] min-w-[280px] bg-surface border-r border-border flex flex-col h-screen">
      {/* Projects Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-primary">Projects</h2>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors">
            <Upload size={15} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors">
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Project List */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(project.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all group ${
              activeProject === project.id
                ? "bg-accent text-foreground font-medium border-l-2 border-primary"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            }`}
          >
            <span className="truncate">{project.name}</span>
            <MoreHorizontal
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
            />
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border px-5 py-4">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <FileText size={16} />
          <span>My Files</span>
        </button>
      </div>
    </aside>
  );
}
