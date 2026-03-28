import type { Metadata } from "next";
import { Open_Sans, Courier_Prime, Inter } from "next/font/google";
import "./global.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const monoSpace = Courier_Prime({
  variable: "--font-mono",
  weight: "700",
});

export const metadata: Metadata = {
  title: "PahalX",
  description:
    "Pahal means 'the first step', and an 'x' at the end is to make it modern!. The purpose of this project is to build fundational knowledge around working with AI project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        openSans.variable,
        monoSpace.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <head>
        <link rel="icon" href="/pahal_logo_small.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
