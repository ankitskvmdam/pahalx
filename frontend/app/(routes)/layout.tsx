"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";
import {
  BASE_DASHBOARD_URL,
  LOGIN_URL,
  BASE_AUTH_URL,
} from "@/app/_contants/routes";
import { useIsUserAuthenticated } from "@/app/_hooks/auth";
import { useRouter, usePathname } from "next/navigation";

export default function RootRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState } = useIsUserAuthenticated();

  const router = useRouter();

  const pathname = usePathname();

  const shouldPageBeInLoadingState = React.useMemo(() => {
    if (authState === "pending") {
      return true;
    }

    if (
      authState === "unauthenticated" &&
      !pathname.startsWith(BASE_AUTH_URL)
    ) {
      return true;
    }

    if (
      authState === "authenticated" &&
      !pathname.startsWith(BASE_DASHBOARD_URL)
    ) {
      return true;
    }
    return false;
  }, [authState, pathname]);

  React.useEffect(() => {
    if (
      authState === "authenticated" &&
      !pathname.startsWith(BASE_DASHBOARD_URL)
    ) {
      router.replace(BASE_DASHBOARD_URL);
    } else if (
      authState === "unauthenticated" &&
      !pathname.startsWith(BASE_AUTH_URL)
    ) {
      router.replace(LOGIN_URL);
    }
  }, [authState, router, pathname]);

  if (shouldPageBeInLoadingState) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <LoaderCircle className="animate-spin size-8" />
      </div>
    );
  }

  return <>{children}</>;
}
