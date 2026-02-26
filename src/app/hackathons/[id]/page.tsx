"use client";

import { useEffect, useState } from "react";
import { mockHackathons } from "@/data/mockHackathons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default function HackathonDetailPage({ params }: Props) {
  const hackathon = mockHackathons.find(
    (h) => h.id === params.id
  );

  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  if (!hackathon) {
    return <div>Not Found</div>;
  }

  // 🔥 推薦ロジック
  const levelMap: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const relatedHackathons = mockHackathons
  .filter((h) => h.id !== hackathon.id)
  .map((h) => {
    let score = 0;

    // ① 今見ているハッカソンとのタグ一致
    const commonTags = h.tags.filter((tag) =>
      hackathon.tags.includes(tag)
    );
    score += commonTags.length * 2;

    if (userProfile) {
      // ② 興味分野一致
      const interestMatch = h.tags.filter((tag) =>
        userProfile.interests?.includes(tag)
      );
      score += interestMatch.length * 3;

      // ③ レベル距離評価
      if (
        userProfile.experienceLevel &&
        h.level &&
        levelMap[userProfile.experienceLevel] &&
        levelMap[h.level]
      ) {
        const diff =
          Math.abs(
            levelMap[userProfile.experienceLevel] -
              levelMap[h.level]
          );

        if (diff === 0) score += 3;      // 完全一致
        else if (diff === 1) score += 1; // 近い
      }

      // ④ 参加形式 部分一致
      if (
        userProfile.participationStyle &&
        h.participationStyle
      ) {
        const userParts =
          userProfile.participationStyle.split(" - ");
        const hackParts =
          h.participationStyle.split(" - ");

        const matches = userParts.filter((part: string) =>
          hackParts.includes(part)
        ).length;

        score += matches * 1.5;
      }
    }

    return { ...h, score };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);


  return (
    <main style={{ padding: "2rem" }}>
      <h1>{hackathon.name}</h1>
      <p>{hackathon.description}</p>
      <p><strong>Location:</strong> {hackathon.location}</p>
      <p><strong>Date:</strong> {hackathon.date}</p>

      <div>
        {hackathon.tags.map((tag) => (
          <span key={tag} style={{ marginRight: "0.5rem" }}>
            #{tag}
          </span>
        ))}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Recommended Hackathons</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {relatedHackathons.map((h) => (
          <Link
            key={h.id}
            href={`/hackathons/${h.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <h3>{h.name}</h3>
              <p>{h.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
