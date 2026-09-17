import { LoaderIcon } from "lucide-react";

export default function AuthLoading({
  label = "Verify account",
}: {
  label?: string;
}) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-background">
      <LoaderIcon className="size-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
