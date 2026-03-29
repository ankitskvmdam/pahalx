import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dithering,
  MeshGradient,
  SimplexNoise,
} from "@paper-design/shaders-react";
import { LogoWithName } from "@/components/custom/logo-with-name";

function Navbar() {
  return (
    <nav className="p-2 w-screen z-1 flex justify-between">
      <LogoWithName />
    </nav>
  );
}

export type TAuthContainerProps = React.HTMLProps<HTMLDivElement>;

export function AuthContainer(props: TAuthContainerProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn("flex flex-col min-h-svh w-full relative", className)}
    >
      <Navbar />
      <div className="w-screen flex-1 z-10 flex p-6 items-center justify-center md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <div className="absolute inset-0">
        <MeshGradient
          width="100%"
          height="100%"
          colors={["#F8FAFF", "#E0F2FE", "#E0EAFF", "#FFFBBD"]}
          distortion={0.8}
          swirl={0.1}
          grainMixer={0}
          grainOverlay={0}
          speed={0.3}
        />
      </div>
      <div className="absolute inset-0 opacity-10">
        <Dithering
          width="100%"
          height="100%"
          shape="warp"
          colorBack="#ffffff"
          colorFront="#3F220F"
          type="4x4"
          size={2.5}
          speed={0.1}
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
