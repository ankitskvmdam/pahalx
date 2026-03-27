import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GrainGradient, SimplexNoise } from "@paper-design/shaders-react";

export type TAuthContainerProps = React.HTMLProps<HTMLDivElement>;

export function AuthContainer(props: TAuthContainerProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 relative",
        className,
      )}
    >
      <div className="w-full max-w-sm z-10">
        <h1 className="text-2xl text-center font-bold mb-4">PahalX</h1>
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <div className="absolute inset-0">
        <SimplexNoise
          width="100%"
          height="100%"
          colors={["#a1a1a1", "#b1b1b1", "#c1c1c1", "#d1d1d1", "#e1e1e1"]}
          stepsPerColor={2}
          softness={0}
          speed={0.5}
          scale={0.6}
        />
      </div>
    </div>
  );
}

export type TAuthFormContainerProps = React.HTMLProps<HTMLDivElement> & {
  formTitle: string;
  formDescription: string;
};

export function AuthFormContainer(props: TAuthFormContainerProps) {
  const { formTitle, formDescription, className, children, ...rest } = props;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...rest}>
      <Card>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          <CardDescription>{formDescription}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
