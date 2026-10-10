import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Radio,
  MapPin,
  Building2,
  ShieldCheck,
  Zap,
  Layers,
  Users,
  Network,
  ClipboardList,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DispatchMap } from "@/components/marketing/DispatchMap";

const trustItems = [
  { icon: Radio, label: "Real-Time Dispatch" },
  { icon: MapPin, label: "Ambulance Tracking" },
  { icon: Building2, label: "Hospital Coordination" },
  { icon: ShieldCheck, label: "Secure Access" },
];

const steps = [
  {
    num: "01",
    title: "Request emergency assistance",
    desc: "Patients submit an emergency request with location, priority, and situation details.",
  },
  {
    num: "02",
    title: "Coordinate ambulance dispatch",
    desc: "Admins review incoming requests and assign available drivers to each emergency.",
  },
  {
    num: "03",
    title: "Track response and arrival",
    desc: "Drivers update status through each phase — dispatch, en route, pickup, arrival.",
  },
];

const features = [
  {
    icon: ClipboardList,
    title: "Smart Emergency Requests",
    desc: "Multi-step intake with priority levels from low to critical, so the right response is dispatched every time.",
  },
  {
    icon: Users,
    title: "Ambulance & Driver Management",
    desc: "Admins manage driver profiles, licenses, and availability status from a single dashboard.",
  },
  {
    icon: MapPin,
    title: "Real-Time Location & Dispatch",
    desc: "Live pickup coordinates, hospital destination, and driver assignment flow through one system.",
  },
  {
    icon: Building2,
    title: "Hospital Coordination",
    desc: "Requests link to destination hospitals, keeping handoff coordinated from pickup to arrival.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    desc: "Strictly scoped access for patients, drivers, and admins — enforced at the API and UI level.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#0a0f1c] text-slate-100">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Ambient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 15% 10%, rgba(244, 63, 94, 0.10), transparent 70%), radial-gradient(50% 50% at 85% 15%, rgba(20, 184, 166, 0.06), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left */}
            <div className="max-w-xl">
              <div className="animate-slow-fade-up inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
                <span className="size-1 rounded-full bg-rose-500" />
                Emergency Response, Reimagined
              </div>

              <h1 className="animate-slow-fade-up-1 mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                Every Second Matters.
                <br />
                <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Every Response Counts.
                </span>
              </h1>

              <p className="animate-slow-fade-up-2 mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
                A smarter emergency dispatch platform connecting patients,
                ambulance teams, and healthcare providers when every second
                matters.
              </p>

              <div className="animate-slow-fade-up-3 mt-8 flex flex-wrap items-center gap-3">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="group h-12 rounded-lg bg-rose-600 px-6 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-500 hover:shadow-rose-500/30"
                  >
                    Request an Ambulance
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-lg border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/[0.08]"
                  >
                    Explore the Platform
                  </Button>
                </Link>
              </div>

              <div className="animate-slow-fade-up-4 mt-8 flex items-center gap-2.5 text-xs text-slate-500">
                <ShieldCheck className="size-3.5 text-teal-400" />
                Built for coordinated emergency response
              </div>
            </div>

            {/* Right — dispatch map */}
            <div className="animate-slow-fade-up-2 relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-transparent to-teal-500/10 blur-2xl"
              />
              <DispatchMap />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-300">
                    <Icon className="size-4" />
                  </span>
                  <span className="font-medium text-slate-300">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT SHOWCASE ==================== */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400">
              Product
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One connected system.{" "}
              <span className="text-slate-400">
                Faster emergency coordination.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1424]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"
            />

            {/* Fake dashboard preview */}
            <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-white/[0.06] p-5 lg:block">
                <div className="mb-6 flex items-center gap-2">
                  <span className="size-2 rounded-sm bg-rose-500" />
                  <span className="text-xs font-semibold tracking-tight text-white">
                    Ambulink Console
                  </span>
                </div>
                <nav className="space-y-1">
                  {[
                    "Overview",
                    "Requests",
                    "Dispatchers",
                    "Ambulances",
                    "Hospitals",
                    "Reports",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs ${
                        i === 0
                          ? "bg-white/[0.05] text-white"
                          : "text-slate-500"
                      }`}
                    >
                      <span className="size-1 rounded-full bg-current opacity-40" />
                      {item}
                    </div>
                  ))}
                </nav>
              </aside>

              {/* Content */}
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Operations Overview
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Today&apos;s dispatch activity
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[10px] text-slate-400">
                    <span className="size-1.5 rounded-full bg-teal-400" />
                    System healthy
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: ClipboardList, label: "Open Requests", value: "—" },
                    { icon: Users, label: "Available Drivers", value: "—" },
                    { icon: Building2, label: "Hospitals Linked", value: "—" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="size-4 text-slate-500" />
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                            Live
                          </span>
                        </div>
                        <p className="mt-3 text-2xl font-semibold text-white">
                          {s.value}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {s.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-300">
                      Dispatch Queue
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Auto-refresh
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-md border border-white/[0.04] bg-white/[0.01] p-2.5"
                      >
                        <span className="size-1.5 rounded-full bg-rose-500/60" />
                        <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]" />
                        <div className="h-1.5 w-16 rounded-full bg-white/[0.04]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] px-6 py-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Interface preview · Real data appears when connected to backend
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400">
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Three steps from request to arrival
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-rose-400">
                    {s.num}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-rose-500/40 to-transparent" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-6 hidden md:block">
                    <ArrowRight className="size-4 text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400">
              Capabilities
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Engineered for emergency operations
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  />
                  <span className="flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-300">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#111a2e] via-[#0d1424] to-[#0a0f1c] p-10 text-center sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent"
            />

            <div className="relative z-10">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                <Activity className="size-3 text-rose-400" />
                Ready when you are
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Be Ready When Every Second Counts.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
                Bring emergency requests, ambulance operations, and response
                coordination into one connected experience.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="group h-12 rounded-lg bg-rose-600 px-6 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-500"
                  >
                    Get Started
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-lg border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white hover:bg-white/[0.08]"
                  >
                    Explore Features
                    <ArrowUpRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-rose-600">
              <Layers className="size-3.5 text-white" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              Ambulink
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Built for coordinated emergency response.
          </p>
        </div>
      </div>
    </div>
  );
}