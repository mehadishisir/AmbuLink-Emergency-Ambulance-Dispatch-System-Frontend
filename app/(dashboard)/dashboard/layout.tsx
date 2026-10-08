import DashboardShell from "@/components/layout/dashboardShell";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="patient">{children}</DashboardShell>;
}