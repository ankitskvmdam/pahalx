import React from "react";
import ChatInput, { TChatInputImperativeActions } from "./chat-input";
import {
  CreateChatApiV1ChatPostMutationError,
  CreateChatApiV1ChatPostMutationResult,
  getGetChatsApiV1ChatAllGetUrl,
  useCreateChatApiV1ChatPost,
} from "@/app/_api/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CHAT_URL } from "@/app/_contants/routes";
import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";
import { useDashboardContext } from "../context";
import { useQueryClient } from "@tanstack/react-query";

export function NewChat() {
  const router = useRouter();
  const actionRef = React.useRef<TChatInputImperativeActions>(null);
  const queryClient = useQueryClient();

  const { requestPahalLLMResponse } = useDashboardContext();

  const [error, setError] = React.useState<null | {
    title: string;
    description: string;
  }>(null);

  const handleOnCreateChatSuccess = React.useCallback(
    async (chat: CreateChatApiV1ChatPostMutationResult) => {
      let user_input = "";
      if (actionRef.current) {
        user_input = actionRef.current.getValue();
        actionRef.current.resetInput();
      }
      await queryClient.invalidateQueries({
        queryKey: [getGetChatsApiV1ChatAllGetUrl()],
      });
      requestPahalLLMResponse(chat.data.id, user_input || chat.data.title);
      router.push(`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=${chat.data.id}`);
    },
    [router, requestPahalLLMResponse, queryClient]
  );

  const handleOnCreateChatError = React.useCallback(
    (error: CreateChatApiV1ChatPostMutationError) => {
      if (!error || !error.detail || Array.isArray(error.detail)) {
        setError({
          title: "Something went wrong.",
          description: "Please try again later.",
        });
        return;
      }
      setError({
        title: "Failed to create chat.",
        description: error.detail.msg,
      });
    },
    []
  );

  const { mutate: createChat, isPending } = useCreateChatApiV1ChatPost({
    mutation: {
      onSuccess: handleOnCreateChatSuccess,
      onError: handleOnCreateChatError,
    },
  });

  const handleOnSubmit = React.useCallback(
    (value: string) => {
      setError(null);
      createChat({
        params: {
          user_message: value,
        },
      });
    },
    [createChat]
  );

  return (
    <div className="flex flex-col items-center">
      <ChatInput
        onSubmit={handleOnSubmit}
        isDisableSendingMessage={isPending}
        actionRef={actionRef}
      />
      <div className="flex justify-center w-full px-4">
        {error && (
          <Alert variant="destructive" className="max-w-3xl">
            <AlertCircleIcon />
            <AlertTitle>{error.title}</AlertTitle>
            <AlertDescription>{error.description} </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
