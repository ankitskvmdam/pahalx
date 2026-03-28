import { cn } from "@/lib/utils";
import { PahalXLogo } from "./logo";

export function LogoWithName(props: React.HTMLProps<HTMLDivElement>) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        "inline-flex gap-2 [&_svg]:size-6 [&_svg]:fill-foreground [&_span]:font-mono [&_span]:font-bold [&_span]:text-xl",
        className,
      )}
      {...rest}
    >
      <PahalXLogo />
      <span>PahalX</span>
    </div>
  );
}
