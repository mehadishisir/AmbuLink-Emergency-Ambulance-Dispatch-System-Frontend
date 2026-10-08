import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 7; 

export async function POST(req: Request) {
  const { accessToken, role } = await req.json();
  if (!accessToken || !role) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const store = await cookies();
  const options = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
  store.set("accessToken", accessToken, options);
  store.set("role", role, options);

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete("accessToken");
  store.delete("role");
  return NextResponse.json({ success: true });
}