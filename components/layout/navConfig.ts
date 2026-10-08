import { LayoutDashboard, type LucideIcon } from "lucide-react";

type NavItem = { label: string; href: string; icon: LucideIcon };

export const NAV: Record<
  "admin" | "driver" | "patient",
  { label: string; items: NavItem[] }
> = {
  admin: {
    label: "Admin",
    items: [{ label: "Overview", href: "/admin", icon: LayoutDashboard }],
  },
  driver: {
    label: "Driver",
    items: [{ label: "My Trips", href: "/provider", icon: LayoutDashboard }],
  },
  patient: {
    label: "Patient",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
};

export type NavRole = keyof typeof NAV;