export default async function PatientDashboardPage() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  return <h1 className="text-2xl font-bold">Patient Dashboard</h1>;
}