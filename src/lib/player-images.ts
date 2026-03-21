export function getPlayerImageUrl(name: string, teamColor: string): string {
  const seed = name.replace(/\s+/g, "-");
  const bg = teamColor.replace("#", "");
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${seed}&backgroundColor=${bg}&backgroundType=gradientLinear`;
}

export function getPlayerInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
