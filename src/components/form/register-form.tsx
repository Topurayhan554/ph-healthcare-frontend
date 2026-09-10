"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { signupSchema } from "@/validation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <>
      {/* Tabs */}
      <div className="mb-8 flex items-center gap-6">
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
        className="space-y-6"
      >
        <FieldGroup className="gap-6">
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
                    className="h-10 border-0 border-b border-[#e2e8f0] rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
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
                    className="h-10 border-0 border-b border-[#e2e8f0] rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
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
                      className="h-10 border-0 border-b border-[#e2e8f0] rounded-none px-0 pr-8 shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-[#94a3b8]"
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
        </FieldGroup>

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg bg-[#3b82f6] text-[15px] font-medium text-white hover:bg-[#2563eb] shadow-md shadow-blue-500/20"
        >
          Create Account
        </Button>

        {/* Footer link */}
        <p className="pt-1 text-center text-[13px]">
          <Link
            href="/login"
            className="font-medium text-[#ec4899] hover:underline"
          >
            I have an Account?
          </Link>
        </p>
      </form>
    </>
  );
}
