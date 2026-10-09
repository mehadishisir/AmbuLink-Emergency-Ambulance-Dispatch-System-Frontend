"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVerifyPayment } from "@/hooks/payment.hook";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const verifyMutation = useVerifyPayment();

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      return;
    }
    verifyMutation.mutate(sessionId, {
      onSuccess: () => setState("success"),
      onError: () => setState("error"),
    });
  }, [sessionId]);

  if (state === "loading") {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <LoaderCircle className="h-10 w-10 animate-spin text-rose-600" />
          <p className="text-sm text-slate-600">Verifying payment...</p>
        </CardContent>
      </Card>
    );
  }

  if (state === "error") {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <XCircle className="h-12 w-12 text-red-600" />
          <h1 className="text-xl font-bold">Payment verification failed</h1>
          <p className="text-sm text-slate-600">
            Please check your payment history or contact support.
          </p>
          <Link href="/dashboard/payments">
            <Button>View Payment History</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-sm text-slate-600">
          Your payment has been received. Thank you!
        </p>
        <div className="mt-2 flex gap-3">
          <Link href="/dashboard/payments">
            <Button className="bg-rose-600 hover:bg-rose-700">
              View Payment History
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-rose-50 p-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md">
            <CardContent className="py-12 text-center">
              <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-rose-600" />
            </CardContent>
          </Card>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}