"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ============================================
// Validation Rules (Backend-compatible)
// ============================================
const passwordChecks = {
  minLength: (v: string) => v.length >= 8,
  hasUpper: (v: string) => /[A-Z]/.test(v),
  hasLower: (v: string) => /[a-z]/.test(v),
  hasNumber: (v: string) => /[0-9]/.test(v),
  hasSpecial: (v: string) => /[^A-Za-z0-9]/.test(v),
};

function validatePassword(v: string): string | undefined {
  if (!v) return "Password is required";
  if (!passwordChecks.minLength(v))
    return "Password must be at least 8 characters";
  if (!passwordChecks.hasUpper(v))
    return "Password must contain an uppercase letter";
  if (!passwordChecks.hasLower(v))
    return "Password must contain a lowercase letter";
  if (!passwordChecks.hasNumber(v)) return "Password must contain a number";
  if (!passwordChecks.hasSpecial(v))
    return "Password must contain a special character";
  return undefined;
}

const rules = {
  name: (v: string) =>
    !v
      ? "Name is required"
      : v.length < 3
        ? "Name must be at least 3 characters"
        : undefined,
  email: (v: string) =>
    !v
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Please enter a valid email address"
        : undefined,
  phone: (v: string) =>
    !v
      ? "Phone number is required"
      : !/^(\+?880|0)1[3-9]\d{8}$/.test(v)
        ? "Enter a valid Bangladeshi phone number (e.g. 01712345678)"
        : undefined,
  password: validatePassword,
};

function getErrorMessage(errors: unknown[]): string | undefined {
  if (!errors || errors.length === 0) return undefined;
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    return String((first as { message: unknown }).message);
  }
  return undefined;
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setError("");
      setNotice("");
      setIsLoading(true);

      try {
        // ⚠️ কখনো password log করব না
        console.log("Register submit:", {
          name: value.name,
          email: value.email,
          phone: value.phone,
        });

        // TODO: Day 3 — POST /api/auth/register
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     name: value.name,
        //     email: value.email,
        //     phone: value.phone,
        //     password: value.password,
        //   }),
        // });
        // if (!res.ok) {
        //   const data = await res.json().catch(() => null);
        //   throw new Error(data?.message || "Registration failed");
        // }
        // router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);

        setNotice(
          "Registration API integration is pending. It will connect in Day 3.",
        );
      } catch (err) {
        // 🔴 Backend error message দেখাব
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
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

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Notice */}
            {notice && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{notice}</p>
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
                validators={{
                  onChange: ({ value }) => rules.name(value),
                }}
              >
                {(field) => {
                  const err = getErrorMessage(field.state.meta.errors);
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
                          disabled={isLoading}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                      </div>
                      {err && field.state.meta.isTouched && (
                        <p className="text-xs font-medium text-red-600">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => rules.email(value),
                }}
              >
                {(field) => {
                  const err = getErrorMessage(field.state.meta.errors);
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
                          disabled={isLoading}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                      </div>
                      {err && field.state.meta.isTouched && (
                        <p className="text-xs font-medium text-red-600">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Phone */}
              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) => rules.phone(value),
                }}
              >
                {(field) => {
                  const err = getErrorMessage(field.state.meta.errors);
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
                          disabled={isLoading}
                          className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm placeholder:text-slate-400 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                        />
                      </div>
                      {err && field.state.meta.isTouched && (
                        <p className="text-xs font-medium text-red-600">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => rules.password(value),
                }}
              >
                {(field) => {
                  const err = getErrorMessage(field.state.meta.errors);
                  const pw = field.state.value;
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
                          value={pw}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          disabled={isLoading}
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

                      {/* Live password requirements */}
                      {pw.length > 0 && (
                        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                          <PasswordReq
                            ok={passwordChecks.minLength(pw)}
                            label="8+ characters"
                          />
                          <PasswordReq
                            ok={passwordChecks.hasUpper(pw)}
                            label="Uppercase"
                          />
                          <PasswordReq
                            ok={passwordChecks.hasLower(pw)}
                            label="Lowercase"
                          />
                          <PasswordReq
                            ok={passwordChecks.hasNumber(pw)}
                            label="Number"
                          />
                          <PasswordReq
                            ok={passwordChecks.hasSpecial(pw)}
                            label="Special char"
                          />
                        </ul>
                      )}

                      {err && field.state.meta.isTouched && (
                        <p className="text-xs font-medium text-red-600">
                          {err}
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
                  const err = getErrorMessage(field.state.meta.errors);
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
                          disabled={isLoading}
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
                      {err && field.state.meta.isTouched && (
                        <p className="text-xs font-medium text-red-600">
                          {err}
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
                    disabled={isLoading || isSubmitting}
                    className="group relative h-[50px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 bg-[length:200%_100%] text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition-all duration-300 hover:bg-right hover:shadow-xl hover:shadow-rose-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading || isSubmitting ? (
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

// ============================================
// Live password requirement indicator
// ============================================
function PasswordReq({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors ${
        ok ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-slate-300"}`}
      />
      {label}
    </li>
  );
}