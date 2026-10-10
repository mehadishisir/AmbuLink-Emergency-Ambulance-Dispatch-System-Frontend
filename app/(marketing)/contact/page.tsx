import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ambulink. Support, partnerships, or feedback — we're here.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-rose-600">
            Get in touch
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Questions, feedback, or partnership opportunities — reach out and
            we&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
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
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-rose-200 hover:shadow-lg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a key={item.label} href={item.href}>
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center text-white sm:p-14">
          <h2 className="text-2xl font-bold sm:text-3xl">
            In an emergency, don&apos;t wait
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            For immediate ambulance assistance, sign in and create an emergency
            request.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            Request Ambulance Now
          </a>
        </div>
      </section>
    </div>
  );
}