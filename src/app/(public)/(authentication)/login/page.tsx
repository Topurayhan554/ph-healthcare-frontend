import LoginForm from "@/components/form/login-form";
import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

const socialIcons = [
  { name: "linkedin", Icon: FaLinkedinIn },
  { name: "instagram", Icon: FaInstagram },
  { name: "facebook", Icon: FaFacebookF },
  { name: "twitter", Icon: FaTwitter },
  { name: "pinterest", Icon: FaPinterestP },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#2a3a5c] to-[#e83e8c]" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#ff4d94] to-transparent opacity-90" /> */}

      {/* Dotted pattern */}
      {/* <div
        className="absolute right-0 top-0 h-full w-[45%] opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      /> */}

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          {/*  LEFT PANEL  */}
          <div className="relative hidden w-1/2 flex-col overflow-hidden bg-gradient-to-br from-[#4f8cff] via-[#3b7bf5] to-[#2f6ae8] lg:flex">
            {/* Curved right edge */}
            <div className="absolute right-0 top-0 z-20 h-full w-20">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full fill-[#f7f9fc]"
              >
                <path d="M100 0 H45 C20 10 20 25 40 35 C65 45 75 55 60 70 C40 85 20 85 45 100 H100 Z" />
              </svg>
            </div>

            {/* Logo */}

            <div className="relative z-10 flex items-center gap-2.5 p-8 pb-4">
              <div className="relative h-15 w-15 ">
                <Image
                  src="/medisync-logo.png"
                  alt="MediSync"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>

            {/* Doctor Image */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6">
              {/* Abstract colorful shapes behind image */}
              <div className="absolute left-6 top-1/4 h-20 w-20 rounded-full bg-[#ff6b9d]/60 blur-[2px]" />
              <div className="absolute left-12 top-[38%] h-28 w-10 rotate-[20deg] rounded-full bg-gradient-to-b from-[#ffd166] to-[#ff9f43]" />
              <div className="absolute left-20 top-[30%] h-36 w-12 -rotate-12 rounded-full bg-gradient-to-b from-[#ff6b9d] to-[#c44dff]" />
              <div className="absolute right-16 top-[34%] h-44 w-16 rotate-12 rounded-full bg-gradient-to-b from-[#a78bfa] to-[#6366f1] opacity-70" />

              {/* Full doctor image, floating with its own shadow */}
              <div className="relative z-10 -translate-y-4">
                <div className="relative h-[420px] w-[500px]">
                  <Image
                    src="/login-doctor10.png"
                    alt="Doctor"
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                  />
                </div>
                <div className="mx-auto -mt-3 h-5 w-40 rounded-full bg-black/25 blur-xl" />
              </div>
            </div>

            {/* Copyright */}
            <p className="relative z-10 pb-6 text-center text-[11px] text-white/70">
              Copyright © {new Date().getFullYear()} MediSync. All rights
              reserved.
            </p>
          </div>

          {/*  RIGHT PANEL  */}
          <div className="flex w-full flex-col bg-[#f7f9fc] lg:w-1/2">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-12">
              {/* Form Card */}
              <div className="w-full max-w-[340px] rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                {/* Tabs */}
                <div className="mb-7 flex items-center gap-6">
                  <Link
                    href="/register"
                    className="pb-2 text-[15px] font-medium text-[#94a3b8] transition hover:text-[#64748b]"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="relative pb-2 text-[15px] font-semibold text-[#1e293b]"
                  >
                    Sign In
                    <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#3b82f6]" />
                  </Link>
                </div>

                <LoginForm />
              </div>
            </div>

            {/* Bottom social + contact */}
            <div className="pb-8 pt-2">
              <div className="mb-5 flex justify-center gap-5">
                {socialIcons.map(({ name, Icon }) => (
                  <Link
                    key={name}
                    href="#"
                    className="text-[#94a3b8] transition hover:text-[#3b82f6]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1.5 text-[12px] text-[#94a3b8] sm:flex-row sm:justify-center sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <HiOutlinePhone className="h-3.5 w-3.5" />
                  <span>+880 1700-000000</span>{" "}
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineMail className="h-3.5 w-3.5" />
                  <span>support@medisync.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
