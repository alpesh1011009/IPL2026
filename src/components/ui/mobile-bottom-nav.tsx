"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ImageIcon,
  CreditCard,
  CalendarDays,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/poster", icon: ImageIcon, label: "Poster" },
  { href: "/players", icon: CreditCard, label: "Players" },
  { href: "/schedule", icon: CalendarDays, label: "Schedule" },
  { href: "/teams", icon: Users, label: "Teams" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-white/10 bg-background/95 backdrop-blur-lg safe-area-bottom">
      <div className="flex items-stretch justify-around">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium leading-tight">{label}</span>
              {active && (
                <span className="absolute bottom-0 h-0.5 w-8 rounded-t-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
