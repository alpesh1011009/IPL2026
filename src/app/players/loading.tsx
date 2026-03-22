import { Skeleton } from "@/components/ui/skeleton";

export default function PlayersLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Skeleton className="mb-1.5 h-6 w-40 rounded-full" />
          <Skeleton className="h-9 w-52 rounded-xl" />
          <Skeleton className="mt-1 h-4 w-64 rounded" />
        </div>
        <Skeleton className="h-14 w-44 rounded-xl" />
      </div>

      {/* Search */}
      <Skeleton className="mb-5 h-12 w-full rounded-xl" />

      {/* Business details collapsible */}
      <Skeleton className="mb-6 h-14 w-full rounded-2xl" />

      {/* Team filter pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Array.from({ length: 11 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-16 rounded-full" />
        ))}
      </div>

      {/* Role filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      <Skeleton className="mb-6 h-4 w-28 rounded" />

      {/* Player card grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex justify-center">
            <div className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/[0.06] bg-card">
              {/* Player image area */}
              <Skeleton className="h-64 w-full rounded-none" />
              {/* Card info */}
              <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
                <Skeleton className="mt-2 h-9 w-full rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
