import { AppHeader } from "@/components/dashboard/AppHeader";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { FlowList } from "@/components/dashboard/FlowList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <FlowList />
      </div>
    </div>
  );
};

export default Index;
