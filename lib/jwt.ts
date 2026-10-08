import type { AuthUser, Role } from "@/stores/auth-store";

type TokenPayload = {
  userId: string;
  name: string;
  email: string;
  role: Role;
};

export function getUserFromToken(token: string): AuthUser {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
  const payload = JSON.parse(json) as TokenPayload;

  return {
    id: payload.userId,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
}