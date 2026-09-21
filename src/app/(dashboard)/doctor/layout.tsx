import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      <DashboardShell userRole="DOCTOR">{children}</DashboardShell>
    </RoleGuard>
  );
}
