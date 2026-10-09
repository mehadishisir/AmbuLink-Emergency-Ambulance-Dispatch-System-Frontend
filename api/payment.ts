import apiClient from "@/lib/apiClient";
import type {
  CheckoutSessionResponse,
  CreateCheckoutPayload,
  Payment,
} from "@/types/payment";

export function createCheckoutSession(payload: CreateCheckoutPayload) {
  return apiClient("/payments/create-checkout-session", {
    method: "POST",
    body: payload,
  }) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    data: CheckoutSessionResponse;
  }>;
}

export function verifyPayment(sessionId: string) {
  return apiClient("/payments/verify-payment", {
    method: "POST",
    body: { sessionId },
  }) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    data: Payment;
  }>;
}

export function getPaymentByRequest(emergencyRequestId: string) {
  return apiClient(`/payments/request/${emergencyRequestId}`) as Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    data: Payment[];
  }>;
}