import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { BetweenHorizonalEnd } from "lucide-react";

export function DashboardSidebarFooterCollapseSidebar() {
  const { toggleSidebar, state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarMenuItem onClick={toggleSidebar}>
      <SidebarMenuButton>
        <span className={cn(state === "collapsed" && !isMobile && "hidden")}>
          Collapse Sidebar
        </span>
        <BetweenHorizonalEnd
          className={cn(
            "ml-auto transition-transform",
            state == "collapsed" && "rotate-180"
          )}
        />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
