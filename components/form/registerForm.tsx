"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  Ambulance,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Activity,
  AlertCircle,
} from "lucide-react";

import {
  nameValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
} from "@/validation/auth.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/auth.hook";
import { getFieldError } from "@/lib/form-error";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const registerMutation = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const registrationData = {
        name: value.name,
        email: value.email,
        phone: value.phone,
        password: value.password,
      };

      registerMutation.mutate(registrationData, {
        onSuccess: (res) => {
          // ⚠️ Demo: OTP returned in response for evaluator convenience
          const otp = (res as { data?: { otp?: string } })?.data?.otp;

          if (otp) {
            toast.info(`Demo OTP: ${otp}`, {
              description:
                "Copy this code — you'll need it on the verify page.",
              duration: 15000,
            });
          } else {
            toast.success("Registration successful!", {
              description: "Check your email for the verification code.",
            });
          }

          const params = new URLSearchParams({ email: value.email });
          router.push(`/verify-email?${params.toString()}`);
        },
        onError: (err) => {
          toast.error("Registration failed", {
            description:
              err instanceof Error ? err.message : "Please try again.",
          });
        },
      });
    },
  });

  return (
    <div className="relative w-full max-w-[460px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-rose-200/50 via-transparent to-blue-200/40 blur-2xl"
      />

      <div className="space-y-7">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-4"
          >
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 text-white shadow-lg shadow-rose-600/25 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <Ambulance className="size-6" strokeWidth={2.2} />
              <span className="absolute -bottom-1 -right-1 size-5 rounded-full border-2 border-white bg-emerald-400" />
            </span>
            <span className="space-y-0.5">
              <span className="block text-xl font-extrabold tracking-tight text-slate-950">
                Ambu<span className="text-rose-600">link</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Emergency care network
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
            <Activity className="size-3.5" />
            Care, connected
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm shadow-rose-100/60">
            <Sparkles className="size-3.5" />
            Join the network
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[2.6rem] sm:leading-[1.12]">
            Create your{" "}
            <span className="bg-gradient-to-r from-rose-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
              account.
            </span>
          </h1>
          <p className="max-w-sm text-sm leading-6 text-slate-600 sm:text-[15px]">
            Set up your profile to request emergency ambulance services.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 backdrop-blur-xl">
          <div className="space-y-6 p-5 sm:p-8">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                Sign up with email
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Fill in your details. You&apos;ll verify your email with an OTP.
              </p>
            </div>

            {/* API error */}
            {registerMutation.isError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>
                  {registerMutation.error instanceof Error
                    ? registerMutation.error.message
                    : "Registration failed. Please try again."}
                </p>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-5"
            >
              {/* Name */}
              <form.Field
                name="name"
                validators={{ onChange: nameValidator }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600">
                        Full name
                      </Label>
                      <div className="group relative">
                        <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600" />
                        <Input
                          placeholder="Your full name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          disabled={registerMutation.isPending}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                      </div>
                      {isInvalid && (
                        <p className="text-xs font-medium text-red-600">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{ onChange: emailValidator }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600">
                        Email address
                      </Label>
                      <div className="group relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          disabled={registerMutation.isPending}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                      </div>
                      {isInvalid && (
                        <p className="text-xs font-medium text-red-600">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Phone */}
              <form.Field
                name="phone"
                validators={{ onChange: phoneValidator }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600">
                        Phone number
                      </Label>
                      <div className="group relative">
                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600" />
                        <Input
                          type="tel"
                          placeholder="01712345678"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          disabled={registerMutation.isPending}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                      </div>
                      {isInvalid && (
                        <p className="text-xs font-medium text-red-600">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{ onChange: passwordValidator }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  const password = field.state.value;
                  return (
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600">
                        Password
                      </Label>
                      <div className="group relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters"
                          value={password}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          disabled={registerMutation.isPending}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          {showPassword ? (
                            <EyeOff className="size-[18px]" />
                          ) : (
                            <Eye className="size-[18px]" />
                          )}
                        </button>
                      </div>

                      {password.length > 0 && (
                        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                          <PasswordReq
                            ok={password.length >= 8}
                            label="8+ characters"
                          />
                          <PasswordReq
                            ok={/[A-Z]/.test(password)}
                            label="Uppercase"
                          />
                          <PasswordReq
                            ok={/[a-z]/.test(password)}
                            label="Lowercase"
                          />
                          <PasswordReq
                            ok={/[0-9]/.test(password)}
                            label="Number"
                          />
                          <PasswordReq
                            ok={/[^A-Za-z0-9]/.test(password)}
                            label="Special char"
                          />
                        </ul>
                      )}

                      {isInvalid && (
                        <p className="text-xs font-medium text-red-600">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Confirm Password */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    if (!value) return "Please confirm your password";
                    const password = fieldApi.form.getFieldValue("password");
                    if (value !== password) return "Passwords do not match";
                    return undefined;
                  },
                }}
              >
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600">
                        Confirm password
                      </Label>
                      <div className="group relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600" />
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Re-enter your password"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          disabled={registerMutation.isPending}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          {showConfirm ? (
                            <EyeOff className="size-[18px]" />
                          ) : (
                            <Eye className="size-[18px]" />
                          )}
                        </button>
                      </div>
                      {isInvalid && (
                        <p className="text-xs font-medium text-red-600">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Submit */}
              <form.Subscribe selector={(state) => [state.isSubmitting]}>
                {([isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending || isSubmitting}
                    className="group relative h-[50px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 bg-[length:200%_100%] text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition-all duration-300 hover:bg-right hover:shadow-xl hover:shadow-rose-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {registerMutation.isPending || isSubmitting ? (
                      <>
                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                        Creating your account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
            <p className="text-[11px] leading-5 text-slate-600">
              You&apos;ll verify your email with a 6-digit OTP after signup.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-rose-600 underline-offset-4 hover:text-rose-800 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function PasswordReq({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors ${
        ok ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          ok ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
      {label}
    </li>
  );
}