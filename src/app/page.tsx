"use client";

import { useState, useEffect } from "react";
import HackathonCard from "@/components/HackathonCard";
import { Hackathon } from "@/types/hackathon";
import { UserProfile } from "@/types/UserProfile";
import { calculateScore } from "@/app/lib/recommend";

// ダミーデータ
const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "AI Hack Tokyo",
    description: "AI focused hackathon",
    location: "Tokyo",
    date: "2025-06-01",
    tags: ["AI", "ML", "Startup"],
    level: "Beginner",
    participationType: "Team",
    mode: "Offline",
  },
  {
    id: "2",
    name: "Web3 Osaka",
    description: "Blockchain & Web3 event",
    location: "Osaka",
    date: "2025-07-15",
    tags: ["Web3", "Blockchain"],
    level: "Intermediate",
    participationType: "Solo",
    mode: "Online",
  },
];

// 仮ユーザー
const user: UserProfile = {
  interests: ["AI", "Startup"],
  languages: ["TypeScript"],
  experienceLevel: "Beginner",
  participationType: "Team",
  mode: "Online",
  location: "Tokyo",
};

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ← ここが重要

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const scored = hackathons
    .map((h) => ({
      hackathon: h,
      ...calculateScore(h, user),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Recommended Hackathons</h1>

      {scored.map(({ hackathon, score, reasons }) => (
        <HackathonCard
          key={hackathon.id}
          hackathon={hackathon}
          score={score}
          reasons={reasons}
          isFavorite={favorites.includes(hackathon.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}