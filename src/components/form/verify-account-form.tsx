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
import { useVeifyAccount } from "@/hooks";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120;

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInValid, setIsInValid] = useState(false);
  const { mutate: verify, isPending: verifyPending } = useVeifyAccount();
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const email = searchParams.get("email") || "";
  console.log(email);

  useEffect(() => {
    if (!email) {
      router.push("./");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInValid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Verification Failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });
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
        toast.add({
          title: "Verification Failed",
          description:
            err.message || "Invalid or expired OTP. Please try again.",
          type: "error",
        });
      },
    });

    console.log("Click->", verifyData);
  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>

        <CardDescription>
          Please provide the OTP we sent to your email.
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

            <FieldDescription>Resend in {resendTimer}</FieldDescription>
          </Field>

          {isInValid && (
            <FieldError
              errors={[{ message: "Invalid code please try again" }]}
            />
          )}
        </form>
      </CardContent>

      <CardFooter>
        <Button disabled={resendTimer > 0}>Resend</Button>

        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
