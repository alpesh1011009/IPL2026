import { Metadata } from "next";
import { MemesClient } from "./memes-client";

export const metadata: Metadata = {
  title: "Cricket Memes & Posts | CricPro",
  description: "Funny & informative cricket memes and posts. Copy and share on WhatsApp, Instagram, and more!",
};

export default function MemesPage() {
  return <MemesClient />;
}
