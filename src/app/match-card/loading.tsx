import { Skeleton } from "@/components/ui/skeleton";

export default function MatchCardLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-2 h-9 w-80 rounded-xl" />
        <Skeleton className="mx-auto h-4 w-72 rounded" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form panel */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-5">
          <Skeleton className="h-5 w-40 rounded" />
          {/* Match selector */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          {/* Photo upload */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
          {/* Name */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          {/* Team select */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="mt-2 h-11 w-full rounded-xl" />
        </div>

        {/* Card preview */}
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-[9/16] w-full rounded-2xl sm:aspect-square" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
