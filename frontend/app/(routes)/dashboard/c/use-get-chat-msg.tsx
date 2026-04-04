import React from "react";
import { toast } from "sonner";

import { useGetChatMessagesApiV1ChatChatIdMessagesGet } from "@/app/_api/client";
import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";
import { useRouter, useSearchParams } from "next/navigation";
import { ChatErrorCode } from "@/app/_api/model";
import { BASE_DASHBOARD_URL } from "@/app/_contants/routes";

export function useGetChatMessages() {
  const chatId = useSearchParams().get(CHAT_ID_QUERY_PARAM) || 0;

  const { data: messages, error } =
    useGetChatMessagesApiV1ChatChatIdMessagesGet(Number(chatId), {
      query: {
        retry(failureCount, error) {
          if (
            error.detail &&
            !Array.isArray(error.detail) &&
            error.detail.code === ChatErrorCode.chat_not_found
          ) {
            return false;
          }
          return failureCount < 3;
        },
      },
    });
  const router = useRouter();

  React.useEffect(() => {
    if (
      error &&
      error.detail &&
      !Array.isArray(error.detail) &&
      error.detail.code === ChatErrorCode.chat_not_found
    ) {
      toast.error("Unable to find the requested chat!", {
        style: {
          background: "oklch(63.7% 0.237 25.331)",
          color: "white",
        },
      });
      router.push(BASE_DASHBOARD_URL);
    }
  }, [error, router]);

  return { messages };
}
