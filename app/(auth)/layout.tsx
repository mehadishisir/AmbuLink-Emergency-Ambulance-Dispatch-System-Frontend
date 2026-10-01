
import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Ambulance,
  ArrowLeft,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Authentication | AmbuLink",
    template: "%s | AmbuLink",
  },
  description:
    "Sign in securely to AmbuLink Emergency Ambulance Dispatch System.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.08]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="AmbuLink home"
            className="group inline-flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 transition-transform duration-300 group-hover:scale-105">
              <Ambulance className="h-6 w-6" />
            </span>

            <span>
              <span className="block text-lg font-extrabold tracking-tight">
                Ambu<span className="text-red-600">Link</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Emergency Response
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:text-red-600 sm:px-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </header>

        {/* Main authentication area */}
        <section className="flex flex-1 items-center justify-center py-10 sm:py-12">
          <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left side: desktop branding */}
            <div className="hidden lg:block">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-sm font-medium text-red-700 shadow-sm">
                <Activity className="h-4 w-4" />
                Emergency care, connected
              </div>

              <h1 className="max-w-lg text-5xl font-black leading-[1.12] tracking-tight text-slate-950 xl:text-6xl">
                Help is closer
                <span className="mt-2 block bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  than you think.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
                Access emergency ambulance services, manage requests, and
                stay connected with your emergency response team.
              </p>

              <div className="mt-9 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Patient-focused care
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Manage emergency requests in one place.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Secure access
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Role-based access for authorized users.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xs leading-5 text-slate-400">
                Your emergency response platform, designed for a more
                connected experience.
              </p>
            </div>

            {/* Right side: login/register page */}
            <div className="mx-auto w-full max-w-md">{children}</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 py-5 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} AmbuLink. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Emergency access portal</span>
          </div>
        </footer>
      </div>
    </main>
  );
}