
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Activity,
  Ambulance,
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DemoRole = "admin" | "patient" | "driver";

const demoRoles = [
  {
    role: "admin" as const,
    label: "Admin",
    description: "Manage operations",
    Icon: ShieldCheck,
    accent: "group-hover:text-violet-600",
    hover: "hover:border-violet-300 hover:bg-violet-50/70",
  },
  {
    role: "patient" as const,
    label: "Patient",
    description: "Request an ambulance",
    Icon: UserRound,
    accent: "group-hover:text-rose-600",
    hover: "hover:border-rose-300 hover:bg-rose-50/70",
  },
  {
    role: "driver" as const,
    label: "Driver",
    description: "Manage your trips",
    Icon: Ambulance,
    accent: "group-hover:text-sky-600",
    hover: "hover:border-sky-300 hover:bg-sky-50/70",
  },
];

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<DemoRole | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const isAnyLoading = isLoading || demoLoading !== null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setNotice("");

    setIsLoading(true);

    try {
      // TODO: Connect to the real backend login API.
      // Never log passwords or pretend authentication succeeded.
      setNotice("Login API integration is pending.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: DemoRole) => {
    setError("");
    setNotice("");
    setDemoLoading(role);

    try {
      // TODO: Authenticate using dedicated demo accounts.
      // A real API response must determine access and redirection.
      setNotice(
        `${role.charAt(0).toUpperCase() + role.slice(1)} demo login is not connected yet.`,
      );
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="relative w-full max-w-[440px]">
      {/* Decorative background glow */}
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
            aria-label="Ambulink home"
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
            Your health, one step closer
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[2.6rem] sm:leading-[1.12]">
            Welcome
            <br />
            <span className="bg-gradient-to-r from-rose-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
              back.
            </span>
          </h1>

          <p className="max-w-sm text-sm leading-6 text-slate-600 sm:text-[15px]">
            Sign in to access your dashboard and stay connected to the care
            you need.
          </p>
        </div>

        {/* Login card */}
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 backdrop-blur-xl">
          <div className="space-y-6 p-5 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-950">
                  Sign in to your account
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Enter your credentials to continue.
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                <HeartPulse className="size-5" />
              </div>
            </div>

            {/* Feedback */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {notice && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{notice}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600"
                >
                  Email address
                </Label>

                <div className="group relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600"
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      setNotice("");
                    }}
                    required
                    disabled={isAnyLoading}
                    className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label
                    htmlFor="password"
                    className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-600"
                  >
                    Password
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-rose-600 underline-offset-4 transition-colors hover:text-rose-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-rose-600"
                  />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                      setNotice("");
                    }}
                    required
                    disabled={isAnyLoading}
                    className="h-[50px] rounded-xl border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-rose-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-rose-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={isAnyLoading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="size-[18px]" />
                    ) : (
                      <Eye className="size-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isAnyLoading}
                className="group relative h-[50px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 bg-[length:200%_100%] text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition-all duration-300 hover:bg-right hover:shadow-xl hover:shadow-rose-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign in securely
                    <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Or explore a demo
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Demo roles */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {demoRoles.map(({ role, label, description, Icon, accent, hover }) => {
                const isRoleLoading = demoLoading === role;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleDemoLogin(role)}
                    disabled={isAnyLoading}
                    aria-label={`Try ${label} demo login`}
                    className={`group flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-1.5 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:px-2 ${hover}`}
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-white">
                      {isRoleLoading ? (
                        <LoaderCircle className="size-5 animate-spin text-rose-600" />
                      ) : (
                        <Icon className={`size-5 transition-colors ${accent}`} />
                      )}
                    </span>

                    <span className="text-xs font-bold text-slate-900">
                      {label}
                    </span>

                    <span className="text-[10px] leading-4 text-slate-500">
                      {description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
            <p className="text-[11px] leading-5 text-slate-600">
              Your account access is protected by the authentication system.
            </p>
          </div>
        </div>

        {/* Bottom links */}
        <div className="space-y-4 text-center">
          <p className="text-sm text-slate-600">
            New to Ambulink?{" "}
            <Link
              href="/register"
              className="font-bold text-rose-600 underline-offset-4 transition-colors hover:text-rose-800 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Built for faster access to emergency care
            <ArrowDownRight className="size-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}