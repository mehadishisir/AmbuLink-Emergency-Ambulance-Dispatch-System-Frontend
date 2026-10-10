"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  LoaderCircle,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRequestById } from "@/hooks/emergency.hook";
import { useCreateCheckoutSession } from "@/hooks/payment.hook";

const timeline: { key: string; label: string }[] = [
  { key: "PENDING", label: "Request received" },
  { key: "DISPATCHED", label: "Ambulance dispatched" },
  { key: "EN_ROUTE", label: "On the way" },
  { key: "PICKED_UP", label: "Patient picked up" },
  { key: "GOING_TO_HOSPITAL", label: "Going to hospital" },
  { key: "ARRIVED", label: "Arrived at hospital" },
  { key: "COMPLETED", label: "Completed" },
];

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useRequestById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoaderCircle className="h-6 w-6 animate-spin text-rose-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-slate-500">
          Request not found
        </CardContent>
      </Card>
    );
  }

  const req = data.data;
  const currentIdx = timeline.findIndex((t) => t.key === req.status);
  const isCancelled = req.status === "CANCELLED";
  const hasSuccessfulPayment = req.payments?.some(
    (p) => p.status === "SUCCESS",
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/requests"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to list
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{req.description}</CardTitle>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
              {req.priority}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Pickup
              </p>
              <p>{req.pickupAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Requested
              </p>
              <p>{new Date(req.requestedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {isCancelled ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4" /> This request was cancelled
            </div>
          ) : (
            <ol className="space-y-4">
              {timeline.map((t, idx) => {
                const done = idx <= currentIdx;
                return (
                  <li key={t.key} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                        done ? "bg-rose-600" : "bg-slate-300"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        done
                          ? "font-semibold text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {t.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </CardContent>
      </Card>

      {/* Payment section */}
      {req.status === "COMPLETED" && !hasSuccessfulPayment && (
        <PayNowCard requestId={req.id} />
      )}

      {hasSuccessfulPayment && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex items-center gap-2 py-4 text-sm text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            Payment completed — check your payment history
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ============================================
// Pay Now Card
// ============================================
function PayNowCard({ requestId }: { requestId: string }) {
  const createCheckout = useCreateCheckoutSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePay = () => {
    setIsRedirecting(true);
    createCheckout.mutate(
      { emergencyRequestId: requestId, amount: 500 },
      {
        onSuccess: (res) => {
          const url = res.data.checkoutUrl ?? res.data.paymentUrl ?? res.data.url;
          if (url) {
            window.location.href = url;
          } else {
            toast.error("Checkout URL not received");
            setIsRedirecting(false);
          }
        },
        onError: (err) => {
          setIsRedirecting(false);
          toast.error("Failed to start payment", {
            description: err instanceof Error ? err.message : "Try again",
          });
        },
      },
    );
  };

  return (
    <Card className="border-rose-200 bg-rose-50/50">
      <CardContent className="space-y-3 py-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <CreditCard className="size-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Payment Required</p>
            <p className="text-xs text-slate-600">
              Please complete the payment for this emergency service.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Amount</p>
            <p className="text-lg font-bold text-rose-600">৳500.00</p>
          </div>
        </div>
        <Button
          onClick={handlePay}
          disabled={isRedirecting}
          className="h-11 w-full rounded-lg bg-gradient-to-r from-rose-600 to-red-600 text-sm font-bold shadow-lg shadow-rose-600/20 hover:shadow-xl"
        >
          {isRedirecting
            ? "Redirecting to Stripe..."
            : "Pay with Stripe (Test Mode)"}
        </Button>
        <p className="text-center text-[10px] text-slate-500">
          Test card: 4242 4242 4242 4242 · Any future date · Any CVC
        </p>
      </CardContent>
    </Card>
  );
}