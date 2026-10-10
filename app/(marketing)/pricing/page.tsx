import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, upfront pricing for emergency ambulance services. No hidden fees.",
};

const plans = [
  {
    name: "Basic",
    price: "$50",
    unit: "per trip",
    features: [
      "Basic life support ambulance",
      "Trained driver",
      "Standard pickup & drop",
      "Live tracking",
    ],
    highlight: false,
  },
  {
    name: "Advanced",
    price: "$100",
    unit: "per trip",
    features: [
      "Advanced life support equipment",
      "Paramedic on board",
      "Priority dispatch",
      "Live tracking + updates",
      "Direct hospital coordination",
    ],
    highlight: true,
  },
  {
    name: "ICU",
    price: "$200",
    unit: "per trip",
    features: [
      "Full ICU ambulance",
      "Ventilator + defibrillator",
      "Critical care paramedic",
      "Fastest dispatch priority",
      "Direct hospital coordination",
      "Family live tracking",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[#0a0f1c] text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
            Pricing
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            No hidden fees. Pay only for the service you use. All prices in USD.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition ${
                plan.highlight
                  ? "border-rose-500/30 bg-gradient-to-br from-rose-500/[0.08] via-[#0d1424] to-[#0a0f1c] shadow-2xl shadow-rose-500/10"
                  : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/30">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-500">/{plan.unit}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-teal-500/10">
                      <Check className="size-2.5 text-teal-400" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8 block">
                <Button
                  className={`h-11 w-full rounded-lg text-sm font-semibold transition ${
                    plan.highlight
                      ? "bg-rose-600 text-white hover:bg-rose-500"
                      : "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          All prices are estimates. Final amount depends on distance and
          location.
        </p>
      </section>
    </div>
  );
}