import { Skeleton } from "@/components/ui/skeleton";

export default function TeamsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Page header */}
      <div className="mb-10 text-center">
        <Skeleton className="mx-auto mb-4 h-7 w-40 rounded-full" />
        <Skeleton className="mx-auto h-12 w-80 rounded-xl" />
        <Skeleton className="mx-auto mt-3 h-5 w-64 rounded" />
        <Skeleton className="mx-auto mt-6 h-16 w-72 rounded-xl" />
      </div>

      {/* Team cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-card"
          >
            {/* Gradient color bar */}
            <Skeleton className="h-1.5 w-full rounded-none" />
            {/* Card content */}
            <div className="p-5">
              <div className="mb-5 flex items-start gap-4">
                <Skeleton className="h-14 w-14 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              </div>
              {/* Player rows */}
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-8 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <Skeleton className="mt-10 h-12 w-full rounded-xl" />
    </div>
  );
}
