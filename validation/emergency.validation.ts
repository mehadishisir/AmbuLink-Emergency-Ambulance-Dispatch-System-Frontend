import { z } from "zod";

export const emergencyStep1Schema = z.object({
  description: z
    .string()
    .min(10, "Please describe the emergency (at least 10 characters)")
    .max(500, "Too long"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export const emergencyStep2Schema = z.object({
  pickupAddress: z
    .string()
    .min(5, "Pickup address is required")
    .max(200, "Too long"),
});

export const createEmergencyRequestSchema = emergencyStep1Schema.merge(
  emergencyStep2Schema,
);