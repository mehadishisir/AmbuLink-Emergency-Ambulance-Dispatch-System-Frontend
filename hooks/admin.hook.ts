import {
  assignDriverToRequest,
  getAllDrivers,
  getAllEmergencyRequests,
} from "@/api/admin";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAllRequests(query: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
}) {
  return useQuery({
    queryKey: ["all-requests", query],
    queryFn: () => getAllEmergencyRequests(query),
  });
}

export function useAllDrivers() {
  return useQuery({
    queryKey: ["all-drivers"],
    queryFn: getAllDrivers,
  });
}

export function useAssignDriver() {
  return useMutation({
    mutationFn: ({
      requestId,
      driverId,
    }: {
      requestId: string;
      driverId: string;
    }) => assignDriverToRequest(requestId, driverId),
  });
}