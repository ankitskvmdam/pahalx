import React from "react";
import { nanoid } from "nanoid";
import { MessageManager } from "../_utils/message-manager";
import {
  getContentFromParsedStream,
  parseStreamData,
  streamHandler,
} from "../_utils/stream";
import { toast } from "sonner";
import {
  getCreatePahalxResponseApiV1ChatChatChatIdResponsePostUrl,
  getGetChatMessagesApiV1ChatChatIdMessagesGetUrl,
  getChatMessagesApiV1ChatChatIdMessagesGetResponse200,
} from "../_api/client";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_ID_QUERY_PARAM } from "../_contants/query-params";
import { useRouter } from "next/navigation";
import { CHAT_URL } from "../_contants/routes";

export function useRequestPahalLLMResponse() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const requestPahalLLMResponse = React.useCallback(
    (chat_id: number, user_message: string) => {
      function getQueryKey() {
        return [getGetChatMessagesApiV1ChatChatIdMessagesGetUrl(chat_id)];
      }

      function pushData(
        content: string,
        role: "assistant" | "user",
        status: "streaming" | "completed",
        updateLastEntry = false
      ) {
        queryClient.setQueryData(
          getQueryKey(),
          (
            old: getChatMessagesApiV1ChatChatIdMessagesGetResponse200
          ): getChatMessagesApiV1ChatChatIdMessagesGetResponse200 => {
            const prevData = old?.data ?? [];

            if (updateLastEntry && prevData.length > 0) {
              const last = prevData[prevData.length - 1];
              const updatedLast = {
                ...last,
                content: last.content + content,
                status,
              };
              return {
                status: 200,
                data: [...prevData.slice(0, -1), updatedLast],
              };
            }

            return {
              status: 200,
              data: [
                ...prevData,
                {
                  id: Date.now(),
                  chat_id,
                  content,
                  role,
                  status,
                  created_at: new Date().toISOString(),
                },
              ],
            };
          }
        );
      }

      function onValue(value: string) {
        const parseData = parseStreamData(value);
        if (parseData.length === 0) return;

        const content = getContentFromParsedStream(parseData);
        if (content.trim() !== "") {
          pushData(content, "assistant", "streaming", true);
        }
      }

      async function onDone() {
        await queryClient.invalidateQueries({
          queryKey: getQueryKey(),
        });
        pushData("", "assistant", "completed", true);
        if (window.location.search !== `?${CHAT_ID_QUERY_PARAM}=${chat_id}`) {
          toast.success("Your result is ready.", {
            action: {
              label: "See",
              onClick() {
                router.push(`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=${chat_id}`);
              },
            },
          });
        }
      }

      pushData(user_message, "user", "completed");
      pushData("", "assistant", "streaming");

      MessageManager.enqueueRequestHandler(
        `chat-${chat_id}-${nanoid()}`,
        async (signal) => {
          streamHandler(
            getCreatePahalxResponseApiV1ChatChatChatIdResponsePostUrl(chat_id, {
              user_message,
            }),
            { method: "POST", signal },
            { onValue, onDone }
          );
        }
      );
    },
    [queryClient, router]
  );

  return { requestPahalLLMResponse };
}
