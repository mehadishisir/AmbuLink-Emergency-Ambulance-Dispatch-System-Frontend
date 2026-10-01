import { RegisterForm } from "@/components/form/registerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Ambulink account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}