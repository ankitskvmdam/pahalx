"use client";
import TextareaAutosize from "react-textarea-autosize";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Paperclip, PlusIcon, SendIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatInput() {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="grid w-full max-w-md gap-6">
        <InputGroup className="bg-background">
          <TextareaAutosize
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-8 w-full resize-none rounded-md px-5 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Ask anything..."
          />
          <InputGroupAddon align="block-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton size="sm" className="-ml-1 -mb-1">
                  <PlusIcon />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Paperclip />
                    Attach File
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <InputGroupButton className="ml-auto -mr-1 -mb-1" size="sm">
              <SendIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
