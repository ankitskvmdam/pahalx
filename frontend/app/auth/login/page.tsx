"use client";
import React from "react";
import { loginApiV1AuthLoginPost } from "@/app/_api";
import { AuthContainer } from "../component";
import { LoginForm } from "./form";
import { redirect } from "next/navigation";

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


      const response = await loginApiV1AuthLoginPost({
        query: {
          username,
          password,
        },
      });

      if (response.data) {
        redirect("/dashboard");
      }

      setError({
        title: "Login failed",
        description: "Invalid username or password",
      });
      setIsSubmitting(false);
    },
    [],
  );

  return (
    <AuthContainer>
      <LoginForm
        error={error}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </AuthContainer>
  );
}
