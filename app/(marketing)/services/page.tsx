import type { Metadata } from "next";
import Link from "next/link";
import {
  Ambulance,
  HeartPulse,
  Activity,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Ambulink's emergency ambulance services — Basic, Advanced, ICU, and more.",
};

const services = [
  {
    icon: Ambulance,
    title: "Basic Life Support",
    desc: "Standard ambulance for non-critical transport with trained drivers and essential equipment.",
    price: "from $50",
  },
  {
    icon: Activity,
    title: "Advanced Life Support",
    desc: "Equipped with cardiac monitors, oxygen, and advanced life support equipment.",
    price: "from $100",
  },
  {
    icon: HeartPulse,
    title: "ICU Ambulance",
    desc: "Fully equipped mobile ICU with ventilator, defibrillator, and paramedic support.",
    price: "from $200",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Dispatch",
    desc: "Round-the-clock emergency response — day or night, weekday or holiday.",
    price: "Always available",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    desc: "Track your ambulance live from request to arrival at the hospital.",
    price: "Included",
  },
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    desc: "Every driver is licensed, background-checked, and rated by patients.",
    price: "Guaranteed",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0f1c] text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
            Our Services
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Emergency care, when you need it
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            From basic transport to full ICU support — we have the right
            ambulance for every situation.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.03]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span className="flex size-12 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-rose-400 transition-colors group-hover:border-rose-500/30 group-hover:bg-rose-500/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {s.desc}
                </p>
                <p className="mt-4 text-sm font-semibold text-rose-400">
                  {s.price}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111a2e] via-[#0d1424] to-[#0a0f1c] p-10 text-center sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent"
          />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Ready to request an ambulance?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Sign up in under a minute and get access to emergency services
              anytime.
            </p>
            <Link href="/register" className="mt-6 inline-block">
              <Button
                size="lg"
                className="group h-12 rounded-lg bg-rose-600 px-6 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500"
              >
                Get Started
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}