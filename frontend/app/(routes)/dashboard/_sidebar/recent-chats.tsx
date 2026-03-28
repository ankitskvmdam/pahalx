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

export function DashboardSidebarRecentChats() {
  const { state } = useSidebar();

  return (
    <SidebarGroup className={cn(state === "collapsed" && "hidden")}>
      <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=an-example-chat-root`}
            >
              An example chat 01
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link
              href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=travel-itinerary-chat-room`}
            >
              Give me the travel itinerary
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link
              href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=interesting-chat-room`}
            >
              Interesting Chat
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
