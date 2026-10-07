import type { Role } from "@/stores/auth-store";

export function getDashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin";
  if (role === "DRIVER") return "/provider";
  return "/dashboard";
}