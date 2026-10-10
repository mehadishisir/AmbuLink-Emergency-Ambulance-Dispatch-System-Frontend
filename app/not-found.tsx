import Link from "next/link";
import { Ambulance, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50/40 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-rose-100">
        <Ambulance className="size-8 text-rose-600" />
      </div>
      <h1 className="mt-6 text-6xl font-bold text-slate-950">404</h1>
      <p className="mt-3 text-lg text-slate-600">
        This page could not be found
      </p>
      <Link href="/" className="mt-6">
        <Button className="bg-rose-600 hover:bg-rose-700">
          <Home className="mr-2 size-4" />
          Go home
        </Button>
      </Link>
    </div>
  );
}