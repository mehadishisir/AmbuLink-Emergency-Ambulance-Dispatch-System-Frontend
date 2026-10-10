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
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-rose-600">
            Our Services
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Emergency care, when you need it
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            From basic transport to full ICU support — we have the right
            ambulance for every situation.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
                <p className="mt-4 text-sm font-bold text-rose-600">{s.price}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-br from-rose-600 to-red-700 p-10 text-center text-white sm:p-14">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to request an ambulance?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Sign up in under a minute and get access to emergency services
            anytime.
          </p>
          <Link href="/register" className="mt-6 inline-block">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-white px-6 text-rose-700 hover:bg-slate-100"
            >
              Get Started
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}