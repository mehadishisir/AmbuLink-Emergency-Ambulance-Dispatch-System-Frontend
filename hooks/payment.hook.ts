import {
  createCheckoutSession,
  getPaymentByRequest,
  verifyPayment,
} from "@/api/payment";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPayment,
  });
}

export function usePaymentByRequest(emergencyRequestId: string) {
  return useQuery({
    queryKey: ["payment-by-request", emergencyRequestId],
    queryFn: () => getPaymentByRequest(emergencyRequestId),
    enabled: !!emergencyRequestId,
  });
}