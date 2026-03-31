import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { LayoutDashboard } from "lucide-react";

export function DashboardCustomSidebarTrigger() {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  if (!isMobile) {
    return null;
  }

  return (
    <Button
      onClick={toggleSidebar}
      variant="ghost"
      className="absolute top-4 left-1 size-8"
    >
      <LayoutDashboard />
    </Button>
  );
}
