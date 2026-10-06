"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { useVerifyEmail } from "@/hooks/auth.hook";
import { useAuthStore } from "@/stores/auth-store";
import { verifyAccountSchema } from "@/validation/auth.validation";


const RESEND_COOLDOWN = 120;

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verify, isPending } = useVerifyEmail();
  const email = searchParams.get("email") || "";

  // Redirect if no email in query
  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const form = useForm({
    defaultValues: { otp: "" },
    validators: { onSubmit: verifyAccountSchema },
    onSubmit: ({ value }) => {
      verify(
        { email, otp: value.otp },
        {
          onSuccess: (res) => {
            const { user, accessToken } = res.data;
            setAuth(user, accessToken);

            toast.success("Verification successful", {
              description: `Welcome, ${user.name}!`,
            });

            if (user.role === "ADMIN") router.push("/admin");
            else if (user.role === "DRIVER") router.push("/provider");
            else router.push("/dashboard");
          },
          onError: (err) => {
            form.reset();
            toast.error("Verification failed", {
              description:
                err instanceof Error
                  ? err.message
                  : "Something went wrong. Please try again",
            });
          },
        },
      );
    },
  });

  if (!email) return null;

  return (
    <Card className="w-full max-w-[460px] overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 backdrop-blur-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-950">
          Verify your email
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">
          We sent a 6-digit code to{" "}
          <strong className="text-slate-700">{email}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor="otp"
                    className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600"
                  >
                    Verification code
                  </FieldLabel>

                  <InputOTP
                    maxLength={6}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    name="otp"
                    id="otp"
                    pattern={REGEXP_ONLY_DIGITS}
                    disabled={isPending}
                  >
                    <InputOTPGroup className="w-full justify-center gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="size-12 rounded-lg border text-lg"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                  <FieldDescription className="text-center text-xs">
                    Resend in {resendTimer}s
                  </FieldDescription>
                </Field>
              );
            }}
          </form.Field>
        </form>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={resendTimer > 0 || isPending}
          className="flex-1"
        
        >
          Resend
        </Button>
        <Button
          type="submit"
          form="otp-form"
          disabled={isPending}
          className="flex-1 bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 text-white"
        >
          {isPending ? (
            <>
              <LoaderCircle className="mr-2 size-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}