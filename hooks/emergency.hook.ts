"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmergencyRequest,
  getMyRequests,
  getRequestById,
} from "@/api/emergency";
import type { CreateEmergencyRequestPayload } from "@/types/emergency";

export const useCreateEmergencyRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEmergencyRequestPayload) =>
      createEmergencyRequest(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });
};

export const useMyRequests = (query: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
}) => {
  return useQuery({
    queryKey: ["my-requests", query],
    queryFn: () => getMyRequests(query),
  });
};

export const useRequestById = (id: string) => {
  return useQuery({
    queryKey: ["request", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });
};