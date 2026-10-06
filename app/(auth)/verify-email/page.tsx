import VerifyEmailForm from "@/components/form/verifyEmailForm";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={null}>
        <VerifyEmailForm />
      </Suspense>
    </main>
  );
}