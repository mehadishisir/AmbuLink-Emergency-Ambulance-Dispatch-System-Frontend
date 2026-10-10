import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ambulink. Support, partnerships, or feedback — we're here.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#0a0f1c] text-slate-100">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
            Get in touch
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Questions, feedback, or partnership opportunities — reach out and
            we&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: Mail,
              label: "Email",
              value: "support@ambulink.app",
              href: "mailto:support@ambulink.app",
            },
            {
              icon: Phone,
              label: "Phone",
              value: "+880 1700-000000",
              href: "tel:+8801700000000",
            },
            {
              icon: MapPin,
              label: "Office",
              value: "Dhaka, Bangladesh",
            },
            {
              icon: Clock,
              label: "Support Hours",
              value: "24/7 Emergency Support",
            },
          ].map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.03]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-rose-400">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-medium text-white">
                    {item.value}
                  </p>
                </div>
                {item.href && (
                  <ArrowUpRight className="size-4 shrink-0 text-slate-600 transition-colors group-hover:text-rose-400" />
                )}
              </div>
            );

            return item.href ? (
              <a key={item.label} href={item.href} className="block">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        {/* Emergency CTA */}
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
              In an emergency, don&apos;t wait
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              For immediate ambulance assistance, sign in and create an
              emergency request.
            </p>
            <a
              href="/login"
              className="mt-6 inline-block rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-500"
            >
              Request Ambulance Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}