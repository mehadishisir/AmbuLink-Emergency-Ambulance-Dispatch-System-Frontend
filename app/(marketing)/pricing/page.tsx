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
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-rose-600">
            Pricing
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            No hidden fees. Pay only for the service you use. All prices in USD.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 ${
                plan.highlight
                  ? "border-rose-300 bg-gradient-to-br from-rose-50 to-white shadow-xl ring-2 ring-rose-500/20"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-slate-950">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-rose-600">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-500">/{plan.unit}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8 block">
                <Button
                  className={`h-11 w-full rounded-xl text-sm font-bold ${
                    plan.highlight
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-slate-900 hover:bg-slate-800"
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