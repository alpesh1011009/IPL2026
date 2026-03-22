import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
          <div className="grid gap-6 lg:gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text side */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-52 rounded-full" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-4/5 rounded-xl" />
              <Skeleton className="mt-5 h-5 w-full rounded" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <div className="mt-5 flex gap-3">
                <Skeleton className="h-12 w-44 rounded-xl" />
                <Skeleton className="h-12 w-36 rounded-xl" />
              </div>
              <div className="mt-5 flex items-center gap-6">
                <Skeleton className="h-10 w-12 rounded" />
                <div className="h-8 w-px bg-white/10" />
                <Skeleton className="h-10 w-12 rounded" />
                <div className="h-8 w-px bg-white/10" />
                <Skeleton className="h-10 w-12 rounded" />
              </div>
            </div>
            {/* Team logos grid */}
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Skeleton className="mx-auto mb-8 h-9 w-64 rounded-xl" />
          <div className="grid gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-5 flex items-center justify-between">
            <Skeleton className="h-8 w-56 rounded-xl" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Skeleton className="mx-auto mb-10 h-9 w-72 rounded-xl" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Teams Strip */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-7 w-40 rounded-xl" />
            <Skeleton className="h-5 w-28 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
