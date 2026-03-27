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
import { cn } from "@/lib/utils";
import { AlertCircleIcon, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type TSignupFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error?: {
    title: string;
    description: string;
  } | null;
};

export function SignupForm(props: TSignupFormProps) {
  const { onSubmit, isSubmitting, error } = props;

  return (
    <AuthFormContainer
      formTitle="Sign up"
      formDescription="Enter the details below to create a new PahalX account."
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
            <FieldLabel htmlFor="fullname">Name</FieldLabel>
            <Input disabled={isSubmitting} id="fullname" type="text" placeholder="Full name" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input disabled={isSubmitting} id="username" type="text" placeholder="Username" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input disabled={isSubmitting} id="password" type="password" placeholder="*********" required />
          </Field>
          <Field>
            <Button disabled={isSubmitting} type="submit">
              Sign up
              <LoaderCircle
                className={cn("animate-spin", { hidden: !isSubmitting })}
              />
            </Button>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/auth/login">Log in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthFormContainer>
  );
}
