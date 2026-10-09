"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderCircle, Inbox, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAllDrivers,
  useAllRequests,
  useAssignDriver,
} from "@/hooks/admin.hook";

const statuses = [
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

export default function AdminManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const status = searchParams.get("status") || "ALL";
  const page = Number(searchParams.get("page") || "1");

  const { data, isLoading } = useAllRequests({
    page,
    limit: 10,
    status: status === "ALL" ? undefined : status,
  });

  const { data: driversData } = useAllDrivers();
  const assignMutation = useAssignDriver();

  const [selectedDriver, setSelectedDriver] = useState<Record<string, string>>(
    {},
  );

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL" || !value) params.delete(key);
    else params.set(key, value);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleAssign = (requestId: string) => {
    const driverId = selectedDriver[requestId];
    if (!driverId) {
      toast.error("Please select a driver");
      return;
    }
    assignMutation.mutate(
      { requestId, driverId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["all-requests"] });
          toast.success("Driver assigned successfully");
        },
        onError: (err) => {
          toast.error("Assignment failed", {
            description: err instanceof Error ? err.message : "Try again",
          });
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Requests</h1>
        <p className="text-sm text-slate-500">
          View all emergency requests and assign drivers
        </p>
      </div>

      {/* Filter */}
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

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoaderCircle className="h-6 w-6 animate-spin text-rose-600" />
        </div>
      )}

      {/* Empty */}
      {data && data.data.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Inbox className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">No requests found</p>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {data && data.data.length > 0 && (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Patient</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Assign Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.data.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{req.patient?.name}</p>
                    <p className="text-xs text-slate-500">
                      {req.patient?.phone}
                    </p>
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    <p className="line-clamp-2">{req.description}</p>
                    <p className="text-xs text-slate-500">
                      📍 {req.pickupAddress}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        req.priority === "CRITICAL"
                          ? "bg-red-100 text-red-700"
                          : req.priority === "HIGH"
                            ? "bg-orange-100 text-orange-700"
                            : req.priority === "MEDIUM"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold">
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {req.status === "PENDING" ? (
                      <div className="flex items-center gap-2">
                        <Select
                          value={selectedDriver[req.id] ?? ""}
                          onValueChange={(v) =>
                            setSelectedDriver((prev) => ({
                              ...prev,
                              [req.id]: v,
                            }))
                          }
                        >
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {driversData?.data.map((d) => (
                              <SelectItem key={d.id} value={d.id}>
                                {d.user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => handleAssign(req.id)}
                          disabled={assignMutation.isPending}
                          className="h-8 bg-rose-600 text-xs hover:bg-rose-700"
                        >
                          <UserPlus className="mr-1 h-3 w-3" />
                          Assign
                        </Button>
                      </div>
                    ) : req.driver ? (
                      <span className="text-xs text-slate-600">
                        {req.driver.user.name}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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