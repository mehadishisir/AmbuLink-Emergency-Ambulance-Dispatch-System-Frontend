import DashboardShell from "@/components/layout/dashboardShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}