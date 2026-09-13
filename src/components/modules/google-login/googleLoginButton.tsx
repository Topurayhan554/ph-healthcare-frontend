"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useGoogleOAuth } from "@/hooks";
import { toast } from "@/components/ui/toast";

interface GoogleLoginButtonProps {
  successTitle?: string;
  successDescription?: string;
  redirectTo?: string;
}

export default function GoogleLoginButton({
  successTitle = "Logged In Successfully",
  successDescription = "Welcome Back!",
  redirectTo = "/",
}: GoogleLoginButtonProps) {
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: successTitle,
            description: successDescription,
            type: "success",
          });
          router.push(redirectTo);
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}
