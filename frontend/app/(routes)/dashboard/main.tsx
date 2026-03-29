import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export type TDashboardMainProps = {
  children: React.ReactNode;
};

export function DashboardMain(props: TDashboardMainProps) {
  const { children } = props;
  const isMobile = useIsMobile();
  return (
    <main className="flex-1 py-2 px-1 flex">
      <div className="p-2 bg-background rounded-md flex-1 flex flex-col relative">
        {children}
        {isMobile && <SidebarTrigger className="z-10 absolute top-4 left-1" />}
      </div>
    </main>
  );
}
