import Link from "next/link";
import {
  Ambulance,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Phone,
  Activity,
  Zap,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-rose-50/40">
      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-rose-400/20 blur-[120px]"
      />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-8 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-1.5 text-xs font-semibold text-rose-700 shadow-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-rose-500" />
              Emergency service available 24/7
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Ambulance at your
              <br />
              doorstep in{" "}
              <span className="bg-gradient-to-r from-rose-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
                minutes.
              </span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-slate-600">
              Fast, reliable emergency ambulance dispatch. Request an
              ambulance, track it live, and get to the hospital safely — all in
              one platform.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="group h-12 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-6 text-sm font-bold shadow-lg shadow-rose-600/25 hover:shadow-xl"
                >
                  Request Ambulance
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl px-6 text-sm font-semibold"
                >
                  <Phone className="mr-2 size-4" />
                  Try Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Verified drivers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Real-time tracking
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Secure payments
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                      <HeartPulse className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        Emergency Request
                      </p>
                      <p className="text-xs text-slate-500">Just now</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-800">
                    HIGH
                  </span>
                </div>

                <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Pickup
                      </p>
                      <p className="text-slate-700">Dhanmondi, Dhaka</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        ETA
                      </p>
                      <p className="font-bold text-slate-900">~4 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Request received", done: true },
                    { label: "Driver assigned", done: true },
                    { label: "On the way", done: true, active: true },
                    { label: "Arrived at hospital", done: false },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span
                        className={`size-2.5 rounded-full ${
                          s.active
                            ? "animate-pulse bg-rose-600 ring-4 ring-rose-100"
                            : s.done
                              ? "bg-emerald-500"
                              : "bg-slate-300"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          s.done
                            ? "font-medium text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-12 hidden rounded-2xl border bg-white p-3 shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="size-4" />
                </span>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Verified</p>
                  <p className="text-slate-500">Driver</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-12 hidden rounded-2xl border bg-white p-3 shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Zap className="size-4" />
                </span>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Fast</p>
                  <p className="text-slate-500">Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y bg-white/70 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-8 lg:grid-cols-4">
          {[
            { value: "24/7", label: "Emergency support" },
            { value: "<5min", label: "Avg response time" },
            { value: "100%", label: "Verified drivers" },
            { value: "10K+", label: "Lives reached" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-rose-600 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need in an emergency
          </h2>
          <p className="mt-3 text-slate-600">
            Built for speed, trust, and reliability.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Instant Dispatch",
              desc: "Request an ambulance in seconds. Our system dispatches the nearest available driver automatically.",
            },
            {
              icon: MapPin,
              title: "Live Tracking",
              desc: "Track your ambulance in real-time. Know exactly when help will arrive.",
            },
            {
              icon: ShieldCheck,
              title: "Verified Drivers",
              desc: "All drivers are licensed and verified. Your safety is our priority.",
            },
            {
              icon: HeartPulse,
              title: "Multiple Ambulance Types",
              desc: "Choose from Basic, Advanced, or ICU-equipped ambulances based on the emergency.",
            },
            {
              icon: Activity,
              title: "Real-time Updates",
              desc: "Get notified at every step — from dispatch to arrival at the hospital.",
            },
            {
              icon: Clock,
              title: "24/7 Available",
              desc: "Emergencies don't wait. Neither do we. Available round the clock.",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-950">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 p-10 text-center shadow-2xl sm:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready when you need us most
            </h2>
            <p className="mx-auto max-w-xl text-white/90">
              Create your account in under a minute and get access to emergency
              ambulance services anytime, anywhere.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 rounded-xl bg-white px-6 text-sm font-bold text-rose-700 hover:bg-slate-100"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-white/40 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}