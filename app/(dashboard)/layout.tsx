"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Ambulance,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ClipboardList,
  Users,
  Truck,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { createSession, clearSession } from "@/lib/session";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navByRole: Record<string, NavItem[]> = {
  PATIENT: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "My Requests",
      href: "/dashboard/requests",
      icon: ClipboardList,
    },
    { label: "New Request", href: "/dashboard/requests/new", icon: Plus },
  ],
  DRIVER: [
    { label: "Dashboard", href: "/provider", icon: LayoutDashboard },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wait for zustand persist hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect if not logged in (after hydration)
  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/login");
    }
  }, [isHydrated, user, router]);

  const handleLogout = async () => {
    await clearSession();
    logout();
    router.push("/login");
  };

  if (!isHydrated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-rose-600 border-t-transparent" />
      </div>
    );
  }

  const navItems = navByRole[user.role] ?? [];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-700 text-white">
            <Ambulance className="size-5" />
          </span>
          <div>
            <p className="text-base font-extrabold tracking-tight">
              Ambu<span className="text-rose-600">link</span>
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {user.role}
            </p>
          </div>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-rose-50 text-rose-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
              {user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-600 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}