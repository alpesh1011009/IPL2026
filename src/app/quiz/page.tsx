import { Metadata } from "next";
import { Trophy } from "lucide-react";
import { CricketQuiz } from "@/components/quiz/cricket-quiz";

export const metadata: Metadata = {
  title: "Cricket Quiz | CricPro",
  description: "Test your IPL cricket knowledge with 15 trivia questions. How well do you know the teams, players, and history?",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Trophy className="h-3.5 w-3.5" />
          Cricket Trivia Challenge
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          How Well Do You Know{" "}
          <span className="text-primary">Cricket?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          15 questions about IPL teams, players, venues, and records. Get a grade and share your score!
        </p>
      </div>

      <CricketQuiz />
    </div>
  );
}
