"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged Out Successfully",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
      },

      onError: () => {
        toast.add({
          title: "Logout Failed!",
          description: "Something Went Wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full bg-gray-100">
      <nav className="flex h-16 items-center justify-between px-6">
        {/* Navigation */}
        <div className="flex items-center gap-5">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium hover:text-primary"
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Authentication */}
        {!isLoading && !data && (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}

        {!isLoading && data && (
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
