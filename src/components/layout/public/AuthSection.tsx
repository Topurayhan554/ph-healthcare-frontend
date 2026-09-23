"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks";
import { UserMenu } from "./UserMenu";

export function AuthSection() {
  const { data, isLoading } = useGetMe();

  if (isLoading) {
    return <div className="h-9 w-24 animate-pulse rounded-full bg-gray-200" />;
  }

  if (data?.data) {
    return <UserMenu user={data.data} />;
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/register">
        <Button variant="ghost">Sign Up</Button>
      </Link>
      <Link href="/login">
        <Button className="rounded-full">Log In</Button>
      </Link>
    </div>
  );
}
