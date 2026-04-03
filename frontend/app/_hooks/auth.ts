"use client";
import React from "react";
import { useGetCurrentUserApiV1AuthUsersMeGet } from "@/app/_api/auth/auth";
import { getAccessToken, removeAccessToken } from "../_utils/storage";
import { LOGIN_URL } from "../_contants/routes";
import { useRouter } from "next/navigation";
import { useAppStore } from "../_store/app-store";

export type TAuthState = "pending" | "authenticated" | "unauthenticated";

export function useIsUserAuthenticated() {
  const { authState, setAuthState } = useAppStore((store) => ({
    authState: store.authState,
    setAuthState: store.setAuthState,
  }));

  const { data, error, isLoading } = useGetCurrentUserApiV1AuthUsersMeGet({
    query: {
      enabled: !!getAccessToken(),
    },
  });

  React.useEffect(() => {
    if (!getAccessToken()) {
      setAuthState("unauthenticated");
      return;
    }

    if (isLoading) {
      setAuthState("pending");
      return;
    }

    if (error) {
      setAuthState("unauthenticated");
      removeAccessToken();
      return;
    }

    if (data) {
      setAuthState("authenticated");
    } else {
      removeAccessToken();
      setAuthState("unauthenticated");
    }
  }, [data, error, isLoading, setAuthState]);

  return {
    authState,
  };
}

export function useLogout() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { setAuthState } = useAppStore((store) => ({
    setAuthState: store.setAuthState,
  }));

  const router = useRouter();
  const handleLogout = React.useCallback(async () => {
    setIsSubmitting(true);
    removeAccessToken();
    setAuthState("unauthenticated");
    router.push(LOGIN_URL);
  }, [router, setAuthState]);

  return {
    handleLogout,
    isSubmitting,
  };
}
