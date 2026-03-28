import { useLogout } from "@/app/_hooks/auth";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { User, LogOut } from "lucide-react";

export function DashboardSidebarFooterDropdownContent() {
  const { handleLogout } = useLogout();

  return (
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User />
          Account
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
