"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Share2 } from "lucide-react";

interface Question {
  q: string;
  options: string[];
  answer: number; // index
  fact: string;
}

const QUESTIONS: Question[] = [
  {
    q: "Which team has won the most IPL titles (as of 2026)?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Royal Challengers Bengaluru"],
    answer: 1,
    fact: "CSK has won 5 IPL titles (2010, 2011, 2018, 2021, 2023).",
  },
  {
    q: "Which stadium is home ground for Mumbai Indians?",
    options: ["Eden Gardens", "MA Chidambaram Stadium", "Wankhede Stadium", "Narendra Modi Stadium"],
    answer: 2,
    fact: "Wankhede Stadium in Mumbai is the fortress of Mumbai Indians.",
  },
  {
    q: "Who is the captain of Chennai Super Kings in IPL 2026?",
    options: ["MS Dhoni", "Ruturaj Gaikwad", "Shivam Dube", "Deepak Chahar"],
    answer: 1,
    fact: "Ruturaj Gaikwad leads CSK in 2026. MS Dhoni continues as a player.",
  },
  {
    q: "Which IPL team plays at Eden Gardens, Kolkata?",
    options: ["Delhi Capitals", "Rajasthan Royals", "Kolkata Knight Riders", "Sunrisers Hyderabad"],
    answer: 2,
    fact: "Eden Gardens is one of cricket's most iconic venues — KKR's home since 2008.",
  },
  {
    q: "What does 'SRH' stand for in IPL?",
    options: ["Sunrisers Hyderabad", "Super Riders Hyderabad", "South Riders Hyderabad", "Stars of Rajasthan Hyderabad"],
    answer: 0,
    fact: "Sunrisers Hyderabad joined IPL in 2013, replacing the Deccan Chargers.",
  },
  {
    q: "Which player has scored the highest individual innings in IPL history (175*)?",
    options: ["Virat Kohli", "AB de Villiers", "Chris Gayle", "David Warner"],
    answer: 2,
    fact: "Chris Gayle blasted 175* off 66 balls for RCB vs PWI in 2013 — an IPL record.",
  },
  {
    q: "Narendra Modi Stadium (Ahmedabad) is the home ground of which IPL team?",
    options: ["Rajasthan Royals", "Gujarat Titans", "Lucknow Super Giants", "Punjab Kings"],
    answer: 1,
    fact: "Gujarat Titans, founded in 2022, made it their fortress and won the title in their debut season.",
  },
  {
    q: "Which team is coached by Stephen Fleming in IPL 2026?",
    options: ["Mumbai Indians", "Kolkata Knight Riders", "Chennai Super Kings", "Rajasthan Royals"],
    answer: 2,
    fact: "Stephen Fleming (former NZ captain) has been CSK's head coach since 2009.",
  },
  {
    q: "IPL 2026 features how many teams?",
    options: ["8", "9", "10", "12"],
    answer: 2,
    fact: "IPL 2026 has 10 franchises competing across India.",
  },
  {
    q: "Which team plays at MA Chidambaram Stadium, Chennai?",
    options: ["Gujarat Titans", "Chennai Super Kings", "Rajasthan Royals", "Delhi Capitals"],
    answer: 1,
    fact: "Chepauk — as fans call it — has been CSK's home since IPL's inaugural edition in 2008.",
  },
  {
    q: "Which of these teams has NEVER won an IPL title?",
    options: ["Rajasthan Royals", "Royal Challengers Bengaluru", "Kolkata Knight Riders", "Sunrisers Hyderabad"],
    answer: 1,
    fact: "RCB has reached the final three times but is yet to win the IPL title.",
  },
  {
    q: "Which team's primary color is purple and gold?",
    options: ["Delhi Capitals", "Kolkata Knight Riders", "Chennai Super Kings", "Punjab Kings"],
    answer: 1,
    fact: "KKR's iconic purple-and-gold jersey has been a fan favourite since the franchise was launched in 2008.",
  },
  {
    q: "LSG stands for which IPL team?",
    options: ["Lucknow Super Giants", "Lahore Strikers Group", "Large Scale Growers", "Lucknow Star Gladiators"],
    answer: 0,
    fact: "Lucknow Super Giants debuted in IPL 2022 and play at the Ekana Stadium, Lucknow.",
  },
  {
    q: "Who is nicknamed 'Captain Cool' in cricket?",
    options: ["Rohit Sharma", "Virat Kohli", "MS Dhoni", "Ruturaj Gaikwad"],
    answer: 2,
    fact: "MS Dhoni earned the 'Captain Cool' tag for his calm demeanour under pressure.",
  },
  {
    q: "Which IPL franchise is based in Jaipur?",
    options: ["Punjab Kings", "Gujarat Titans", "Rajasthan Royals", "Sunrisers Hyderabad"],
    answer: 2,
    fact: "Rajasthan Royals won the first-ever IPL title in 2008 under Shane Warne's captaincy.",
  },
];

