import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character (!@#$%^&*)",
  );

export const nameValidator = z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(60, "Name is too long");

export const emailValidator = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const phoneValidator = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^(\+?880|0)1[3-9]\d{8}$/,
    "Enter a valid Bangladeshi phone number (e.g. 01712345678)",
  );

export const passwordValidator = passwordSchema;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(60, "Name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^(\+?880|0)1[3-9]\d{8}$/,
        "Enter a valid Bangladeshi phone number (e.g. 01712345678)",
      ),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;