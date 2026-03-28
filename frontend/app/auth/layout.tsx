"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";
import { BASE_DASHBOARD_URL } from "../_contants/routes";
import { useIsUserAuthenticated } from "../_hooks/auth";
import { useRouter } from "next/navigation";

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useIsUserAuthenticated();
  const router = useRouter();

  React.useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace(BASE_DASHBOARD_URL);
    }
  }, [authStatus, router]);

  if (authStatus === "pending" || authStatus === "authenticated") {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <LoaderCircle className="animate-spin size-8" />
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return <>{children}</>;
  }

  return null;
}
