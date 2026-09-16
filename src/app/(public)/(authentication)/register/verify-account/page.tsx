import VerifyAccountForm from "@/components/form/verify-account-form";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div>
      <h1>This is verify component</h1>
      <Suspense>
        <VerifyAccountForm />
      </Suspense>
    </div>
  );
}
