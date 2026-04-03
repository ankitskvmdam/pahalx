import React from "react";
import { cn } from "@/lib/utils";

export function MDXRoot(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <div
      className={cn(
        "relative leading-relaxed text-sm",

        /* Headings */
        "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4",
        "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-3",
        "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
        "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-2",

        /* Paragraphs */
        "[&_p]:my-3",

        /* Lists */
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3",
        "[&_li]:my-1",
        "[&_li>p]:my-1", // prevents huge spacing inside list items
        "[&_ul_ul]:list-disc [&_ul_ul]:pl-6",
        "[&_ol_ol]:list-decimal [&_ol_ol]:pl-6",

        /* Task lists (GitHub style) */
        "[&_input[type='checkbox']]:mr-2",

        /* Links */
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80",

        /* Blockquote */
        "[&_blockquote]:my-4 [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground [&_blockquote]:bg-muted/40 [&_blockquote]:italic [&_blockquote]:rounded-md [&_blockquote]:py-2",

        /* Tables */
        "[&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm",
        "[&_thead]:bg-muted/50",
        "[&_th]:text-left [&_th]:font-semibold [&_th]:px-4 [&_th]:py-2 [&_th]:border-b",
        "[&_td]:px-4 [&_td]:py-2 [&_td]:border-b",
        "[&_tr:last-child_td]:border-b-0",

        /* Images */
        "[&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full",

        /* Horizontal rule */
        "[&_hr]:my-6 [&_hr]:border-muted",

        /* Strong / emphasis */
        "[&_strong]:font-semibold",
        "[&_em]:italic",

        /* Keyboard keys */
        "[&_kbd]:bg-muted [&_kbd]:px-1.5 [&_kbd]:py-0.5 [&_kbd]:rounded [&_kbd]:text-xs",

        /* Nested spacing fixes */
        "[&_>*:first-child]:mt-0",
        "[&_>*:last-child]:mb-0",

        /* Prevent overflow issues */
        "break-words"
      )}
    >
      {children}
    </div>
  );
}