const GRADE = [
  { min: 14, label: "Cricket Genius!", emoji: "🏆", color: "text-yellow-400" },
  { min: 11, label: "Cricket Expert", emoji: "🌟", color: "text-green-400" },
  { min: 8,  label: "Good Fan!",       emoji: "😎", color: "text-blue-400"  },
  { min: 5,  label: "Keep Watching!",  emoji: "📺", color: "text-orange-400" },
  { min: 0,  label: "Just Starting!",  emoji: "🏏", color: "text-muted-foreground" },
];

function getGrade(score: number) {
  return GRADE.find((g) => score >= g.min) ?? GRADE[GRADE.length - 1];
}

export function CricketQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [shared, setShared] = useState(false);

  const q = QUESTIONS[current];
  const answered = selected !== null;
  const score = answers.filter((a, i) => a === QUESTIONS[i].answer).length;

  function handleSelect(idx: number) {
    if (answered) return;
    const updated = [...answers];
    updated[current] = idx;
    setAnswers(updated);
    setSelected(idx);
  }

  function handleNext() {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(answers[current + 1]);
    } else {
      setShowResult(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowResult(false);
    setShared(false);
  }

  async function handleShare() {
    const grade = getGrade(score);
    const text = `🏏 CricPro Cricket Quiz\nI scored ${score}/${QUESTIONS.length} — ${grade.label} ${grade.emoji}\nTest your cricket knowledge at cricpro.in!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "CricPro Quiz Result", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {}
  }

  if (showResult) {
    const grade = getGrade(score);
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 text-6xl">{grade.emoji}</div>
        <h2 className={`mb-1 text-3xl font-extrabold ${grade.color}`}>{grade.label}</h2>
        <p className="mb-6 text-muted-foreground">
          You answered <span className="font-bold text-white">{score} out of {QUESTIONS.length}</span> correctly
        </p>

        {/* Score ring */}
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/30 bg-primary/10">
          <div>
            <p className="text-3xl font-black text-primary">{pct}%</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Score</p>
          </div>
        </div>

        {/* Per-question review */}
        <div className="mb-6 space-y-2 text-left">
          {QUESTIONS.map((q, i) => {
            const isCorrect = answers[i] === q.answer;
            return (
              <div key={i} className={`rounded-lg border p-3 text-xs ${isCorrect ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                <div className="flex items-start gap-2">
                  {isCorrect
                    ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                    : <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  }
                  <div>
                    <p className="font-semibold text-white">{q.q}</p>
                    {!isCorrect && (
                      <p className="mt-0.5 text-muted-foreground">
                        Correct: <span className="text-green-400">{q.options[q.answer]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Share2 className="h-4 w-4" />
            {shared ? "Copied!" : "Share Result"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {current + 1} of {QUESTIONS.length}</span>
          <span className="font-semibold text-primary">{score} correct so far</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((current + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-8">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Trophy className="h-3 w-3" /> Cricket Trivia
        </div>
        <h3 className="mb-6 text-lg font-bold leading-snug text-white sm:text-xl">
          {q.q}
        </h3>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isSelected = i === selected;
            let cls = "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ";

            if (!answered) {
              cls += "border-white/10 bg-white/5 text-white hover:border-primary/40 hover:bg-primary/5 cursor-pointer";
            } else if (isCorrect) {
              cls += "border-green-500/50 bg-green-500/10 text-green-300";
            } else if (isSelected) {
              cls += "border-red-500/50 bg-red-500/10 text-red-300";
            } else {
              cls += "border-white/5 bg-white/[0.02] text-white/40";
            }

            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={answered}>
                <span className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold
                    ${!answered ? "border-white/20 bg-white/5" : isCorrect ? "border-green-500/50 bg-green-500/20 text-green-300" : isSelected ? "border-red-500/50 bg-red-500/20 text-red-300" : "border-white/10 bg-white/5 text-white/40"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {answered && isCorrect && <CheckCircle2 className="ml-auto h-4 w-4 text-green-400" />}
                  {answered && isSelected && !isCorrect && <XCircle className="ml-auto h-4 w-4 text-red-400" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fact + Next */}
        {answered && (
          <div className="mt-5">
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
              <span className="font-semibold text-primary">Did you know? </span>
              {q.fact}
            </div>
            <button
              onClick={handleNext}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              {current < QUESTIONS.length - 1 ? "Next Question →" : "See Results"}
            </button>
          </div>
        )}
      </div>

      {/* Mini score dots */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {QUESTIONS.map((_, i) => {
          const a = answers[i];
          const done = a !== null;
          const correct = done && a === QUESTIONS[i].answer;
          return (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === current ? "scale-125 ring-2 ring-primary ring-offset-1 ring-offset-card bg-primary" :
                done ? correct ? "bg-green-500" : "bg-red-500" : "bg-white/15"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
