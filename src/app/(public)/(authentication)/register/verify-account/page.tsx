import VerifyAccountForm from "@/components/form/verify-account-form";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyAccountForm />
      </Suspense>
    </div>
  );
}
