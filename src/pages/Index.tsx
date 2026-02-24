import { useState } from "react";
import { AppHeader } from "@/components/dashboard/AppHeader";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { FlowList } from "@/components/dashboard/FlowList";
import { FloatingOrbs } from "@/components/dashboard/FloatingOrbs";
import { SettingsPage } from "@/components/dashboard/SettingsPage";

const Index = () => {
  const [activeView, setActiveView] = useState("projects");

  return (
    <div className="min-h-screen mesh-bg flex flex-col relative">
      <FloatingOrbs />
      <AppHeader />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <AppSidebar activeView={activeView} onNavigate={setActiveView} />
        {activeView === "projects" && <FlowList />}
        {activeView === "settings" && (
          <SettingsPage onBack={() => setActiveView("projects")} />
        )}
      </div>
    </div>
  );
};

export default Index;
