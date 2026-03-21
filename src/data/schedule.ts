export interface Match {
  matchNumber: number;
  date: string;
  day: string;
  time: string;
  team1: string;
  team2: string;
  venue: string;
}

export const iplSchedule: Match[] = [
  { matchNumber: 1, date: "28 Mar 2026", day: "Saturday", time: "7:30 PM", team1: "RCB", team2: "SRH", venue: "M. Chinnaswamy Stadium, Bengaluru" },
  { matchNumber: 2, date: "29 Mar 2026", day: "Sunday", time: "7:30 PM", team1: "MI", team2: "KKR", venue: "Wankhede Stadium, Mumbai" },
  { matchNumber: 3, date: "30 Mar 2026", day: "Monday", time: "7:30 PM", team1: "RR", team2: "CSK", venue: "Barsapara Stadium, Guwahati" },
  { matchNumber: 4, date: "31 Mar 2026", day: "Tuesday", time: "7:30 PM", team1: "PBKS", team2: "GT", venue: "Maharaja Yadavindra Singh Intl. Stadium, Mullanpur" },
  { matchNumber: 5, date: "1 Apr 2026", day: "Wednesday", time: "7:30 PM", team1: "LSG", team2: "DC", venue: "Ekana Stadium, Lucknow" },
  { matchNumber: 6, date: "2 Apr 2026", day: "Thursday", time: "7:30 PM", team1: "KKR", team2: "SRH", venue: "Eden Gardens, Kolkata" },
  { matchNumber: 7, date: "3 Apr 2026", day: "Friday", time: "7:30 PM", team1: "CSK", team2: "PBKS", venue: "MA Chidambaram Stadium, Chennai" },
  { matchNumber: 8, date: "4 Apr 2026", day: "Saturday", time: "3:30 PM", team1: "DC", team2: "MI", venue: "Arun Jaitley Stadium, Delhi" },
  { matchNumber: 9, date: "4 Apr 2026", day: "Saturday", time: "7:30 PM", team1: "GT", team2: "RR", venue: "Narendra Modi Stadium, Ahmedabad" },
  { matchNumber: 10, date: "5 Apr 2026", day: "Sunday", time: "3:30 PM", team1: "SRH", team2: "LSG", venue: "Rajiv Gandhi Intl. Stadium, Hyderabad" },
  { matchNumber: 11, date: "5 Apr 2026", day: "Sunday", time: "7:30 PM", team1: "RCB", team2: "CSK", venue: "M. Chinnaswamy Stadium, Bengaluru" },
  { matchNumber: 12, date: "6 Apr 2026", day: "Monday", time: "7:30 PM", team1: "KKR", team2: "PBKS", venue: "Eden Gardens, Kolkata" },
  { matchNumber: 13, date: "7 Apr 2026", day: "Tuesday", time: "7:30 PM", team1: "RR", team2: "MI", venue: "Barsapara Stadium, Guwahati" },
  { matchNumber: 14, date: "8 Apr 2026", day: "Wednesday", time: "7:30 PM", team1: "DC", team2: "GT", venue: "Arun Jaitley Stadium, Delhi" },
  { matchNumber: 15, date: "9 Apr 2026", day: "Thursday", time: "7:30 PM", team1: "KKR", team2: "LSG", venue: "Eden Gardens, Kolkata" },
  { matchNumber: 16, date: "10 Apr 2026", day: "Friday", time: "7:30 PM", team1: "RR", team2: "RCB", venue: "Barsapara Stadium, Guwahati" },
  { matchNumber: 17, date: "11 Apr 2026", day: "Saturday", time: "3:30 PM", team1: "PBKS", team2: "SRH", venue: "Maharaja Yadavindra Singh Intl. Stadium, Mullanpur" },
  { matchNumber: 18, date: "11 Apr 2026", day: "Saturday", time: "7:30 PM", team1: "CSK", team2: "DC", venue: "MA Chidambaram Stadium, Chennai" },
  { matchNumber: 19, date: "12 Apr 2026", day: "Sunday", time: "3:30 PM", team1: "LSG", team2: "GT", venue: "Ekana Stadium, Lucknow" },
  { matchNumber: 20, date: "12 Apr 2026", day: "Sunday", time: "7:30 PM", team1: "MI", team2: "RCB", venue: "Wankhede Stadium, Mumbai" },
];

export const teamFullNames: Record<string, string> = {
  CSK: "Chennai Super Kings",
  MI: "Mumbai Indians",
  RCB: "Royal Challengers Bengaluru",
  KKR: "Kolkata Knight Riders",
  DC: "Delhi Capitals",
  PBKS: "Punjab Kings",
  RR: "Rajasthan Royals",
  SRH: "Sunrisers Hyderabad",
  GT: "Gujarat Titans",
  LSG: "Lucknow Super Giants",
};

export const teamColors: Record<string, string> = {
  CSK: "bg-yellow-500",
  MI: "bg-blue-600",
  RCB: "bg-red-600",
  KKR: "bg-purple-600",
  DC: "bg-blue-500",
  PBKS: "bg-red-500",
  RR: "bg-pink-500",
  SRH: "bg-orange-500",
  GT: "bg-cyan-700",
  LSG: "bg-teal-600",
};

export const teamTextColors: Record<string, string> = {
  CSK: "text-yellow-400",
  MI: "text-blue-400",
  RCB: "text-red-400",
  KKR: "text-purple-400",
  DC: "text-blue-400",
  PBKS: "text-red-400",
  RR: "text-pink-400",
  SRH: "text-orange-400",
  GT: "text-cyan-400",
  LSG: "text-teal-400",
};
