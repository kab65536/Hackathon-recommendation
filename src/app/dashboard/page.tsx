"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hackathon } from "@/types/hackathon";
import { calculateScore } from "@/app/lib/recommend";
import { UserProfile } from "@/types/UserProfile";

const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "AI Hack Tokyo",
    description: "AI focused hackathon",
    location: "Tokyo",
    date: "2025-06-01",
    tags: ["AI", "ML"],
    level: "Beginner",
    participationType: "Team",
    mode: "Offline",
  },
];

const user: UserProfile = {
  interests: ["AI"],
  languages: [],
  experienceLevel: "Beginner",
  participationType: "Team",
  mode: "Online",
  location: "Tokyo",
};

export default function Page() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  const scored = hackathons
    .map((h) => ({
      hackathon: h,
      ...calculateScore(h, user),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>おすすめハッカソン</h1>

      <button onClick={() => router.push("/events")}>
        もっと探す
      </button>

      {scored.map(({ hackathon, score }) => (
        <div key={hackathon.id} style={{ marginTop: "1rem" }}>
          <h3>{hackathon.name}</h3>
          <p>Score: {score}</p>
          <button
            onClick={() => router.push(`/events/${hackathon.id}`)}
          >
            詳細を見る
          </button>
        </div>
      ))}
    </div>
  );
}
