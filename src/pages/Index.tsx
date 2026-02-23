import { AppHeader } from "@/components/dashboard/AppHeader";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { FlowList } from "@/components/dashboard/FlowList";

const Index = () => {
  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <FlowList />
      </div>
    </div>
  );
};

export default Index;
