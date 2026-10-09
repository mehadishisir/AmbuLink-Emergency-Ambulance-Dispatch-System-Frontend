"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  LoaderCircle,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllRequests } from "@/hooks/admin.hook";
import type { EmergencyRequestStatus } from "@/types/emergency";

export default function AdminDashboard() {
  const { data, isLoading } = useAllRequests({ page: 1, limit: 100 });

  const stats = useMemo(() => {
    const requests = data?.data ?? [];
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === "PENDING").length,
      active: requests.filter((r) =>
        [
          "DISPATCHING",
          "DISPATCHED",
          "EN_ROUTE",
          "PICKED_UP",
          "GOING_TO_HOSPITAL",
          "ARRIVED",
        ].includes(r.status),
      ).length,
      completed: requests.filter((r) => r.status === "COMPLETED").length,
      critical: requests.filter((r) => r.priority === "CRITICAL").length,
    };
  }, [data]);

  const chartData = useMemo(() => {
    const requests = data?.data ?? [];
    const statusCounts: Record<string, number> = {};
    requests.forEach((r) => {
      statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1;
    });
    return Object.entries(statusCounts).map(([status, count]) => ({
      status: status.replace(/_/g, " "),
      count,
    }));
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">
            Overview of all emergency requests
          </p>
        </div>
        <Link href="/admin/manage">
          <Button className="bg-rose-600 hover:bg-rose-700">
            Manage Requests
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <LoaderCircle className="h-6 w-6 animate-spin text-rose-600" />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Clock}
              label="Pending"
              value={stats.pending}
              color="amber"
            />
            <StatCard
              icon={Truck}
              label="Active"
              value={stats.active}
              color="blue"
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={stats.completed}
              color="emerald"
            />
            <StatCard
              icon={AlertTriangle}
              label="Critical"
              value={stats.critical}
              color="rose"
            />
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Requests by Status</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="status"
                      tick={{ fontSize: 11 }}
                      stroke="#94a3b8"
                    />
                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="count" fill="#e11d48" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-12 text-center text-sm text-slate-500">
                  No data yet — requests will appear here
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {data && data.data.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No requests yet
                </p>
              ) : (
                <div className="space-y-2">
                  {data?.data.slice(0, 5).map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between rounded-lg border p-3 text-sm"
                    >
                      <div>
                        <p className="font-medium line-clamp-1">
                          {req.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          📍 {req.pickupAddress}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "amber" | "blue" | "emerald" | "rose";
}) {
  const colorMap = {
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <span
          className={`flex size-11 items-center justify-center rounded-xl ${colorMap[color]}`}
        >
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}