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
import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import GoogleLoginButton from "../modules/google-login/googleLoginButton";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: () => {
          toast.add({
            title: "Login Success",
            description: "Welcome Back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization Failure",
            description:
              err.message || "Something went Wrong, Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup className="gap-3">
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
        </FieldGroup>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 text-[#64748b]">
            <input
              type="checkbox"
              className="size-3.5 rounded border-[#cbd5e1] accent-[#3b82f6]"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="font-medium text-[#3b82f6] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          disabled={loginPending}
          type="submit"
          className="mt-1 h-10 w-full rounded-lg bg-[#3b82f6] text-[15px] font-medium text-white hover:bg-[#2563eb] shadow-md shadow-blue-500/20"
        >
          {loginPending ? (
            <>
              <Spinner /> Signing
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <FieldSeparator className="mt-2">Or continue with</FieldSeparator>
      <div className="mt-4">
        <GoogleLoginButton
          successTitle="Logged In Successfully"
          successDescription="Welcome Back!"
          redirectTo="/"
        />
      </div>

      {/* Footer link */}
      <p className="mt-5 text-center text-[13px] text-[#64748b]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-[#ec4899] hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
