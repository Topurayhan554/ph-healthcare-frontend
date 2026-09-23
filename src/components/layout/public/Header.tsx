"use client";

import { AuthSection } from "./AuthSection";
import { useGetMe } from "@/hooks";
import NavLinks from "./NavLinks";
import Logo from "@/components/shared/Logo";
import { DashboardLink } from "./DashboardLink";

export default function Header() {
  const { data } = useGetMe();
  const role = data?.data?.role;

  return (
    <header className="w-full bg-gray-100">
      <nav className="flex h-16 items-center justify-between px-6">
        {/* Left */}
        <Logo />

        {/* Middle */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
          <DashboardLink role={role} />
        </div>

        {/* Right */}
        <AuthSection />
      </nav>
    </header>
  );
}
