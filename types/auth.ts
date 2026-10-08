import { AuthUser } from "@/stores/auth-store";

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}


export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
};