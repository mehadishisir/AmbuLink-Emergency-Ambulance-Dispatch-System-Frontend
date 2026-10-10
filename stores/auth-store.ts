import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "ADMIN" | "DRIVER" | "PATIENT";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  setAuth: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("ambulink-token", accessToken);
        }
        set({ user, accessToken });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("ambulink-token");
        }
        set({ user: null, accessToken: null });
      },
    }),
    { name: "ambulink-auth" },
  ),
);