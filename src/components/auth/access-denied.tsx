import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 bg-background px-4 text-center">
      <div className="p-4 rounded-full bg-destructive/10">
        <ShieldAlert className="size-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-foreground">
          You do not have access to this page
        </h1>
        <p className="text-sm text-muted-foreground">
          Go back to{" "}
          <Link
            href="/"
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
