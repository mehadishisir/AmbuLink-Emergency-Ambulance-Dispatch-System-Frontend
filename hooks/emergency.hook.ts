import {
  createEmergencyRequest,
  getAssignedRequests,
  getMyRequests,
  getRequestById,
  updateRequestStatus,
} from "@/api/emergency";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateEmergencyRequest() {
  return useMutation({
    mutationFn: createEmergencyRequest,
  });
}

export function useMyRequests(query: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
}) {
  return useQuery({
    queryKey: ["my-requests", query],
    queryFn: () => getMyRequests(query),
  });
}

export function useRequestById(id: string) {
  return useQuery({
    queryKey: ["request", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });
}

export function useAssignedRequests(query: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return useQuery({
    queryKey: ["assigned-requests", query],
    queryFn: () => getAssignedRequests(query),
  });
}

export function useUpdateRequestStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateRequestStatus(id, { status }),
  });
}