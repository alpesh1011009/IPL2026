import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CricPro - Create Viral Cricket Posters & Memes",
  description:
    "Create stunning cricket posters, memes, and shareable content. Match posters, player cards, AI meme generator, and WhatsApp sharing.",
  keywords: ["cricket", "poster maker", "cricket meme", "cricket poster", "IPL", "player cards"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cricpro-theme')||localStorage.getItem('iplpro-theme');var map={orange:{p:'#f97316',pf:'#09090b',bg:'#09090b',card:'#18181b',sec:'#27272a',bdr:'#3f3f46'},violet:{p:'#8b5cf6',pf:'#ffffff',bg:'#0a0a12',card:'#13111f',sec:'#1e1b2e',bdr:'#2d2a45'},cyan:{p:'#06b6d4',pf:'#09090b',bg:'#080d10',card:'#0d1820',sec:'#112028',bdr:'#18303d'},rose:{p:'#f43f5e',pf:'#ffffff',bg:'#0f0709',card:'#1a0d10',sec:'#241218',bdr:'#3a1c22'},green:{p:'#22c55e',pf:'#09090b',bg:'#080c09',card:'#0e1810',sec:'#132015',bdr:'#1c3320'},gold:{p:'#eab308',pf:'#09090b',bg:'#0b0a05',card:'#181500',sec:'#241f00',bdr:'#3a3200'}};var v=map[t]||map.orange;var r=document.documentElement.style;r.setProperty('--color-primary',v.p);r.setProperty('--color-primary-foreground',v.pf);r.setProperty('--color-background',v.bg);r.setProperty('--color-card',v.card);r.setProperty('--color-secondary',v.sec);r.setProperty('--color-muted',v.sec);r.setProperty('--color-border',v.bdr);r.setProperty('--color-accent',v.p);r.setProperty('--color-ring',v.p);document.documentElement.style.backgroundColor=v.bg;}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
