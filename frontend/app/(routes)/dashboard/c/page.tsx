"use client";
import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";
import { useSearchParams } from "next/navigation";

export default function ChatListPage() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get(CHAT_ID_QUERY_PARAM);
  return <div>Showing chat for {chatId}</div>;
}
