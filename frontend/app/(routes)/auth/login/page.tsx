"use client";
import React from "react";
import {
  LoginForAccessTokenApiV1AuthLoginPostMutationError,
  LoginForAccessTokenApiV1AuthLoginPostMutationResult,
  useLoginForAccessTokenApiV1AuthLoginPost,
} from "@/app/_api/client";
import { AuthContainer } from "../component";
import { LoginForm } from "./form";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/app/_utils/storage";
import { BASE_DASHBOARD_URL } from "@/app/_contants/routes";
import { useAppStore } from "@/app/_store/app-store";

export default function Page() {
  const { setAuthState } = useAppStore((store) => ({
    setAuthState: store.setAuthState,
  }));
  const router = useRouter();

  const [error, setError] = React.useState<null | {
    title: string;
    description: string;
  }>(null);

  const handleOnSuccess = React.useCallback(
    (response: LoginForAccessTokenApiV1AuthLoginPostMutationResult) => {
      setAccessToken(response.data.access_token);
      setAuthState("authenticated");
      router.push(BASE_DASHBOARD_URL);
    },
    [router, setAuthState]
  );

  const handleOnError = React.useCallback(
    (error: LoginForAccessTokenApiV1AuthLoginPostMutationError) => {
      if (!error || !error.detail || Array.isArray(error.detail)) {
        setError({
          title: "Login failed",
          description: "An unknown error occurred.",
        });
        return;
      }

      setError({
        title: "Login failed",
        description: error.detail.msg,
      });
    },
    []
  );

  const { mutate: login, isPending } = useLoginForAccessTokenApiV1AuthLoginPost(
    {
      mutation: {
        onSuccess: handleOnSuccess,
        onError: handleOnError,
      },
    }
  );

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const form = e.currentTarget;
      const username = form["username"].value;
      const password = form["password"].value;

      login({ data: { username, password } });
    },
    [login]
  );

  return (
    <AuthContainer>
      <LoginForm
        error={error}
        isSubmitting={isPending}
        onSubmit={handleSubmit}
      />
    </AuthContainer>
  );
}
