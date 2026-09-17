import DoctorApplyForm from "@/components/form/apply-doctor-form";
import Image from "next/image";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-[#1e2a4a]">
      {/* Background image */}
      <Image
        src="/doctors6.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a]/30 via-[#2a3a5c]/15 to-[#2f6ae8]/10" />

      <div className="pointer-events-none absolute left-10 top-1/4 h-24 w-24 rounded-full bg-[#ff6b9d]/30 blur-2xl" />
      <div className="pointer-events-none absolute right-16 top-1/3 h-32 w-32 rounded-full bg-[#a78bfa]/30 blur-2xl" />

      <div className="absolute left-4 top-4 z-20 sm:left-8 sm:top-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Image
              src="/medisync-logo.png"
              alt="MediSync"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-white sm:text-xl drop-shadow-md">
            MediSync
          </span>
        </Link>
      </div>

      <div className="relative z-10 flex min-h-svh items-center justify-center p-4 pt-24 sm:p-6 sm:pt-28 lg:p-10 lg:pt-28">
        <div className="w-full max-w-4xl">
          <div className="rounded-[28px] border border-white/25 bg-white/5 p-6 shadow-2xl sm:p-10">
            <DoctorApplyForm />
          </div>

          {/* Copyright */}
          <p className="mt-6 text-center text-[11px] text-white/70">
            Copyright © {new Date().getFullYear()} MediSync. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
