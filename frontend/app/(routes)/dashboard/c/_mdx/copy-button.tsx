import { Check, Clipboard } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export type TCopyButtonProps = {
  content: string;
};

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton(props: TCopyButtonProps) {
  const { content } = props;
  const [showCheck, setShowCheck] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(null);

  const handleClick = React.useCallback(() => {
    copyToClipboard(content);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setShowCheck(true);
    timeout.current = setTimeout(() => {
      setShowCheck(false);
    }, 2000);
  }, [content]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-xs" variant="ghost" onClick={handleClick}>
          {showCheck ? <Check /> : <Clipboard />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{showCheck ? "Copied" : "Copy code"}</TooltipContent>
    </Tooltip>
  );
}
