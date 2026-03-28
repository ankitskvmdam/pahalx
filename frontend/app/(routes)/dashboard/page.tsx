"use client";
import { GrainGradient } from "@paper-design/shaders-react";
import ChatInput from "./chat-input";
import { useAppStore } from "@/app/_store/app-store";

export default function Page() {
  const user = useAppStore((store) => store.user);
  return (
    <div className="flex flex-1 justify-center items-center relative rounded-md overflow-hidden -m-2">
      <div className="text-center z-10 w-full">
        <h1 className="font-bold text-4xl bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r bg-clip-text text-transparent lg:text-6xl">
          Hi, {user?.name}!
        </h1>
        <p className="muted-foreground">What do you want to chat about?</p>
        <ChatInput />
      </div>
      <div className="absolute z-1 inset-0 opacity-10 pointer-events-none">
        <GrainGradient
          width="100%"
          height="100%"
          colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]}
          colorBack="#00000000"
          softness={0.5}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={0.4}
        />
      </div>
    </div>
  );
}
