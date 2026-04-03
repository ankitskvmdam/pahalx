"use client";
import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";
import { useSearchParams } from "next/navigation";
import ChatInput from "../chat-input";
import { useGetChatMessagesApiV1ChatChatIdMessagesGet } from "@/app/_api/client";
import { RenderChatMessage } from "./render-chat-message";

export default function ChatListPage() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get(CHAT_ID_QUERY_PARAM);
  const { data: messages } = useGetChatMessagesApiV1ChatChatIdMessagesGet(
    Number(chatId)
  );

  return (
    <div className="py-2 px-1 flex flex-col justify-center min-h-full">
      <div className="flex-1 relative overflow-auto flex justify-center">
        <div className="flex flex-col flex-1 space-y-4 max-w-3xl">
          {Array.isArray(messages?.data) &&
            messages.data.map((message) => (
              <RenderChatMessage message={message} key={message.id} />
            ))}
        </div>
      </div>

      <div>
        <ChatInput />
      </div>
    </div>
  );
}
