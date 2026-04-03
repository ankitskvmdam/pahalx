"use client";
import TextareaAutosize from "react-textarea-autosize";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Loader2, SendIcon } from "lucide-react";
import { PahalXLogo } from "@/components/custom/logo";
import React from "react";

export type TChatInputProps = {
  onSubmit: (value: string) => void;
  isDisableSendingMessage: boolean;
};

export default function ChatInput(props: TChatInputProps) {
  const { onSubmit, isDisableSendingMessage } = props;
  const [value, setValue] = React.useState("");

  const handleOnInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleOnSubmit = React.useCallback(() => {
    if (isDisableSendingMessage) return;
    onSubmit(value);
    setValue("");
  }, [value, onSubmit, isDisableSendingMessage]);

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
            onChange={handleOnInputChange}
          />
          <InputGroupAddon align="block-end">
            <PahalXLogo className="fill-muted" />
            <InputGroupButton
              onClick={handleOnSubmit}
              className="ml-auto -mr-1 -mb-1"
              size="sm"
              disabled={isDisableSendingMessage}
            >
              {isDisableSendingMessage ? (
                <Loader2 className="animate-spin" />
              ) : (
                <SendIcon />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
