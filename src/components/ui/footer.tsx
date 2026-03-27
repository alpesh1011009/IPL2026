"use client";

import { Instagram, Mail, Phone, MapPin, Eye } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useBusinessDetails } from "@/hooks/use-business-details";
import { useEffect, useState } from "react";

export function Footer() {
  const { t } = useLanguage();
  const { details } = useBusinessDetails();
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get visitor count from localStorage
    const count = parseInt(localStorage.getItem("cricpro_visitors") || "0", 10) + 1;
    localStorage.setItem("cricpro_visitors", count.toString());
    setVisitorCount(count);
  }, []);

  const hasBusinessDetails = !!(
    details.companyName || details.phone || details.website ||
    details.instagram || details.facebook || details.twitter
  );

  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Business Details Section - if available */}
        {hasBusinessDetails && (
          <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-4 text-sm font-bold text-white">{"Business Details"}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {details.companyName && (
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-2">
                    <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5M9 21H3.5M21 7a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{"Company"}</p>
                    <p className="text-sm font-semibold text-white">{details.companyName}</p>
                  </div>
                </div>
              )}
              {details.phone && (
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-2">
                    <Phone className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{"Phone"}</p>
                    <a href={`tel:${details.phone}`} className="text-sm font-semibold text-white hover:text-primary transition-colors">
                      {details.phone}
                    </a>
                  </div>
                </div>
              )}
              {details.website && (
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-2">
                    <MapPin className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{"Website"}</p>
                    <a href={details.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-primary transition-colors truncate">
                      Visit
                    </a>
                  </div>
                </div>
              )}
              {(details.instagram || details.facebook || details.twitter) && (
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-2">
                    <Mail className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{"Social"}</p>
                    <div className="flex gap-2 mt-1">
                      {details.instagram && (
                        <a href={`https://instagram.com/${details.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-pink-400 transition-colors">
                          📷
                        </a>
                      )}
                      {details.facebook && (
                        <a href={`https://facebook.com/${details.facebook.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400 transition-colors">
                          👍
                        </a>
                      )}
                      {details.twitter && (
                        <a href={`https://twitter.com/${details.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-sky-400 transition-colors">
                          𝕏
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M15 5.2 Q11.5 2 8.5 3 Q4 4.5 4 10 Q4 15.5 8.5 17 Q11.5 18 15 14.8"
                        stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                  <circle cx="15.5" cy="10" r="2.8" fill="currentColor"/>
                  <path d="M14.2 8 Q12.8 10 14.2 12" stroke="rgba(0,0,0,0.28)" strokeWidth="0.65" fill="none" strokeLinecap="round"/>
                  <path d="M16.8 8 Q18.2 10 16.8 12" stroke="rgba(0,0,0,0.18)" strokeWidth="0.65" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                cricpost<span className="text-primary">.in</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{"Create viral cricket posters & memes with custom branding."}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{"Quick Links"}</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/players", label: "Player Cards" },
                { href: "/schedule", label: "Schedule" },
                { href: "/teams", label: "Teams" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{"Connect With Us"}</h4>
            <div className="flex gap-3 mb-3">
              <a
                href="https://instagram.com/cricpost_in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-pink-400 hover:bg-pink-500/20 transition-all hover:scale-110"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@cricpost.in"
                className="p-2.5 rounded-lg bg-white/5 text-blue-400 hover:bg-blue-500/20 transition-all hover:scale-110"
                title="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">{"Not affiliated with IPL or BCCI"}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {mounted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Eye className="h-3 w-3 text-primary" />
                <span className="font-mono text-primary">{visitorCount.toLocaleString()}</span>
                <span>{"Visitors"}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground">
            <a href="/about" className="hover:text-foreground transition-colors">
              {"About Us"}
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              {"Terms & Conditions"}
            </a>
            <a href="/help" className="hover:text-foreground transition-colors">
              {"Help"}
            </a>
            <p>© 2026 CricPost. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
