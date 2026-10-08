import apiClient from "@/lib/apiClient";
import type {
  CreateEmergencyRequestPayload,
  EmergencyRequest,
  EmergencyRequestListResponse,
} from "@/types/emergency";

export const createEmergencyRequest = async (
  payload: CreateEmergencyRequestPayload,
) => {
  return apiClient("/emergency-requests", {
    method: "POST",
    body: payload,
  });
};

export const getMyRequests = async (query: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
} = {}) => {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.status) params.set("status", query.status);
  if (query.priority) params.set("priority", query.priority);

  const qs = params.toString();
  return apiClient(
    `/emergency-requests/my-requests${qs ? `?${qs}` : ""}`,
  ) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    meta: EmergencyRequestListResponse["meta"];
    data: EmergencyRequest[];
  }>;
};

export const getRequestById = async (id: string) => {
  return apiClient(`/emergency-requests/${id}`) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    data: EmergencyRequest;
  }>;
};