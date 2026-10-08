import DashboardShell from "@/components/layout/dashboardShell";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="driver">{children}</DashboardShell>;
}