"use client";
import TextareaAutosize from "react-textarea-autosize";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { SendIcon } from "lucide-react";
import { PahalXLogo } from "@/components/custom/logo";

export default function ChatInput() {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="grid w-full max-w-3xl gap-6">
        <InputGroup className="bg-background">
          <TextareaAutosize
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-8 w-full resize-none rounded-md px-5 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Ask anything..."
          />
          <InputGroupAddon align="block-end">
            <PahalXLogo className="fill-muted" />
            <InputGroupButton className="ml-auto -mr-1 -mb-1" size="sm">
              <SendIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
