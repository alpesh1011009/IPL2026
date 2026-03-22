import { Skeleton } from "@/components/ui/skeleton";

export default function ScheduleLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      {/* Page header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Skeleton className="mb-1.5 h-6 w-36 rounded-full" />
          <Skeleton className="h-9 w-72 rounded-xl" />
          <Skeleton className="mt-1 h-4 w-56 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-14 w-48 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
        <div className="flex items-center gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-14 shrink-0 rounded-full" />
          ))}
        </div>
      </div>

      <Skeleton className="mb-4 h-4 w-36 rounded" />

      {/* Match groups */}
      <div className="space-y-6">
        {[2, 1, 2, 1].map((count, gi) => (
          <div key={gi}>
            {/* Date header */}
            <div className="mb-3 flex items-center gap-2">
              <Skeleton className="h-8 w-44 rounded-lg" />
              <div className="h-px flex-1 bg-white/5" />
            </div>
            {/* Match rows */}
            <div className="space-y-3">
              {Array.from({ length: count }).map((_, mi) => (
                <div
                  key={mi}
                  className="overflow-hidden rounded-xl border border-white/[0.06] bg-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    {/* Match number */}
                    <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3 sm:w-28 sm:border-b-0 sm:border-r sm:py-4">
                      <Skeleton className="h-4 w-10 rounded" />
                      <Skeleton className="h-6 w-8 rounded" />
                    </div>
                    {/* Teams */}
                    <div className="flex flex-1 items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1.5">
                          <Skeleton className="h-4 w-12 rounded" />
                          <Skeleton className="h-3 w-24 rounded" />
                        </div>
                      </div>
                      <div className="mx-4 flex flex-col items-center gap-1">
                        <Skeleton className="h-4 w-8 rounded" />
                        <Skeleton className="h-3 w-12 rounded" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="space-y-1.5 text-right">
                          <Skeleton className="ml-auto h-4 w-12 rounded" />
                          <Skeleton className="ml-auto h-3 w-24 rounded" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </div>
                    </div>
                    {/* Action */}
                    <div className="flex items-center gap-3 border-t border-white/5 px-4 py-2 sm:border-l sm:border-t-0 sm:py-4 sm:pr-4">
                      <Skeleton className="h-9 w-28 rounded-lg" />
                    </div>
                  </div>
                  {/* Venue bar */}
                  <div className="border-t border-white/5 px-4 py-1.5">
                    <Skeleton className="h-3 w-48 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
