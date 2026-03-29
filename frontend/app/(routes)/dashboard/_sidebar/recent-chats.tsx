import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";
import { CHAT_URL } from "@/app/_contants/routes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToggleSidebar } from "./use-toggle-sidebar";

export function DashboardSidebarRecentChats() {
  const { state } = useSidebar();
  const { toggleOnClick } = useToggleSidebar();

  return (
    <SidebarGroup className={cn(state === "collapsed" && "hidden")}>
      <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=an-example-chat-root`}
              onClick={toggleOnClick}
            >
              An example chat 01
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link
              href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=travel-itinerary-chat-room`}
              onClick={toggleOnClick}
            >
              Give me the travel itinerary
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link
              href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=interesting-chat-room`}
              onClick={toggleOnClick}
            >
              Interesting Chat
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
