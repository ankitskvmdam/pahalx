"use client";
import { Button } from "@/components/ui/button";
import { GrainGradient } from "@paper-design/shaders-react";
import { useLogout } from "@/app/_hooks/auth";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardWelcome() {
  const { handleLogout, isSubmitting } = useLogout();

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <div className="space-y-5 relative z-10 px-8 py-8 rounded-md bg-white/30 backdrop-blur-sm">
        <h1 className="text-5xl font-bold mb-4">Welcome to PahalX</h1>
        <div className="w-full max-w-sm text-black">
          We will shortly add the chat feature.
        </div>
        <div>
          <Button disabled={isSubmitting} onClick={handleLogout}>
            Logout{" "}
            <Loader2
              className={cn("animate-spin", { hidden: !isSubmitting })}
            />
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 z-1">
        <GrainGradient
          width="100%"
          height="100%"
          colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]}
          colorBack="#00000000"
          softness={0.5}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={1}
        />
      </div>
    </div>
  );
}
