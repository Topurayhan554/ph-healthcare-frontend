"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  console.log(email);

  return (
    <div>
      <h1>This is Verify account form page</h1>
    </div>
  );
}
