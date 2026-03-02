import { Hackathon } from "@/types/hackathon";
import { UserProfile } from "@/types/UserProfile";

export function calculateScore(
  hackathon: Hackathon,
  user: UserProfile
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const matchedTags = user.interests.filter((interest) =>
    hackathon.tags.includes(interest)
  );

  if (matchedTags.length > 0) {
    score += matchedTags.length * 20;
    reasons.push("Matches your interests");
  }

  if (user.location === hackathon.location) {
    score += 30;
    reasons.push("Near your location");
  }

  return { score, reasons };
}
