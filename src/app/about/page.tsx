import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CricPost is a free cricket poster and meme maker built for IPL 2026 fans. Create match posters, player cards, memes, and Instagram posts with your business branding — no sign-up needed.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://cricpost.in/about" },
  openGraph: {
    title: "About CricPost — Free Cricket Poster & Meme Maker",
    description:
      "Learn about CricPost — the free fan-made tool to create IPL 2026 match posters, player cards, memes & Instagram posts with your business branding.",
    url: "https://cricpost.in/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CricPost — Free Cricket Poster & Meme Maker",
    description:
      "CricPost lets cricket fans create IPL 2026 posters, player cards, memes & Instagram posts with business branding — 100% free.",
    images: ["/og-image.png"],
  },
};

const features = [
  {
    title: "Match Poster Maker",
    description:
      "Generate eye-catching IPL 2026 match posters for any fixture in seconds. Add your business name, logo, and contact details to reach customers through cricket content.",
  },
  {
    title: "Player Cards",
    description:
      "Create stylish player cards for all 150+ IPL 2026 players across all 10 franchises. Perfect for sharing on WhatsApp, Instagram, and social media.",
  },
  {
    title: "Cricket Meme Generator",
    description:
      "Browse 100+ cricket meme templates and personalise them with your branding. Turn viral cricket moments into promotional content instantly.",
  },
  {
    title: "Instagram Post Creator",
    description:
      "Design square and story-format cricket graphics optimised for Instagram. Export in high resolution and post directly from the app.",
  },
  {
    title: "Jersey Editor",
    description:
      "Customise IPL team jerseys with your own colours and branding. A fun way to create unique cricket-themed content for your audience.",
  },
  {
    title: "Own Poster Builder",
    description:
      "Start from a blank canvas and design your own cricket poster from scratch. Full creative control with IPL-themed design elements.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Structured data — AboutPage + Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "@id": "https://cricpost.in/about",
              url: "https://cricpost.in/about",
              name: "About CricPost",
              description:
                "CricPost is a free fan-made cricket poster and meme maker for IPL 2026. Create match posters, player cards, memes, and Instagram posts with business branding.",
              isPartOf: { "@id": "https://cricpost.in/#website" },
              about: { "@id": "https://cricpost.in/#organization" },
              inLanguage: "en-IN",
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://cricpost.in/#organization",
              name: "CricPost",
              url: "https://cricpost.in",
              logo: {
                "@type": "ImageObject",
                url: "https://cricpost.in/icon.svg",
              },
              description:
                "CricPost is a free cricket poster maker and meme generator for IPL 2026 fans and businesses.",
              foundingDate: "2025",
              sameAs: ["https://instagram.com/cricpost_in"],
              contactPoint: {
                "@type": "ContactPoint",
                url: "https://cricpost.in/help",
                contactType: "Customer Support",
              },
            },
          ]),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <h1 className="mb-4 text-3xl font-bold">About CricPost</h1>
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">
          CricPost is a <strong className="text-foreground">free, fan-made cricket poster and meme maker</strong> built
          for IPL 2026. Whether you&apos;re a cricket fan wanting to celebrate your team or a local business looking to
          connect with customers through cricket content — CricPost gives you everything you need in one place, with
          zero cost and no sign-up required.
        </p>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-3 text-xl font-semibold">Our Mission</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We believe cricket is more than a sport — it&apos;s a shared language that connects millions of people
            across India. Our mission is to make it effortless for fans and small businesses to create high-quality
            cricket content they can be proud of. From match-day posters to viral memes, CricPost turns your love for
            the game into shareable content in seconds.
          </p>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">What You Can Create</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="mb-12">
          <h2 className="mb-3 text-xl font-semibold">Who Is CricPost For?</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Cricket fans</strong> — share match predictions, celebrate wins, and
              show team spirit with beautifully designed graphics.
            </li>
            <li>
              <strong className="text-foreground">Small businesses</strong> — ride the IPL wave by branding match
              posters with your logo, name, and contact number to reach local customers.
            </li>
            <li>
              <strong className="text-foreground">Social media creators</strong> — generate a steady stream of
              cricket-themed content during the IPL 2026 season without any design skills.
            </li>
            <li>
              <strong className="text-foreground">Sports shops &amp; academies</strong> — promote your offerings
              through timely, topical cricket content that resonates with your audience.
            </li>
          </ul>
        </section>

        {/* Why free */}
        <section className="mb-12">
          <h2 className="mb-3 text-xl font-semibold">100% Free — No Catch</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every feature on CricPost is completely free to use. No watermarks on downloads, no premium tiers, no
            hidden charges. We&apos;re cricket fans who wanted a tool like this, so we built it — and we&apos;re sharing
            it with everyone.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-12 rounded-lg border border-border bg-card p-5">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Fan-Made — Not Affiliated with BCCI / IPL</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            CricPost is an independent, fan-made project. We are not affiliated with, endorsed by, or connected to the
            Board of Control for Cricket in India (BCCI), the Indian Premier League (IPL), any IPL franchise, or any
            official cricket body. All team names, logos, and player images remain the intellectual property of their
            respective owners.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">Get in Touch</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Have feedback, a feature request, or a question? We&apos;d love to hear from you. Reach out via our{" "}
            <a href="/help" className="text-primary underline-offset-4 hover:underline">
              Help &amp; Support
            </a>{" "}
            page or find us on Instagram at{" "}
            <a
              href="https://instagram.com/cricpost_in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              @cricpost_in
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
