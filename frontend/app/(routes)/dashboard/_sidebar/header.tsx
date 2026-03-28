import { PahalXLogo } from "@/components/custom/logo";
import { LogoWithName } from "@/components/custom/logo-with-name";
import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function DashboardSidebarHeader() {
  const { state } = useSidebar();

  return (
    <SidebarHeader className="pb-8">
      <div className="pl-1 flex justify-between items-center h-12">
        {state === "expanded" ? (
          <>
            <LogoWithName />
            <SidebarTrigger />
          </>
        ) : (
          <div className="group flex items-center justify-between w-full">
            <PahalXLogo className="size-6 group-hover:hidden" />
            <SidebarTrigger className="hidden group-hover:inline-flex" />
          </div>
        )}
      </div>
    </SidebarHeader>
  );
}
