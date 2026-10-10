import Link from "next/link";
import { Ambulance, ExternalLink, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0f1c] text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0f1c]/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
  <span className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-600/20 ring-1 ring-white/10">
    <span className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
    <Ambulance className="relative size-[18px] text-white" strokeWidth={2.4} />
  </span>
  <span className="text-[17px] font-bold tracking-tight text-white">
    Ambu<span className="text-rose-500">link</span>
  </span>
</Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:bg-white/[0.06] hover:text-white"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-rose-600 text-white hover:bg-rose-500"
              >
                Get started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#070b16]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-red-600 text-white">
                <Ambulance className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                Ambu<span className="text-rose-500">link</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Emergency ambulance dispatch platform connecting patients with
              verified drivers in minutes.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition hover:text-white">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Mail className="size-3.5" />
                support@ambulink.app
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="size-3.5" />
                <a
                  href="https://github.com/mehadishisir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-4 text-center text-xs text-slate-500">
          © 2026 Ambulink. Built for emergency care.
        </div>
      </footer>
    </div>
  );
}