export type Hackathon = {
  id: number;
  name: string;
  prize: number;        // 0 - 1000000
  popularity: number;   // 1 - 5
  difficulty: number;   // 1 - 5
  sponsor: boolean;
  online: boolean;
};

export type Preference = {
  prizeWeight: number;         // 0 - 5
  popularityWeight: number;    // 0 - 5
  difficultyWeight: number;    // 0 - 5
  sponsorWeight: number;       // 0 - 5
  preferredDifficulty: number; // 1 - 5
};

export type Filter = {
  onlineOnly: boolean;
  minPrize: number;
  maxDifficulty: number;
};

export type RankedHackathon = Hackathon & {
  score: number;      // 0 - 1
  stars: number;      // 0 - 5
  reasons: string[];
};

export function rankHackathons(
  data: Hackathon[],
  preference: Preference,
  filter: Filter
): RankedHackathon[] {

  // -------------------------
  // 1. フィルタリング
  // -------------------------
  const filtered = data.filter((h) => {
    if (filter.onlineOnly && !h.online) return false;
    if (h.prize < filter.minPrize) return false;
    if (h.difficulty > filter.maxDifficulty) return false;
    return true;
  });

  if (filtered.length === 0) return [];

  // 安定した正規化用の定数
  const MAX_PRIZE = 1_000_000;
  const MAX_POPULARITY = 5;
  const MAX_DIFFICULTY = 5;

  return filtered
    .map((h) => {

      const reasons: string[] = [];

      // -------------------------
      // 2. 各項目スコア (0〜1)
      // -------------------------
      const prizeScore = h.prize / MAX_PRIZE;
      const popularityScore = h.popularity / MAX_POPULARITY;

      const difficultyScore =
        1 - Math.abs(h.difficulty - preference.preferredDifficulty) / MAX_DIFFICULTY;

      const sponsorScore = h.sponsor ? 1 : 0;

      // -------------------------
      // 3. 重み付きスコア
      // -------------------------
      const rawScore =
        prizeScore * preference.prizeWeight +
        popularityScore * preference.popularityWeight +
        difficultyScore * preference.difficultyWeight +
        sponsorScore * preference.sponsorWeight;

      const totalWeight =
        preference.prizeWeight +
        preference.popularityWeight +
        preference.difficultyWeight +
        preference.sponsorWeight;

      const normalizedScore =
        totalWeight === 0 ? 0 : rawScore / totalWeight;

      // -------------------------
      // 4. 理由生成（重みがあるものだけ）
      // -------------------------
      if (preference.prizeWeight > 0 && prizeScore > 0.7) {
        reasons.push("賞金額が高いイベントです");
      }

      if (preference.popularityWeight > 0 && popularityScore > 0.7) {
        reasons.push("人気が高いイベントです");
      }

      if (preference.difficultyWeight > 0 && difficultyScore > 0.8) {
        reasons.push("あなたの希望難易度に近いです");
      }

      if (preference.sponsorWeight > 0 && h.sponsor) {
        reasons.push("スポンサー企業が参加しています");
      }

      if (h.online) {
        reasons.push("オンライン参加が可能です");
      }

      return {
        ...h,
        score: Number(normalizedScore.toFixed(3)),
        stars: Math.round(normalizedScore * 5),
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score);
}
