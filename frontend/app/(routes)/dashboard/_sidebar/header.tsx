import { PahalXLogo } from "@/components/custom/logo";
import { LogoWithName } from "@/components/custom/logo-with-name";
import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardSidebarHeader() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarHeader className="pb-8">
      <div className="pl-1 flex justify-between items-center h-12">
        {state === "collapsed" && !isMobile ? (
          <PahalXLogo className="size-6" />
        ) : (
          <LogoWithName />
        )}
      </div>
    </SidebarHeader>
  );
}
