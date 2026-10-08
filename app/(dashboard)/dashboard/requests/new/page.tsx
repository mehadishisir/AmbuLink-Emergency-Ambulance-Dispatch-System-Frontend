"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  MapPin,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useCreateEmergencyRequest } from "@/hooks/emergency.hook";
import {
  emergencyStep1Schema,
  emergencyStep2Schema,
} from "@/validation/emergency.validation";

type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: "LOW", label: "Low", color: "border-slate-300 hover:border-slate-500" },
  { value: "MEDIUM", label: "Medium", color: "border-amber-300 hover:border-amber-500" },
  { value: "HIGH", label: "High", color: "border-orange-300 hover:border-orange-500" },
  { value: "CRITICAL", label: "Critical", color: "border-red-400 hover:border-red-600" },
];

export default function NewRequestPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    priority: "MEDIUM" as Priority,
    pickupAddress: "",
  });

  const createMutation = useCreateEmergencyRequest();

  const submitRequest = () => {
    createMutation.mutate(
      {
        description: formData.description,
        priority: formData.priority,
        pickupAddress: formData.pickupAddress,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["my-requests"] });
          toast.success("Emergency request submitted!");
          router.push("/dashboard/requests");
        },
        onError: (err) => {
          toast.error("Failed to create request", {
            description: err instanceof Error ? err.message : "Try again",
          });
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
              step >= s ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-500"
            }`}
          >
            {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Emergency Details"}
            {step === 2 && "Pickup Location"}
            {step === 3 && "Confirm Request"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Describe the situation and choose priority"}
            {step === 2 && "Where should the ambulance come?"}
            {step === 3 && "Review and submit"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <StepOne
              initial={formData}
              onNext={(data) => {
                setFormData({ ...formData, ...data });
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <StepTwo
              initial={formData}
              onBack={() => setStep(1)}
              onNext={(data) => {
                setFormData({ ...formData, ...data });
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <StepThree
              data={formData}
              onBack={() => setStep(2)}
              onSubmit={submitRequest}
              isLoading={createMutation.isPending}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Step 1
// ============================================
function StepOne({
  initial,
  onNext,
}: {
  initial: { description: string; priority: Priority };
  onNext: (data: { description: string; priority: Priority }) => void;
}) {
  const [description, setDescription] = useState(initial.description);
  const [priority, setPriority] = useState<Priority>(initial.priority);
  const [error, setError] = useState("");

  const handleNext = () => {
    const result = emergencyStep1Schema.safeParse({ description, priority });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    onNext({ description, priority });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Description</Label>
        <textarea
          className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10"
          placeholder="Describe the emergency situation..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <div className="grid grid-cols-4 gap-2">
          {priorities.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={`rounded-lg border-2 p-3 text-xs font-semibold transition ${p.color} ${
                priority === p.value ? "bg-rose-50 ring-2 ring-rose-500" : "bg-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <Button onClick={handleNext} className="w-full">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

// ============================================
// Step 2
// ============================================
function StepTwo({
  initial,
  onBack,
  onNext,
}: {
  initial: { pickupAddress: string };
  onBack: () => void;
  onNext: (data: { pickupAddress: string }) => void;
}) {
  const [pickupAddress, setPickupAddress] = useState(initial.pickupAddress);
  const [error, setError] = useState("");

  const handleNext = () => {
    const result = emergencyStep2Schema.safeParse({ pickupAddress });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    onNext({ pickupAddress });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Pickup address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="House/Road/Area, City"
            value={pickupAddress}
            onChange={(e) => {
              setPickupAddress(e.target.value);
              setError("");
            }}
            className="pl-10"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ============================================
// Step 3
// ============================================
function StepThree({
  data,
  onBack,
  onSubmit,
  isLoading,
}: {
  data: { description: string; priority: Priority; pickupAddress: string };
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-3 rounded-lg border bg-slate-50 p-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Priority</p>
          <p className="font-medium text-slate-900">{data.priority}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Description</p>
          <p className="text-slate-700">{data.description}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Pickup</p>
          <p className="text-slate-700">{data.pickupAddress}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>By submitting, an ambulance will be dispatched as soon as possible.</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isLoading}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex-1 bg-rose-600 hover:bg-rose-700"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Emergency Request"
          )}
        </Button>
      </div>
    </div>
  );
}