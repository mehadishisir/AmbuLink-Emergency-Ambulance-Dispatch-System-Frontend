import apiClient from "@/lib/apiClient";
import { LoginPayload, RegisterPayload, VerifyEmailPayload } from "@/types/auth";

export const registerUser = async (payload: RegisterPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export const loginUser = async (payload: LoginPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};
 