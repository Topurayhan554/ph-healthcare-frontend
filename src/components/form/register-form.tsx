"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { signupSchema } from "@/validation";
import GoogleLoginButton from "../modules/google-login/googleLoginButton";
import { useRegistration } from "@/hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { mutate: registration } = useRegistration();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      const registrationData = {
        name: value.fullName,
        email: value.email,
        password: value.password,
        patient: {
          contactNumber: value.phoneNumber,
        },
      };

      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Registration Successfully",
            description: "Please verify your email",
            type: "success",
          });

          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err) => {
          toast.add({
            title: "Authorization Failure",
            description: err.message || "",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <>
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-6">
        <Link
          href="/register"
          className="relative pb-2 text-[15px] font-semibold text-[#1e293b]"
        >
          Sign Up
          <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#3b82f6]" />
        </Link>
        <Link
          href="/login"
          className="pb-2 text-[15px] font-medium text-[#94a3b8] transition hover:text-[#64748b]"
        >
          Sign In
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup className="gap-3">
          {/* Full Name */}
          <form.Field name="fullName">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[13px] font-medium text-[#334155]"
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Aldrego"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-9 border-0 border-b border-[#e2e8f0] rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[13px] font-medium text-[#334155]"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Aldrego@email.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-9 border-0 border-b border-[#e2e8f0] rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Phone Number */}
          <form.Field name="phoneNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[13px] font-medium text-[#334155]"
                  >
                    Phone Number
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-9 border-0 border-b border-[#e2e8f0] rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[13px] font-medium text-[#334155]"
                  >
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-9 border-0 border-b border-[#e2e8f0] rounded-none px-0 pr-8 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]"
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[13px] font-medium text-[#334155]"
                  >
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-9 border-0 border-b border-[#e2e8f0] rounded-none px-0 pr-8 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]"
                    >
                      {showConfirmPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="mt-1 h-10 w-full rounded-lg bg-[#3b82f6] text-[15px] font-medium text-white hover:bg-[#2563eb] shadow-md shadow-blue-500/20"
        >
          Create Account
        </Button>

        <FieldSeparator className="mt-2">Or continue with</FieldSeparator>
        <div className="mt-4">
          <GoogleLoginButton
            successTitle="Signed Up Successfully"
            successDescription="Welcome to MediSync!"
            redirectTo="/"
          />
        </div>

        {/* Footer link */}
        <p className="mt-5 text-center text-[13px] text-[#64748b]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#ec4899] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
