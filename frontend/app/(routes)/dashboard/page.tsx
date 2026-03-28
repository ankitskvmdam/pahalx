"use client";
import { LoaderCircle } from "lucide-react";
import { useAppStore } from "@/app/_store/app-store";
import React from "react";
import { getCurrentUserApiV1AuthUsersMeGet } from "@/app/_api";
import { removeAccessToken } from "@/app/_utils/storage";
import { DashboardWelcome } from "./welcome";

export default function Page() {
  const { user, setUser, setAuthState } = useAppStore((store) => ({
    user: store.user,
    setUser: store.setUser,
    setAuthState: store.setAuthState,
  }));

  const updateUser = React.useCallback(async () => {
    const response = await getCurrentUserApiV1AuthUsersMeGet();
    if (!response || !response.data || response.error) {
      removeAccessToken();
      setAuthState("unauthenticated");
      return;
    }
    setUser(response.data);
  }, [setAuthState, setUser]);

  React.useEffect(() => {
    updateUser();
  }, [updateUser]);

  if (!user) {
    <div className="w-full h-dvh flex items-center justify-center">
      <LoaderCircle className="animate-spin size-8" />
    </div>;
  }

  return <DashboardWelcome />;
}
