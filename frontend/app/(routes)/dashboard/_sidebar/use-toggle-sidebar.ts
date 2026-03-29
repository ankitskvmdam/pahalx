import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export function useToggleSidebar() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const toggleOnClick = React.useCallback(() => {
    if (isMobile) {
      toggleSidebar();
    }
  }, [isMobile, toggleSidebar]);

  return { toggleOnClick };
}
