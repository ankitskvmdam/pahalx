"use client";
import React from "react";
import { loginForAccessTokenApiV1AuthLoginPost } from "@/app/_api";
import { AuthContainer } from "../component";
import { LoginForm } from "./form";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/app/_utils/storage";
import { BASE_DASHBOARD_URL } from "@/app/_contants/routes";
import { useAppStore } from "@/app/_store/app-store";

export default function Page() {
  const [error, setError] = React.useState<null | {
    title: string;
    description: string;
  }>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const { setAuthState } = useAppStore((store) => ({
    setAuthState: store.setAuthState,
  }));

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);

      const form = e.currentTarget;
      const username = form["username"].value;
      const password = form["password"].value;

      const response = await loginForAccessTokenApiV1AuthLoginPost({
        body: {
          username,
          password,
        },
      });

      if (response.data) {
        setAccessToken(response.data.access_token);
        setAuthState("authenticated");
        router.push(BASE_DASHBOARD_URL);
        return;
      }

      setError({
        title: "Login failed",
        description: "Invalid username or password",
      });
      setIsSubmitting(false);
    },
    [router, setAuthState],
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
