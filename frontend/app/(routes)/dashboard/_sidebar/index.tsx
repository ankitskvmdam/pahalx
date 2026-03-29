import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "./header";
import { DashboardSidebarFooter } from "./footer";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { BASE_DASHBOARD_URL } from "@/app/_contants/routes";
import { DashboardSidebarRecentChats } from "./recent-chats";
import { useToggleSidebar } from "./use-toggle-sidebar";

export function DashboardSidebar() {
  const { toggleOnClick } = useToggleSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <DashboardSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={BASE_DASHBOARD_URL} onClick={toggleOnClick}>
                  <MessageCircleIcon /> New Chat
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <DashboardSidebarRecentChats />
      </SidebarContent>
      <DashboardSidebarFooter />
    </Sidebar>
  );
}
