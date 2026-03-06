import { Hackathon } from "@/types/hackathon";
import { UserProfile } from "@/types/UserProfile";

export type RecommendationResult = {
  hackathon: Hackathon;
  score: number;
  reasons: string[];
};

const levelScoreMap = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
} as const;


/* -----------------------------
   TAG SCORE
----------------------------- */

function calculateTagScore(
  user: UserProfile,
  hackathon: Hackathon
): { score: number; reason?: string } {

  if (!hackathon.tags || hackathon.tags.length === 0) {
    return { score: 0 };
  }

  const matchedTags = hackathon.tags.filter(tag =>
    user.interests.includes(tag)
  );

  const ratio = matchedTags.length / hackathon.tags.length;
  const score = ratio * 30;

  if (matchedTags.length > 0) {
    return {
      score,
      reason: `興味タグ一致: ${matchedTags.join(", ")}`
    };
  }

  return { score: 0 };
}


/* -----------------------------
   LANGUAGE SCORE
----------------------------- */

function calculateLanguageScore(
  user: UserProfile,
  hackathon: Hackathon
): { score: number; reason?: string } {

  if (!hackathon.tags) {
    return { score: 0 };
  }

  const matches = hackathon.tags.filter(tag =>
    user.languages.includes(tag)
  );

  if (matches.length > 0) {
    return {
      score: 15,
      reason: `使用言語が活かせる: ${matches.join(", ")}`
    };
  }

  return { score: 0 };
}


/* -----------------------------
   LEVEL SCORE
----------------------------- */

function calculateLevelScore(
  user: UserProfile,
  hackathon: Hackathon
): { score: number; reason?: string } {

  const userLevel = levelScoreMap[user.experienceLevel];
  const hackLevel = levelScoreMap[hackathon.level];

  const diff = Math.abs(userLevel - hackLevel);

  if (diff === 0) {
    return { score: 20, reason: "経験レベル完全一致" };
  }

  if (diff === 1) {
    return { score: 12, reason: "レベルが近い" };
  }

  return { score: 4 };
}


/* -----------------------------
   PARTICIPATION SCORE
----------------------------- */

function calculateParticipationScore(
  user: UserProfile,
  hackathon: Hackathon
): { score: number; reason?: string } {

  if (user.participationType === hackathon.participationType) {
    return { score: 10, reason: "参加形式一致" };
  }

  return { score: 4 };
}


/* -----------------------------
   MODE SCORE
----------------------------- */

function calculateModeScore(
  user: UserProfile,
  hackathon: Hackathon
): { score: number; reason?: string } {

  if (user.mode === hackathon.mode) {
    return { score: 10, reason: "開催形式一致" };
  }

  if (user.mode === "Online" && hackathon.mode === "Offline") {
    return { score: 4 };
  }

  return { score: 2 };
}


/* -----------------------------
   LOCATION SCORE
----------------------------- */

function calculateLocationScore(
  user: UserProfile,
  hackathon: Hackathon
): { score: number; reason?: string } {

  if (!user.location || !hackathon.location) {
    return { score: 0 };
  }

  if (
    hackathon.location
      .toLowerCase()
      .includes(user.location.toLowerCase())
  ) {
    return { score: 10, reason: "開催地が近い" };
  }

  return { score: 3 };
}


/* -----------------------------
   DATE SCORE
----------------------------- */

function calculateDateScore(
  hackathon: Hackathon
): { score: number; reason?: string } {

  const today = new Date();
  const eventDate = new Date(hackathon.date);

  const diffDays =
    (eventDate.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays < 0) {
    return { score: -10 };
  }

  if (diffDays < 30) {
    return { score: 5, reason: "近日開催" };
  }

  return { score: 2 };
}


/* -----------------------------
   MAIN RECOMMENDATION
----------------------------- */

export function calculateRecommendation(
  user: UserProfile,
  hackathon: Hackathon
): RecommendationResult {

  let score = 0;
  const reasons: string[] = [];

  const tag = calculateTagScore(user, hackathon);
  score += tag.score;
  if (tag.reason) reasons.push(tag.reason);

  const lang = calculateLanguageScore(user, hackathon);
  score += lang.score;
  if (lang.reason) reasons.push(lang.reason);

  const level = calculateLevelScore(user, hackathon);
  score += level.score;
  if (level.reason) reasons.push(level.reason);

  const participation = calculateParticipationScore(user, hackathon);
  score += participation.score;
  if (participation.reason) reasons.push(participation.reason);

  const mode = calculateModeScore(user, hackathon);
  score += mode.score;
  if (mode.reason) reasons.push(mode.reason);

  const location = calculateLocationScore(user, hackathon);
  score += location.score;
  if (location.reason) reasons.push(location.reason);

  const date = calculateDateScore(hackathon);
  score += date.score;
  if (date.reason) reasons.push(date.reason);

  score = Math.min(100, Math.max(0, Math.round(score)));

  return {
    hackathon,
    score,
    reasons
  };
}


/* -----------------------------
   SORT RECOMMENDATIONS
----------------------------- */

export function getSortedRecommendations(
  user: UserProfile,
  hackathons: Hackathon[]
): RecommendationResult[] {

  const results = hackathons.map(h =>
    calculateRecommendation(user, h)
  );

  return results.sort((a, b) => b.score - a.score);
}
