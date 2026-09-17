import RegisterForm from "@/components/form/register-form";
import Logo from "@/components/shared/Logo";
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

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="flex w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          {/*  LEFT PANEL*/}
          <div className="relative hidden lg:flex lg:w-[55%] flex-col overflow-hidden">
            {/* Image fills the entire panel */}
            <Image
              src="/doctors2.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />

            {/* Logo — top left */}
            <div className="relative z-10 flex items-center gap-2.5 p-8 pb-4">
              <Logo />
            </div>

            {/* Heading text overlaid on the image */}
            <div className="relative z-10 flex flex-1 flex-col justify-end px-9 pb-16">
              <p className="text-[13px] font-medium text-white/80">
                Join MediSync
              </p>
              <p className="mt-2 max-w-[300px] text-[26px] font-medium leading-tight text-white">
                Set up your profile once, book care across every clinic in the
                network.
              </p>
            </div>

            {/* Copyright */}
            <p className="relative z-10 pb-6 text-center text-[11px] text-white/70">
              Copyright © {new Date().getFullYear()} MediSync. All rights
              reserved.
            </p>
          </div>

          {/*  RIGHT PANEL */}
          <div className="flex w-full flex-col bg-[#f7f9fc] lg:w-[45%]">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-14">
              {/* Form Card — slightly more spacious than Login */}
              <div className="w-full max-w-[380px] rounded-2xl bg-white p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <RegisterForm />
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
                  <span>+880 1700-000000</span>
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
