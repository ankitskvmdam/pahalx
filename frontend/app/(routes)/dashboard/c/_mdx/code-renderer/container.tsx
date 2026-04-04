"use client";
import { cn } from "@/lib/utils";
import React from "react";

export type TCodeRendererContainer = React.PropsWithChildren<{
  className?: string;
}>;

export function CodeRendererContainer(props: TCodeRendererContainer) {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "rounded-md p-1 relative font-monospace flex flex-col flex-1 bg-muted my-4 ",
        className
      )}
    >
      {children}
    </div>
  );
}
