import React from "react";
import { getCurrentUserApiV1AuthUsersMeGet } from "../_api";
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

  const isFetchingAuthenticationResult = React.useRef(false);

  const handleAuthState = React.useCallback(async () => {
    if (isFetchingAuthenticationResult.current) return;
    isFetchingAuthenticationResult.current = true;

    if (!getAccessToken()) {
      setAuthState("unauthenticated");
      isFetchingAuthenticationResult.current = false;
      return;
    }

    setAuthState("pending");

    const user = await getCurrentUserApiV1AuthUsersMeGet();
    if (user) {
      setAuthState("authenticated");
    } else {
      removeAccessToken();
      setAuthState("unauthenticated");
    }
    isFetchingAuthenticationResult.current = false;
  }, [setAuthState]);

  React.useEffect(() => {
    handleAuthState();
  }, [handleAuthState]);

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
