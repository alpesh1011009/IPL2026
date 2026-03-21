export function CricketBall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
      <path d="M30 15C35 30 35 70 30 85" stroke="#FEF2F2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 15C65 30 65 70 70 85" stroke="#FEF2F2" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="25" x2="32" y2="25" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="35" x2="33" y2="35" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="45" x2="33" y2="45" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="55" x2="33" y2="55" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="65" x2="33" y2="65" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="75" x2="32" y2="75" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="68" y1="25" x2="72" y2="25" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="35" x2="73" y2="35" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="45" x2="73" y2="45" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="55" x2="73" y2="55" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="65" x2="73" y2="65" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="68" y1="75" x2="72" y2="75" stroke="#FEF2F2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CricketBat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="0" width="20" height="80" rx="4" fill="#D4A574" stroke="#A0845C" strokeWidth="1.5" />
      <rect x="10" y="80" width="40" height="90" rx="6" fill="#E8C99B" stroke="#C4A06A" strokeWidth="1.5" />
      <rect x="25" y="170" width="10" height="30" rx="3" fill="#8B6914" stroke="#6B4F10" strokeWidth="1" />
      <line x1="20" y1="100" x2="40" y2="100" stroke="#D4A574" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="120" x2="40" y2="120" stroke="#D4A574" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="140" x2="40" y2="140" stroke="#D4A574" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

export function Stumps({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="5" height="140" rx="2" fill="#D4A574" stroke="#A0845C" strokeWidth="1" />
      <rect x="37" y="20" width="5" height="140" rx="2" fill="#D4A574" stroke="#A0845C" strokeWidth="1" />
      <rect x="59" y="20" width="5" height="140" rx="2" fill="#D4A574" stroke="#A0845C" strokeWidth="1" />
      <rect x="13" y="18" width="12" height="4" rx="2" fill="#E8C99B" />
      <rect x="35" y="18" width="12" height="4" rx="2" fill="#E8C99B" />
      <rect x="57" y="18" width="12" height="4" rx="2" fill="#E8C99B" />
      <rect x="12" y="12" width="26" height="4" rx="2" fill="#DC2626" opacity="0.8" />
      <rect x="40" y="12" width="26" height="4" rx="2" fill="#DC2626" opacity="0.8" />
    </svg>
  );
}
