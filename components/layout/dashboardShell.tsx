"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Ambulance, LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { clearSession } from "@/lib/session";
import { NAV, type NavRole } from "./navConfig";

export default function DashboardShell({
  role,
  children,
}: {
  role: NavRole;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const { label, items } = NAV[role];

 const handleLogout = async () => {
  try {
    await clearSession();
  } catch {
    toast.error("Logout failed. Please try again.");
    return;
  }
  logout();
  window.location.assign("/login");
};

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b bg-white md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 px-4 py-4">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-700 text-white">
            <Ambulance className="size-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold leading-none">
              Ambu<span className="text-rose-600">link</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              {label}
            </p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:pb-0">
          {items.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-rose-50 text-rose-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end border-b bg-white px-4 py-3">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </header>
        <main className="flex-1 bg-slate-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}