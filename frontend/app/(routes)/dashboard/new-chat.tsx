import React from "react";
import ChatInput from "./chat-input";
import { useCreateChatApiV1ChatPost } from "@/app/_api/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CHAT_URL } from "@/app/_contants/routes";
import { CHAT_ID_QUERY_PARAM } from "@/app/_contants/query-params";

export function NewChat() {
  const router = useRouter();

  const handleOnCreateChatSuccess = React.useCallback(
    (chat: any) => {
      router.push(`${CHAT_URL}?${CHAT_ID_QUERY_PARAM}=${chat.data.id}`);
    },
    [router]
  );

  const {
    mutate: createChat,
    error,
    isPending,
  } = useCreateChatApiV1ChatPost({
    mutation: {
      onSuccess: handleOnCreateChatSuccess,
    },
  });

  const handleOnSubmit = React.useCallback(
    (value: string) => {
      createChat({
        params: {
          user_message: value,
        },
      });
    },
    [createChat]
  );

  const errorMessage = React.useMemo(() => {
    if (!error) return null;

    if (
      error &&
      error.detail &&
      "code" in error.detail &&
      typeof error.detail.code === "string"
    ) {
      if (error.detail.code === "token_expired") {
        return "Your session has expired. Please log in again.";
      }
    }

    return "Please try again after some time.";
  }, [error]);

  return (
    <div className="flex flex-col items-center">
      <ChatInput
        onSubmit={handleOnSubmit}
        isDisableSendingMessage={isPending}
      />
      <div className="flex justify-center w-full px-4">
        {errorMessage && (
          <Alert variant="destructive" className="max-w-3xl">
            <AlertCircleIcon />
            <AlertTitle>Something went wrong.</AlertTitle>
            <AlertDescription>{errorMessage} </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
