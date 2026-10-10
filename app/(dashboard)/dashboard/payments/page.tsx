"use client";

import Link from "next/link";
import { LoaderCircle, Receipt, CheckCircle2, XCircle, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyRequests } from "@/hooks/emergency.hook";
import type { PaymentStatus } from "@/types/payment";

const statusIcon: Record<PaymentStatus, React.ElementType> = {
  SUCCESS: CheckCircle2,
  FAILED: XCircle,
  PENDING: Clock,
  INITIATED: Clock,
  CANCELLED: XCircle,
  REFUNDED: CheckCircle2,
};

const statusColor: Record<PaymentStatus, string> = {
  SUCCESS: "text-emerald-600 bg-emerald-50",
  FAILED: "text-red-600 bg-red-50",
  PENDING: "text-amber-600 bg-amber-50",
  INITIATED: "text-blue-600 bg-blue-50",
  CANCELLED: "text-slate-600 bg-slate-100",
  REFUNDED: "text-blue-600 bg-blue-50",
};

export default function MyPaymentsPage() {
  const { data, isLoading } = useMyRequests({ page: 1, limit: 50 });

  const paidRequests =
    data?.data.filter((r) => r.payments && r.payments.length > 0) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="text-sm text-slate-500">
          All your completed ambulance service payments
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <LoaderCircle className="h-6 w-6 animate-spin text-rose-600" />
        </div>
      )}

      {data && paidRequests.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Receipt className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">
              No payments yet. Complete a trip to see your payment history.
            </p>
          </CardContent>
        </Card>
      )}

      {paidRequests.length > 0 && (
        <div className="space-y-3">
          {paidRequests.map((req) =>
            req.payments?.map((p) => {
              const Icon = statusIcon[p.status as PaymentStatus] ?? Receipt;
              const color = statusColor[p.status as PaymentStatus] ?? "bg-slate-100";
              return (
                <Card key={p.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="line-clamp-1 text-base">
                        {req.description}
                      </CardTitle>
                      <span
                        className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${color}`}
                      >
                        <Icon className="h-3 w-3" />
                        {p.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Amount</p>
                        <p className="text-lg font-bold text-rose-600">
                          ৳{Number(p.amount).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Provider</p>
                        <p className="font-medium">{p.provider}</p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>{new Date(p.createdAt).toLocaleDateString()}</p>
                        {p.paidAt && (
                          <p>{new Date(p.paidAt).toLocaleTimeString()}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }),
          )}
        </div>
      )}
    </div>
  );
}