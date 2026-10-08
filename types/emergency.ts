export type EmergencyPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type EmergencyRequestStatus =
  | "PENDING"
  | "DISPATCHING"
  | "DISPATCHED"
  | "EN_ROUTE"
  | "PICKED_UP"
  | "GOING_TO_HOSPITAL"
  | "ARRIVED"
  | "COMPLETED"
  | "CANCELLED";

export type EmergencyRequest = {
  id: string;
  description: string;
  pickupAddress: string;
  pickupLatitude: number | null;
  pickupLongitude: number | null;
  priority: EmergencyPriority;
  status: EmergencyRequestStatus;
  requestedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  patientId: string;
  driverId: string | null;
  patient?: { id: string; name: string; phone: string; email: string };
  driver?: {
    id: string;
    user: { id: string; name: string; phone: string };
  } | null;
  ambulance?: { id: string; type: string; plateNumber: string } | null;
  hospital?: { id: string; name: string; address: string } | null;
  payments?: { id: string; amount: string; status: string }[];
};

export type CreateEmergencyRequestPayload = {
  description: string;
  pickupAddress: string;
  priority: EmergencyPriority;
  pickupLatitude?: number;
  pickupLongitude?: number;
};

export type EmergencyRequestListResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: EmergencyRequest[];
};


export type UpdateStatusPayload = {
  status: EmergencyRequestStatus;
};