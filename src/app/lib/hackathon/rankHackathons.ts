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
  prize: number;        // 重み 0 - 5
  popularity: number;   // 重み 0 - 5
  difficulty: number;   // 希望難易度 1 - 5
  sponsor: number;      // 重み 0 - 5
};

export type Filter = {
  onlineOnly: boolean;
  minPrize: number;
  maxDifficulty: number;
};

export type RankedHackathon = Hackathon & {
  score: number;
  reasons: string[];
};

export function rankHackathons(
  data: Hackathon[],
  preference: Preference,
  filter: Filter
): RankedHackathon[] {

  const filtered = data.filter((h) => {
    if (filter.onlineOnly && !h.online) return false;
    if (h.prize < filter.minPrize) return false;
    if (h.difficulty > filter.maxDifficulty) return false;
    return true;
  });

  if (filtered.length === 0) return [];

  const maxPrize = Math.max(...filtered.map((h) => h.prize), 1);

  return filtered
    .map((h) => {
      const reasons: string[] = [];

      // 正規化
      const prizeScore = h.prize / maxPrize;
      const popularityScore = h.popularity / 5;

      // 希望難易度との距離評価
      const difficultyScore =
        1 - Math.abs(h.difficulty - preference.difficulty) / 5;

      const sponsorScore = h.sponsor ? 1 : 0;

      // スコア計算
      const score =
        prizeScore * preference.prize +
        popularityScore * preference.popularity +
        difficultyScore * 2 + // 難易度は固定重み
        sponsorScore * preference.sponsor;

      // 理由生成
      if (prizeScore > 0.8)
        reasons.push("賞金額が高いイベントです");

      if (popularityScore > 0.7)
        reasons.push("人気が高く参加者が多いです");

      if (difficultyScore > 0.8)
        reasons.push("あなたの希望難易度に近いです");

      if (h.sponsor && preference.sponsor > 0)
        reasons.push("スポンサー企業が参加しています");

      if (h.online)
        reasons.push("オンライン参加が可能です");

      return {
        ...h,
        score: Number(score.toFixed(2)),
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score);
}
