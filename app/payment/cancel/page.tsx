import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
            <XCircle className="h-10 w-10 text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-sm text-slate-600">
            Your payment was cancelled. You can try again from your requests
            page.
          </p>
          <div className="mt-2 flex gap-3">
            <Link href="/dashboard/requests">
              <Button className="bg-rose-600 hover:bg-rose-700">
                Back to Requests
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}