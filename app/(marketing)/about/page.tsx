import type { Metadata } from "next";
import { HeartPulse, Target, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ambulink — a platform built to save lives by making emergency ambulance services fast and reliable.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#0a0f1c] text-slate-100">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
            About Ambulink
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Saving lives, one dispatch at a time
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Ambulink is an emergency ambulance dispatch platform built to
            connect patients with verified drivers within minutes — because
            every second matters.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "Make emergency medical transport accessible, transparent, and lightning-fast for everyone.",
            },
            {
              icon: Users,
              title: "Our People",
              text: "A network of licensed drivers, healthcare partners, and engineers working together 24/7.",
            },
            {
              icon: ShieldCheck,
              title: "Our Promise",
              text: "Every driver is verified, every trip is tracked, and every patient is prioritized.",
            },
            {
              icon: HeartPulse,
              title: "Our Impact",
              text: "Thousands of successful dispatches and a growing network across the country.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-rose-400">
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-10">
          <h2 className="text-2xl font-semibold text-white">
            Why we built this
          </h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            Emergency response times directly impact survival rates. Yet for
            many families, finding a reliable ambulance at the moment of crisis
            remains a challenge. Ambulink was created to close that gap — with
            real-time tracking, verified drivers, and a platform anyone can use
            in under a minute.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            We believe technology should serve people when they need it most.
            That&apos;s why we designed Ambulink to be fast, dependable, and
            accessible from any device.
          </p>
        </div>
      </section>
    </div>
  );
}