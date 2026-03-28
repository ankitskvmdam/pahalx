import React from "react";
import { getCurrentUserApiV1AuthUsersMeGet } from "../_api";
import { getAccessToken, removeAccessToken } from "../_utils/storage";
import { LOGIN_URL } from "../_contants/routes";
import { useRouter } from "next/navigation";

export type TAuthState = "pending" | "authenticated" | "unauthenticated";

export function useIsUserAuthenticated() {
  const [authStatus, setAuthStatus] = React.useState<TAuthState>("pending");
  const isFetchingAuthenticationResult = React.useRef(false);

  const handleAuthState = React.useCallback(async () => {
    if (isFetchingAuthenticationResult.current) return;
    isFetchingAuthenticationResult.current = true;

    if (!getAccessToken()) {
      setAuthStatus("unauthenticated");
      isFetchingAuthenticationResult.current = false;
      return;
    }

    setAuthStatus("pending");

    const user = await getCurrentUserApiV1AuthUsersMeGet();
    if (user) {
      setAuthStatus("authenticated");
    } else {
      removeAccessToken();
      setAuthStatus("unauthenticated");
    }
    isFetchingAuthenticationResult.current = false;
  }, []);

  React.useEffect(() => {
    handleAuthState();
  }, [handleAuthState]);

  return {
    authStatus,
  };
}

export function useLogout() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const handleLogout = React.useCallback(() => {
    setIsSubmitting(true);
    removeAccessToken();
    router.push(LOGIN_URL);
  }, [router]);

  return {
    handleLogout,
    isSubmitting,
  };
}
