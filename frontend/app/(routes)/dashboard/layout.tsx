"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_sidebar";
import { DashboardMain } from "./main";
import React from "react";
import { useAppStore } from "@/app/_store/app-store";
import { removeAccessToken } from "@/app/_utils/storage";
import { LoaderCircle } from "lucide-react";
import { useGetCurrentUserApiV1AuthUsersMeGet } from "@/app/_api/auth/auth";

type TRootDashbaordLayoutProps = {
  children: React.ReactNode;
};
export default function RootDashboardLayout(props: TRootDashbaordLayoutProps) {
  const { children } = props;
  const { setUser, setAuthState } = useAppStore((store) => ({
    setUser: store.setUser,
    setAuthState: store.setAuthState,
  }));

  const { data, error, isLoading } = useGetCurrentUserApiV1AuthUsersMeGet();

  React.useEffect(() => {
    if (error) {
      removeAccessToken();
      setAuthState("unauthenticated");
    }
    if (data) {
      setUser(data.data);
      return;
    }
  }, [error, data, setUser, setAuthState]);

  if (isLoading || error) {
    <div className="w-full h-dvh flex items-center justify-center">
      <LoaderCircle className="animate-spin size-8" />
    </div>;
  }

  return (
    <div className="h-dvh w-screen flex bg-muted ">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "18rem",
          } as unknown as React.CSSProperties
        }
      >
        <DashboardSidebar />
        <DashboardMain>{children}</DashboardMain>
      </SidebarProvider>
    </div>
  );
}
