// Header/DashboardLink.tsx
import Link from "next/link";
import { UserRole } from "@/types";
import { dashboardRoute } from "@/constants/routes";

interface DashboardLinkProps {
  role?: UserRole;
}

export function DashboardLink({ role }: DashboardLinkProps) {
  if (!role) return null;

  return (
    <Link
      href={dashboardRoute[role]}
      className="text-sm font-medium hover:text-primary"
    >
      Dashboard
    </Link>
  );
}
