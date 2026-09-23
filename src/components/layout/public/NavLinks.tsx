"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const ROUTES = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" },
];

interface Props {
  className?: string;
  onNavigate?: () => void;
}

export default function NavLinks({ className, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {ROUTES.map((route) => {
        const isActive =
          route.url === "/" ? pathname === "/" : pathname.startsWith(route.url);

        return (
          <Link
            key={route.url}
            href={route.url}
            onClick={onNavigate}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
}
