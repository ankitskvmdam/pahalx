"use client";
import TextareaAutosize from "react-textarea-autosize";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Loader2, LucideSquareStop, SendIcon } from "lucide-react";
import { PahalXLogo } from "@/components/custom/logo";
import React from "react";
import { cn } from "@/lib/utils";

export type TChatInputImperativeActions = {
  resetInput: () => void;
  getValue: () => string;
};

export type TChatInputProps = {
  onSubmit: (value: string) => void;
  isDisableSendingMessage: boolean;
  actionRef?: React.RefObject<TChatInputImperativeActions | null>;
  showStopButton?: boolean;
  isStopping?: boolean;
  onStopButtonClick?: () => void;
};

export default function ChatInput(props: TChatInputProps) {
  const {
    onSubmit,
    isDisableSendingMessage,
    actionRef,
    showStopButton,
    isStopping,
    onStopButtonClick,
  } = props;
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const handleOnSubmit = React.useCallback(() => {
    if (isDisableSendingMessage) return;
    if (!ref.current) return;
    if (ref.current.value.trim() === "") {
      ref.current.focus();
      return;
    }
    onSubmit(ref.current.value);
  }, [onSubmit, isDisableSendingMessage]);

  const handleOnKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleOnSubmit();
      }
    },
    [handleOnSubmit]
  );

  React.useImperativeHandle(
    actionRef,
    () => ({
      resetInput: () => {
        if (!ref.current) return;
        ref.current.value = "";
      },
      getValue: () => {
        if (!ref.current) return "";
        return ref.current.value;
      },
    }),
    []
  );

  return (
    <div className="w-full flex justify-center p-4">
      <div className="grid w-full max-w-3xl gap-6">
        <InputGroup
          onSubmit={() => console.log("Submitting.")}
          className="bg-background"
        >
          <TextareaAutosize
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-8 w-full resize-none rounded-md px-5 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Ask anything..."
            maxRows={20}
            onKeyDown={handleOnKeyDown}
            ref={ref}
          />
          <InputGroupAddon align="block-end">
            <PahalXLogo className="fill-muted" />
            <div className="flex ml-auto -mr-1 -mb-1">
              <InputGroupButton
                className={cn("hidden", { block: showStopButton })}
                size="sm"
                onClick={onStopButtonClick}
              >
                {isStopping ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <LucideSquareStop />
                )}
              </InputGroupButton>
              <InputGroupButton
                onClick={handleOnSubmit}
                size="sm"
                disabled={isDisableSendingMessage}
              >
                {isDisableSendingMessage ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <SendIcon />
                )}
              </InputGroupButton>
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
