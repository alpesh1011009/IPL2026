import { Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Trophy className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">
              Cric<span className="text-primary">Pro</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2026 CricPro. Not affiliated with BCCI or any cricket board. All team logos are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
