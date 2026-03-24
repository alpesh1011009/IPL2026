import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import { LanguageProvider } from "@/context/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cricpost.in"),
  title: {
    default: "CricPost — Free Cricket Poster & Meme Maker | IPL 2026",
    template: "%s | CricPost - Cricket Poster Maker",
  },
  description:
    "Create stunning IPL 2026 cricket posters, player cards, memes & match designs. Add your business branding, download instantly as PNG/JPG, and share on WhatsApp & Instagram. 100% free, no registration needed.",
  keywords: [
    "cricket poster maker", "IPL poster", "IPL 2026", "cricket meme generator",
    "cricket player cards", "match poster download", "cricket WhatsApp status",
    "cricket business poster", "free cricket poster", "IPL schedule 2026",
    "cricpost", "cricket fan poster", "IPL memes", "cricket quiz",
    "cricket design", "social media cricket content", "cricket graphics",
    "team poster", "player card maker", "cricket fan tools"
  ],
  authors: [{ name: "CricPost", url: "https://cricpost.in" }],
  creator: "CricPost",
  publisher: "CricPost",
  applicationName: "CricPost",
  category: "sports",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cricpost.in",
    siteName: "CricPost",
    title: "CricPost — Free Cricket Poster & Meme Maker | IPL 2026",
    description:
      "Create IPL 2026 match posters, player cards & memes with your business branding. Free download. Share on WhatsApp & Instagram instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CricPost — Cricket Poster & Meme Maker",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cricpost_in",
    creator: "@cricpost_in",
    title: "CricPost — Free Cricket Poster & Meme Maker",
    description:
      "Create IPL 2026 match posters, player cards & memes with your business branding. Free download.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://cricpost.in",
    languages: {
      "en-IN": "https://cricpost.in",
      "hi-IN": "https://cricpost.in?lang=hi",
      "gu-IN": "https://cricpost.in?lang=gu",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Viewport & Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CricPost" />
        <meta name="theme-color" content="#09090b" />

        {/* Additional SEO */}
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://cricpost.in/#website",
                  url: "https://cricpost.in",
                  name: "CricPost",
                  description:
                    "Free cricket poster maker with business branding — IPL 2026 match posters, player cards, memes & more.",
                  inLanguage: ["en-IN", "hi-IN", "gu-IN"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://cricpost.in/search?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://cricpost.in/#organization",
                  name: "CricPost",
                  url: "https://cricpost.in",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://cricpost.in/icon.svg",
                  },
                  sameAs: ["https://instagram.com/cricpost_in"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    url: "https://cricpost.in/help",
                    contactType: "Customer Support",
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://cricpost.in/#app",
                  name: "CricPost",
                  description: "Free cricket poster and meme maker for IPL 2026",
                  url: "https://cricpost.in",
                  applicationCategory: "Sports",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "INR",
                  },
                },
              ],
            }),
          }}
        />
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cricpost-theme')||localStorage.getItem('cricpro-theme')||localStorage.getItem('iplpro-theme');var map={orange:{p:'#f97316',pf:'#09090b',bg:'#09090b',card:'#18181b',sec:'#27272a',bdr:'#3f3f46'},violet:{p:'#8b5cf6',pf:'#ffffff',bg:'#0a0a12',card:'#13111f',sec:'#1e1b2e',bdr:'#2d2a45'},cyan:{p:'#06b6d4',pf:'#09090b',bg:'#080d10',card:'#0d1820',sec:'#112028',bdr:'#18303d'},rose:{p:'#f43f5e',pf:'#ffffff',bg:'#0f0709',card:'#1a0d10',sec:'#241218',bdr:'#3a1c22'},green:{p:'#22c55e',pf:'#09090b',bg:'#080c09',card:'#0e1810',sec:'#132015',bdr:'#1c3320'},gold:{p:'#eab308',pf:'#09090b',bg:'#0b0a05',card:'#181500',sec:'#241f00',bdr:'#3a3200'}};var v=map[t]||map.orange;var r=document.documentElement.style;r.setProperty('--color-primary',v.p);r.setProperty('--color-primary-foreground',v.pf);r.setProperty('--color-background',v.bg);r.setProperty('--color-card',v.card);r.setProperty('--color-secondary',v.sec);r.setProperty('--color-muted',v.sec);r.setProperty('--color-border',v.bdr);r.setProperty('--color-accent',v.p);r.setProperty('--color-ring',v.p);document.documentElement.style.backgroundColor=v.bg;}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        </>
      )}
    </html>
  );
}
