export type PaymentProvider = "BKASH" | "STRIPE";
export type PaymentStatus =
  | "PENDING"
  | "INITIATED"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type Payment = {
  id: string;
  amount: string;
  provider: PaymentProvider;
  transactionId: string | null;
  paymentUrl: string | null;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  userId: string;
  emergencyRequestId: string;
  emergencyRequest?: {
    id: string;
    description: string;
    status: string;
  };
};

export type CreateCheckoutPayload = {
  emergencyRequestId: string;
  amount: number;
};

export type CheckoutSessionResponse = {
  checkoutUrl?: string;
  paymentUrl?: string;
  url?: string;
  payment?: Payment;
};