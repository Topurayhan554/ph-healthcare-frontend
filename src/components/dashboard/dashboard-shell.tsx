import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import { UserRole } from "@/types";
import { DashboardSidebar } from "./dashboad-sidebar";

interface DashboardShellProps {
  children: ReactNode;
  userRole: UserRole;
}

export default function DashboardShell({
  children,
  userRole,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={userRole} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
