import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { User2, MirrorRectangularIcon } from "lucide-react";
import { DashboardSidebarFooterDropdownContent } from "./footer-dropdown-content";
import { useAppStore } from "@/app/_store/app-store";
import { DashboardSidebarFooterCollapseSidebar } from "./footer-collapse-sidebar";

export function DashboardSidebarFooter() {
  const { user } = useAppStore((store) => ({
    user: store.user,
  }));

  if (!user) {
    return null;
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-foreground/10 p-2 rounded-full">
                  <User2 />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.username}
                  </span>
                </div>
                <MirrorRectangularIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DashboardSidebarFooterDropdownContent />
          </DropdownMenu>
        </SidebarMenuItem>
        <SidebarSeparator className="my-2" />
        <DashboardSidebarFooterCollapseSidebar />
      </SidebarMenu>
    </SidebarFooter>
  );
}
