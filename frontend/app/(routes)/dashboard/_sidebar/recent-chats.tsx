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
import { useGetChatsApiV1ChatAllGet } from "@/app/_api/client";
import { useSearchParams } from "next/navigation";

export function DashboardSidebarRecentChats() {
  const { state } = useSidebar();
  const { toggleOnClick } = useToggleSidebar();
  const { data, error, isLoading } = useGetChatsApiV1ChatAllGet();
  const chatId = useSearchParams().get(CHAT_ID_QUERY_PARAM) || "";

  if (isLoading || error || !data || data.data.length === 0) return null;

  return (
    <SidebarGroup className={cn(state === "collapsed" && "hidden")}>
      <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        {data.data.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton isActive={item.id === +chatId} asChild>
              <Link
                href={`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=${item.id}`}
                onClick={toggleOnClick}
                className="text-ellipsis whitespace-nowrap inline-block"
              >
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
