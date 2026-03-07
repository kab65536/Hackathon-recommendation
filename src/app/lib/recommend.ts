import { Hackathon } from "@/types/hackathon";
import { UserProfile } from "@/types/UserProfile";

export function calculateScore(
  hackathon: Hackathon,
  user: UserProfile
): { score: number; reasons: string[] } {

  let score = 0;
  const reasons: string[] = [];

  /* 興味タグ一致 */

  const matchedTags = user.interests.filter((interest) =>
    hackathon.tags.includes(interest)
  );

  if (matchedTags.length > 0) {

    score += matchedTags.length * 20;

    reasons.push(
      `興味分野「${matchedTags.join(" / ")}」が一致`
    );

  }

  /* 開催場所 */

  if (user.location === hackathon.location) {

    score += 30;

    reasons.push("開催場所が近い");

  }

  /* 経験レベル */

  if (hackathon.level === user.experienceLevel) {

    score += 20;

    reasons.push("あなたの経験レベルに合っている");

  }

  /* 参加形式 */

  if (hackathon.participationType === user.participationType) {

    score += 15;

    reasons.push("希望する参加形式");

  }

  /* 開催形式 */

  if (hackathon.mode === user.mode) {

    score += 15;

    reasons.push("希望する開催形式");

  }

  /* 最大100点 */

  if (score > 100) {
    score = 100;
  }

  return {
    score,
    reasons
  };

}
