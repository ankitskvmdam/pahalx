"use client"

import React from "react";
import { redirect } from "next/navigation";
import { AuthContainer } from "../component";
import { SignupForm } from "./form";
import { createUserApiV1AuthUsersPost } from "@/app/_api";

export default function Page() {
  const [error, setError] = React.useState<null | {
    title: string;
    description: string;
  }>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);

      const form = e.currentTarget;
      const username = form["username"].value
      const password = form["password"].value
      const name = form["name"].value


      const response = await createUserApiV1AuthUsersPost({
        body: {
          username,
          password,
          name,
        },
      });

      if (response.data) {
        redirect("/auth/login");
      }

      console.log("Response", response.error)

      if (response.error) {
        setError({
          title: "Sign up failed",
          description: response.error.detail as unknown as string,
        });

      } else {
        setError({
          title: "Sing up failed",
          description: "Please check the form fields and try again.",
        });
      }

      setIsSubmitting(false);
    },
    [],
  );

  return (
    <AuthContainer>
      <SignupForm onSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} />
    </AuthContainer>
  );
}
