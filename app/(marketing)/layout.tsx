import Link from "next/link";
import { Ambulance, ExternalLink, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-700 text-white shadow-lg shadow-rose-600/25">
              <Ambulance className="size-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-950">
              Ambu<span className="text-rose-600">link</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-rose-600 hover:bg-rose-700"
              >
                Get started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-700 text-white">
                <Ambulance className="size-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Ambu<span className="text-rose-600">link</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Emergency ambulance dispatch platform connecting patients with
              verified drivers in minutes.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/services" className="hover:text-rose-600">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-rose-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-rose-600">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-rose-600">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-rose-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
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
                  className="hover:text-rose-600"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
          © 2026 Ambulink. Built for emergency care.
        </div>
      </footer>
    </div>
  );
}