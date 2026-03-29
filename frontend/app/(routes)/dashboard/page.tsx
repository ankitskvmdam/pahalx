"use client";
import ChatInput from "./chat-input";
import { useAppStore } from "@/app/_store/app-store";

export default function Page() {
  const user = useAppStore((store) => store.user);
  return (
    <div className="flex flex-1 justify-center items-center relative rounded-md overflow-hidden -m-2">
      <div className="text-center z-10 w-full">
        <h1 className="font-bold text-4xl from-gray-900 to-blue-600 bg-linear-to-r bg-clip-text text-transparent lg:text-6xl">
          Hi, {user?.name}!
        </h1>
        <p className="muted-foreground mt-2">What do you want to chat about?</p>
        <ChatInput />
      </div>
    </div>
  );
}
