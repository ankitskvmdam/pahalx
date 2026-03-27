import React from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { AuthFormContainer } from "../component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type TLoginFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error?: {
    title: string;
    description: string;
  } | null;
};

export function LoginForm(props: TLoginFormProps) {
  const { onSubmit, isSubmitting, error } = props;

  return (
    <AuthFormContainer
      formTitle="Login"
      formDescription="Enter you username and password below to login to your PahalX account."
    >
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.description}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              disabled={isSubmitting}
              id="username"
              type="text"
              placeholder="Username"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              disabled={isSubmitting}
              id="password"
              type="password"
              placeholder="*********"
              required
            />
          </Field>
          <Field>
            <Button type="submit" disabled={isSubmitting}>
              Login
              <LoaderCircle
                className={cn("animate-spin", { hidden: !isSubmitting })}
              />
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormContainer>
  );
}
