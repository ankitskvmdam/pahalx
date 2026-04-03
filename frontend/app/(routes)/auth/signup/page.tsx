"use client";

import React from "react";
import { AuthContainer } from "../component";
import { SignupForm } from "./form";
import {
  CreateUserApiV1AuthUsersPostMutationError,
  useCreateUserApiV1AuthUsersPost,
} from "@/app/_api/client";
import { useRouter } from "next/navigation";
import { LOGIN_URL } from "@/app/_contants/routes";

export default function Page() {
  const router = useRouter();
  const [error, setError] = React.useState<null | {
    title: string;
    description: string;
  }>(null);

  const handleSuccess = React.useCallback(() => {
    router.push(LOGIN_URL);
  }, [router]);

  const handleError = React.useCallback(
    (error: CreateUserApiV1AuthUsersPostMutationError) => {
      if (!error || !error.detail || Array.isArray(error.detail)) {
        setError({
          title: "Sign up failed",
          description: "An unknown error occurred.",
        });
        return;
      }

      setError({
        title: "Sign up failed",
        description: error.detail.msg || "An unknown error occurred.",
      });
    },
    []
  );

  const { mutate: createUser, isPending } = useCreateUserApiV1AuthUsersPost({
    mutation: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const form = e.currentTarget;
      const username = form["username"].value;
      const password = form["password"].value;
      const name = form["fullname"].value;
      createUser({
        data: {
          username,
          password,
          name,
        },
      });
    },
    [createUser]
  );

  return (
    <AuthContainer>
      <SignupForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        error={error}
      />
    </AuthContainer>
  );
}
