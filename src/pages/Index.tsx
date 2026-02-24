import { AppHeader } from "@/components/dashboard/AppHeader";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { FlowList } from "@/components/dashboard/FlowList";
import { FloatingOrbs } from "@/components/dashboard/FloatingOrbs";

const Index = () => {
  return (
    <div className="min-h-screen mesh-bg flex flex-col relative">
      <FloatingOrbs />
      <AppHeader />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <AppSidebar />
        <FlowList />
      </div>
    </div>
  );
};

export default Index;
