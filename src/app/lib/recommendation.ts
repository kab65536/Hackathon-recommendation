import { Hackathon } from "@/types/hackathon";
import { UserProfile } from "@/types/UserProfile";


export type RecommendationResult = {
  hackathon: Hackathon;
  score: number;
  reasons: string[];
};

export function calculateRecommendation(
  user: UserProfile,
  hackathon: Hackathon
): RecommendationResult {
  let score = 0;
  const reasons: string[] = [];

  const matchedTags: string[] = hackathon.tags.filter((tag: string) =>
    user.interests.includes(tag)
  );

  if (matchedTags.length > 0) {
    score += matchedTags.length * 20;
    reasons.push(`興味分野（${matchedTags.join(", ")}）が一致`);
  }

  if (user.experienceLevel === hackathon.level) {
    score += 20;
    reasons.push("経験レベルが一致");
  }

  if (user.participationType === hackathon.participationType) {
    score += 15;
    reasons.push("参加形式が一致");
  }

  if (user.mode === hackathon.mode) {
    score += 15;
    reasons.push("参加方法が一致");
  }

  return {
    hackathon,
    score,
    reasons,
  };
}
