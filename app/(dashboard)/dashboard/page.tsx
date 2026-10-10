"use client";

import Link from "next/link";
import {
  LoaderCircle,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyRequests } from "@/hooks/emergency.hook";

export default function PatientDashboardPage() {
  const { data, isLoading } = useMyRequests({ page: 1, limit: 100 });

  const stats = {
    total: data?.data.length ?? 0,
    pending: data?.data.filter((r) => r.status === "PENDING").length ?? 0,
    active:
      data?.data.filter((r) =>
        [
          "DISPATCHING",
          "DISPATCHED",
          "EN_ROUTE",
          "PICKED_UP",
          "GOING_TO_HOSPITAL",
          "ARRIVED",
        ].includes(r.status),
      ).length ?? 0,
    completed:
      data?.data.filter((r) => r.status === "COMPLETED").length ?? 0,
  };

  const recent = data?.data.slice(0, 3) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p className="text-sm text-slate-500">
            Overview of your emergency requests
          </p>
        </div>
        <Link href="/dashboard/requests/new">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" />
            New Request
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
              icon={AlertTriangle}
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
              icon={ClipboardList}
              label="Total"
              value={stats.total}
              color="rose"
            />
          </div>

          {/* Recent requests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Requests</CardTitle>
                <Link href="/dashboard/requests">
                  <Button variant="ghost" size="sm" className="text-rose-600">
                    View all
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recent.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <ClipboardList className="h-10 w-10 text-slate-300" />
                  <p className="text-sm text-slate-500">
                    No emergency requests yet
                  </p>
                  <Link href="/dashboard/requests/new">
                    <Button
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      Create your first request
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recent.map((req) => (
                    <Link
                      key={req.id}
                      href={`/dashboard/requests/${req.id}`}
                      className="flex items-center justify-between rounded-lg border p-3 text-sm transition hover:border-rose-200 hover:bg-rose-50/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-medium">
                          {req.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          📍 {req.pickupAddress}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {req.status}
                      </span>
                    </Link>
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