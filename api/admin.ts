import apiClient from "@/lib/apiClient";
import type { EmergencyRequest } from "@/types/emergency";

export function getAllEmergencyRequests(query: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
} = {}) {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.status) params.set("status", query.status);
  if (query.priority) params.set("priority", query.priority);

  const qs = params.toString();
  return apiClient(`/emergency-requests${qs ? `?${qs}` : ""}`) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    meta: { page: number; limit: number; total: number; totalPages: number };
    data: EmergencyRequest[];
  }>;
}

export function assignDriverToRequest(requestId: string, driverId: string) {
  return apiClient(`/emergency-requests/${requestId}/assign`, {
    method: "PATCH",
    body: { driverId },
  });
}

export function getAllDrivers() {
  return apiClient(`/drivers`) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    data: Array<{
      id: string;
      licenseNumber: string;
      availabilityStatus: "AVAILABLE" | "BUSY" | "OFFLINE";
      user: { id: string; name: string; email: string; phone: string };
    }>;
  }>;
}