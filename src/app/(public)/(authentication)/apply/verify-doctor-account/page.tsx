import VerifyAccountForm from "@/components/form/verify-account-form";
import { VerifyFormSkeleton } from "@/components/shared/verify-form-skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyDoctorAccountPage() {
  return (
    <div className="min-h-screen w-full bg-[#f7f9fc] relative overflow-hidden">
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2.5"
      >
        <div className="relative h-14 w-14">
          <Image
            src="/medisync-logo.png"
            alt="MediSync"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      <div className="relative z-0 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="flex w-full max-w-md flex-col items-center">
          {/* Form Card */}
          <div className="w-full rounded-2xl bg-white p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-[#0f172a]">
                Verify Your Doctor Account
              </h1>
              <p className="mt-1 text-sm text-[#94a3b8]">
                Enter the OTP sent to your email or phone to continue
              </p>
            </div>

            <Suspense fallback={<VerifyFormSkeleton />}>
              <VerifyAccountForm mode="doctor" />
            </Suspense>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-center text-[11px] text-[#94a3b8]">
            Copyright © {new Date().getFullYear()} MediSync. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
