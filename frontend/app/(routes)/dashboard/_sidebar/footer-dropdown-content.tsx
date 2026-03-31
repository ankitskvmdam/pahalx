import { ACCOUNT_URL } from "@/app/_contants/routes";
import { useLogout } from "@/app/_hooks/auth";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { User, LogOut } from "lucide-react";
import Link from "next/link";

export function DashboardSidebarFooterDropdownContent() {
  const { handleLogout } = useLogout();

  return (
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <Link href={ACCOUNT_URL}>
          <DropdownMenuItem>
            <User />
            Account
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
