// constants/routes.ts
import { UserRole } from "@/types";

export const routes = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" },
];

export const dashboardRoute: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  PATIENT: "/dashboard",
};
