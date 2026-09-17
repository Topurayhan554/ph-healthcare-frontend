import RoleGuard from "@/components/auth/role-guard";
import DashboardShel from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["DOCTOR", "ADMIN", "SUPER_ADMIN"]}>
      <DashboardShel>{children}</DashboardShel>
    </RoleGuard>
  );
}
