import type { Metadata } from "next";
import { MatchCardBuilder } from "@/components/match-card/match-card-builder";

export const metadata: Metadata = {
  title: "I'm Going to the Match | CricPro",
  description: "Create your personalized cricket match attendance card with your photo and share it on social media.",
};

export default function MatchCardPage() {
  return <MatchCardBuilder />;
}
