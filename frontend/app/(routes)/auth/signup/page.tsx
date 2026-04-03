"use client";

import React from "react";
import { AuthContainer } from "../component";
import { SignupForm } from "./form";
import { useCreateUserApiV1AuthUsersPost } from "@/app/_api/auth/auth";
import { useRouter } from "next/navigation";
import { LOGIN_URL } from "@/app/_contants/routes";
import { isServerErrorResponse } from "@/app/_utils/fetch";

export default function Page() {
  const [error, setError] = React.useState<null | {
    title: string;
    description: string;
  }>(null);

  const router = useRouter();
  const { mutateAsync: createUser, isPending } =
    useCreateUserApiV1AuthUsersPost();

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const form = e.currentTarget;
      const username = form["username"].value;
      const password = form["password"].value;
      const name = form["fullname"].value;

      try {
        const response = await createUser({
          data: {
            username,
            password,
            name,
          },
        });

        if (response.status === 200) {
          router.push(LOGIN_URL);
        }
      } catch (error) {
        if (isServerErrorResponse(error)) {
          setError({
            title: "Sign up failed",
            description:
              typeof error.detail === "string"
                ? error.detail
                : JSON.stringify(error.detail),
          });
        } else {
          setError({
            title: "Sing up failed",
            description: "Please check the form fields and try again.",
          });
        }
      }
    },
    [createUser, router],
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
