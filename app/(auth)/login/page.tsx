import { LoginForm } from "@/components/form/loginForm";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Ambulink account",
};

export default function LoginPage() {
  return <LoginForm />;
}