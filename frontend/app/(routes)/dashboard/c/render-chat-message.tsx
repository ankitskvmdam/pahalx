import { MessageGet } from "@/app/_api/model/messageGet";
import { UserMessageBox } from "./user-message-box";
import { AssistantMessageBox } from "./assistant-message-box";
import { AITypingBubble } from "./typing-indicator";

export type TRenderChatMessageProps = {
  message: MessageGet;
};

export function RenderChatMessage(props: TRenderChatMessageProps) {
  const { message } = props;

  if (message.role === "user") {
    return <UserMessageBox message={message.content} />;
  }

  return (
    <>
      <AssistantMessageBox message={message.content} />
      {message.status === "streaming" && <AITypingBubble />}
    </>
  );
}
