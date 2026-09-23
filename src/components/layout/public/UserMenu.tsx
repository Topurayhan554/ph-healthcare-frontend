"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { ChevronDown, LogOut, User } from "lucide-react";

interface UserMenuProps {
  user: {
    name?: string;
    email?: string;
    avatar?: string;
    role: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();

  // বাইরে ক্লিক করলে dropdown বন্ধ হবে
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged Out Successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
        setOpen(false);
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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border bg-white px-2 py-1 hover:bg-gray-50 transition"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name ?? "User"}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={16} />
          </div>
        )}
        <span className="text-sm font-medium max-w-[100px] truncate">
          {user.name ?? "Account"}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg z-50">
          <div className="px-3 py-2 border-b mb-1">
            <p className="text-sm font-semibold truncate">
              {user.name ?? "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
          >
            <User size={16} /> My Profile
          </Link>

          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut size={16} /> {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
