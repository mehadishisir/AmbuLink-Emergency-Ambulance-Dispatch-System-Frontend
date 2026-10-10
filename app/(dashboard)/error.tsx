"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="max-w-md text-sm text-slate-600">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={reset} className="bg-rose-600 hover:bg-rose-700">
        Try again
      </Button>
    </div>
  );
}