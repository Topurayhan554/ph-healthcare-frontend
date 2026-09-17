"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVeifyAccount, useResendOtp, useVerifyDoctorAccount } from "@/hooks";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120; // seconds
const RESEND_STORAGE_PREFIX = "otp_resend_expiry";

function getStorageKey(email: string) {
  return `${RESEND_STORAGE_PREFIX}:${email}`;
}

function readExpiry(email: string): number | null {
  try {
    const raw = localStorage.getItem(getStorageKey(email));
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
}

function writeExpiry(email: string, expiry: number) {
  try {
    localStorage.setItem(getStorageKey(email), String(expiry));
  } catch {}
}

function getRemainingSeconds(expiry: number) {
  return Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
}

export default function VerifyAccountForm({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInValid, setIsInValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Invalid code please try again",
  );
  const { mutate: verifyPatient, isPending: verifyPending } = useVeifyAccount();
  const { mutate: resendOtp, isPending: resendPending } = useResendOtp();
  const { mutate: verifyDoctor } = useVerifyDoctorAccount();

  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (!email) return;

    let expiry = readExpiry(email);

    if (!expiry || getRemainingSeconds(expiry) <= 0) {
      expiry = Date.now() + RESEND_COOLDOWN * 1000;
      writeExpiry(email, expiry);
    }

    setResendTimer(getRemainingSeconds(expiry));
  }, [email]);

  useEffect(() => {
    if (!email || resendTimer <= 0) return;

    const interval = setInterval(() => {
      const expiry = readExpiry(email) ?? Date.now();
      const remaining = getRemainingSeconds(expiry);
      setResendTimer(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer, email]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setErrorMessage("Please enter the full 6-digit code");
      setIsInValid(true);
      return;
    }

    const verifyData = { email, otp };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          setErrorMessage("Invalid or expired OTP. Please try again.");
          setIsInValid(true);
          toast.add({
            title: "Verification Failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });
          return;
        }

        if (mode === "doctor") {
          toast.add({
            title: "Verification Successful",
            description:
              "An admin will approve your account. This may take time. Please check your email in few days.",
            type: "success",
          });

          router.push("/");
          return;
        }

        toast.add({
          title: "Account Verified",
          description: "Your email has been verified successfully.",
          type: "success",
        });

        router.push("/");
      },
      onError: (err) => {
        setErrorMessage(
          err.message || "Invalid or expired OTP. Please try again.",
        );
        setIsInValid(true);
        toast.add({
          title: "Verification Failed",
          description:
            err.message || "Invalid or expired OTP. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleResend = () => {
    if (resendTimer > 0 || resendPending) return;

    resendOtp(
      { email },
      {
        onSuccess: () => {
          const expiry = Date.now() + RESEND_COOLDOWN * 1000;
          writeExpiry(email, expiry);
          setResendTimer(RESEND_COOLDOWN);
          toast.add({
            title: "OTP Sent",
            description: "A new code has been sent to your email.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Failed to resend",
            description: err.message || "Please try again later.",
            type: "error",
          });
        },
      },
    );
  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we sent to {email}.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInValid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>

            <InputOTP
              name="otp"
              id="otp"
              value={otp}
              pattern={REGEXP_ONLY_DIGITS}
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInValid) {
                  setIsInValid(false);
                }
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <FieldDescription>
              {resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "You can resend the code now"}
            </FieldDescription>
          </Field>

          {isInValid && <FieldError errors={[{ message: errorMessage }]} />}
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          variant="outline"
          disabled={resendTimer > 0 || resendPending}
          onClick={handleResend}
        >
          {resendPending ? "Sending..." : "Resend"}
        </Button>

        <Button type="submit" form="otp-form" disabled={verifyPending}>
          {verifyPending ? "Verifying..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
