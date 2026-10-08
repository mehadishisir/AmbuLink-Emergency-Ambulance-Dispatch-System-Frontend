"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, LoaderCircle, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyRequests } from "@/hooks/emergency.hook";
import type { EmergencyRequestStatus } from "@/types/emergency";

const statuses: (EmergencyRequestStatus | "ALL")[] = [
  "ALL",
  "PENDING",
  "DISPATCHED",
  "EN_ROUTE",
  "PICKED_UP",
  "GOING_TO_HOSPITAL",
  "ARRIVED",
  "COMPLETED",
  "CANCELLED",
];

const statusColors: Record<EmergencyRequestStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  DISPATCHING: "bg-blue-100 text-blue-800",
  DISPATCHED: "bg-blue-100 text-blue-800",
  EN_ROUTE: "bg-indigo-100 text-indigo-800",
  PICKED_UP: "bg-purple-100 text-purple-800",
  GOING_TO_HOSPITAL: "bg-cyan-100 text-cyan-800",
  ARRIVED: "bg-teal-100 text-teal-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function MyRequestsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "ALL";
  const page = Number(searchParams.get("page") || "1");

  const { data, isLoading, isError } = useMyRequests({
    page,
    limit: 10,
    status: status === "ALL" ? undefined : status,
  });

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL" || !value) params.delete(key);
    else params.set(key, value);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Requests</h1>
        <Link href="/dashboard/requests/new">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" /> New Request
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter("status", s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              status === s
                ? "border-rose-500 bg-rose-50 text-rose-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoaderCircle className="h-6 w-6 animate-spin text-rose-600" />
        </div>
      )}

      {isError && (
        <Card>
          <CardContent className="py-12 text-center text-sm text-red-600">
            Failed to load requests
          </CardContent>
        </Card>
      )}

      {data && data.data.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Inbox className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">No requests found</p>
            <Link href="/dashboard/requests/new">
              <Button variant="outline" size="sm">Create your first request</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {data && data.data.length > 0 && (
        <div className="space-y-3">
          {data.data.map((req) => (
            <Link key={req.id} href={`/dashboard/requests/${req.id}`}>
              <Card className="cursor-pointer transition hover:border-rose-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="line-clamp-1 text-base">{req.description}</CardTitle>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[req.status]}`}>
                      {req.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-xs text-slate-500">
                  <p>📍 {req.pickupAddress}</p>
                  <p className="mt-1">
                    Priority: <strong className="text-slate-700">{req.priority}</strong> · {new Date(req.requestedAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.meta.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setFilter("page", String(page - 1))}
          >
            Previous
          </Button>
          <span className="flex items-center px-3 text-sm text-slate-600">
            Page {page} of {data.meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= data.meta.totalPages}
            onClick={() => setFilter("page", String(page + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}