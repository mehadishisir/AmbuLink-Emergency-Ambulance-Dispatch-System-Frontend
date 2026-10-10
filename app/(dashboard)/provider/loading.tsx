export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
  );
}