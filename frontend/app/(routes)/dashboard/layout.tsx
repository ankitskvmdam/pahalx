"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_sidebar";
import { DashboardMain } from "./main";
import React from "react";
import { useAppStore } from "@/app/_store/app-store";
import { getCurrentUserApiV1AuthUsersMeGet } from "@/app/_api";
import { removeAccessToken } from "@/app/_utils/storage";
import { LoaderCircle } from "lucide-react";

type TRootDashbaordLayoutProps = {
  children: React.ReactNode;
};
export default function RootDashboardLayout(props: TRootDashbaordLayoutProps) {
  const { children } = props;
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

  return (
    <div className="h-dvh w-screen flex bg-muted ">
      <SidebarProvider>
        <DashboardSidebar />
        <DashboardMain>{children}</DashboardMain>
      </SidebarProvider>
    </div>
  );
}
