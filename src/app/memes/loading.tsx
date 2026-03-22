import { Skeleton } from "@/components/ui/skeleton";

export default function MemesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="mb-1.5 h-6 w-36 rounded-full" />
        <Skeleton className="h-9 w-56 rounded-xl" />
        <Skeleton className="mt-1 h-4 w-72 rounded" />
      </div>

      {/* Controls / toolbar */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-sm rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      {/* Meme card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-white/[0.06] bg-card"
          >
            <Skeleton className="h-52 w-full rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
