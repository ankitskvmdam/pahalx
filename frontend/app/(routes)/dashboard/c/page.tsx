"use client";
import React from "react";
import { useDashboardContext } from "../../context";
import ChatInput, { TChatInputImperativeActions } from "../chat-input";
import { RenderChatMessage } from "./render-chat-message";
import { useGetChatMessages } from "./use-get-chat-msg";
import { useSearchParams } from "next/navigation";
import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";

export default function ChatListPage() {
  const { messages } = useGetChatMessages();
  const { requestPahalLLMResponse } = useDashboardContext();
  const chatId = useSearchParams().get(CHAT_ID_QUERY_PARAM);
  const actionRef = React.useRef<TChatInputImperativeActions>(null);

  console.log("Messages", messages);

  const handleOnSubmit = React.useCallback(
    (user_message: string) => {
      requestPahalLLMResponse(Number(chatId), user_message);
      if (actionRef.current) {
        actionRef.current.resetInput();
      }
    },
    [requestPahalLLMResponse, chatId]
  );

  React.useEffect(() => {
    if (actionRef.current) {
      actionRef.current.resetInput();
    }
  }, [chatId]);

  return (
    <div className="py-2 px-1 flex flex-col justify-center min-h-full">
      <div className="flex-1 relative overflow-auto flex justify-center">
        <div className="flex flex-col flex-1 space-y-4 max-w-3xl pb-16">
          {Array.isArray(messages?.data) &&
            messages.data.map((message) => (
              <RenderChatMessage
                message={message}
                key={`${message.role}${message.id}${message.status}`}
              />
            ))}
        </div>
      </div>

      <div>
        <ChatInput
          isDisableSendingMessage={false}
          actionRef={actionRef}
          onSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
}
