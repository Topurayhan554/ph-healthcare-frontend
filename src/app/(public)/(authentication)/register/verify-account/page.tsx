import VerifyAccountForm from "@/components/form/verify-account-form";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div>
      <h1>Hello verify</h1>
      <Suspense>
        <VerifyAccountForm />
      </Suspense>
    </div>
  );
}
