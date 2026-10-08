export async function createSession(accessToken: string, role: string) {
  const res = await fetch("/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, role }),
  });
  if (!res.ok) throw new Error("Failed to create session");
}

export async function clearSession() {
  const res = await fetch("/session", { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear session");
}