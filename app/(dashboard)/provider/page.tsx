"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LoaderCircle,
  Inbox,
  MapPin,
  Phone,
  ChevronRight,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAssignedRequests,
  useUpdateRequestStatus,
} from "@/hooks/emergency.hook";
import type {
  EmergencyRequest,
  EmergencyRequestStatus,
} from "@/types/emergency";

const statusFlow: Record<
  EmergencyRequestStatus,
  EmergencyRequestStatus | null
> = {
  PENDING: null,
  DISPATCHING: null,
  DISPATCHED: "EN_ROUTE",
  EN_ROUTE: "PICKED_UP",
  PICKED_UP: "GOING_TO_HOSPITAL",
  GOING_TO_HOSPITAL: "ARRIVED",
  ARRIVED: "COMPLETED",
  COMPLETED: null,
  CANCELLED: null,
};

const statusLabel: Record<EmergencyRequestStatus, string> = {
  PENDING: "Pending",
  DISPATCHING: "Dispatching",
  DISPATCHED: "Dispatched",
  EN_ROUTE: "On the way",
  PICKED_UP: "Patient picked up",
  GOING_TO_HOSPITAL: "Going to hospital",
  ARRIVED: "Arrived at hospital",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const nextActionLabel: Record<EmergencyRequestStatus, string> = {
  PENDING: "",
  DISPATCHING: "",
  DISPATCHED: "Start Trip",
  EN_ROUTE: "Mark Picked Up",
  PICKED_UP: "Going to Hospital",
  GOING_TO_HOSPITAL: "Mark Arrived",
  ARRIVED: "Complete Trip",
  COMPLETED: "",
  CANCELLED: "",
};

export default function DriverDashboard() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAssignedRequests({ page: 1, limit: 20 });
  const updateMutation = useUpdateRequestStatus();

  const activeRequests =
    data?.data.filter(
      (r) => !["COMPLETED", "CANCELLED"].includes(r.status),
    ) ?? [];

  const completedRequests =
    data?.data.filter((r) =>
      ["COMPLETED", "CANCELLED"].includes(r.status),
    ) ?? [];

  const handleUpdate = (id: string, status: EmergencyRequestStatus) => {
    updateMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["assigned-requests"] });
          toast.success("Status updated");
        },
        onError: (err) => {
          toast.error("Failed to update", {
            description: err instanceof Error ? err.message : "Try again",
          });
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <p className="text-sm text-slate-500">
          Manage your assigned emergency trips
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Active Trips" value={activeRequests.length} color="rose" />
        <StatCard
          label="Completed"
          value={completedRequests.length}
          color="emerald"
        />
        <StatCard label="Total" value={data?.meta.total ?? 0} color="slate" />
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
            <p className="text-sm text-slate-500">
              No trips assigned yet. Stay available.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Active Trips */}
      {activeRequests.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Active Trips
          </h2>
          {activeRequests.map((req) => (
            <TripCard
              key={req.id}
              req={req}
              onUpdate={(status) => handleUpdate(req.id, status)}
              isUpdating={updateMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Completed */}
      {completedRequests.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Completed
          </h2>
          {completedRequests.map((req) => (
            <Card key={req.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium">{req.description}</p>
                  <p className="text-xs text-slate-500">
                    📍 {req.pickupAddress}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "rose" | "emerald" | "slate";
}) {
  const colors = {
    rose: "text-rose-600",
    emerald: "text-emerald-600",
    slate: "text-slate-600",
  };
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
        <p className={`mt-1 text-2xl font-bold ${colors[color]}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function TripCard({
  req,
  onUpdate,
  isUpdating,
}: {
  req: EmergencyRequest;
  onUpdate: (status: EmergencyRequestStatus) => void;
  isUpdating: boolean;
}) {
  const nextStatus = statusFlow[req.status];
  const nextLabel = nextActionLabel[req.status];

  return (
    <Card className="border-rose-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{req.description}</CardTitle>
          <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
            {req.priority}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-start gap-2 text-slate-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <span>{req.pickupAddress}</span>
        </div>

        {req.patient && (
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" />
            <span>
              {req.patient.name} · {req.patient.phone}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-slate-400" />
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
            {statusLabel[req.status]}
          </span>
        </div>

        {nextStatus && nextLabel && (
          <Button
            onClick={() => onUpdate(nextStatus)}
            disabled={isUpdating}
            className="w-full bg-rose-600 hover:bg-rose-700"
          >
            {isUpdating ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              nextLabel
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}