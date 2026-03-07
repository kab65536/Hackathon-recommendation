"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hackathons } from "@/app/lib/data";
import { notFound, useParams } from "next/navigation";
import { calculateScore } from "@/app/lib/recommend";
import { UserProfile } from "@/types/UserProfile";
import StarRating from "@/components/StarRating";
import FavoriteButton from "@/components/FavoriteButton";

function levelJa(level: string) {
  if (level === "Beginner") return "初心者";
  if (level === "Intermediate") return "中級者";
  if (level === "Advanced") return "上級者";
  return level;
}

function modeJa(mode: string) {
  if (mode === "Online") return "オンライン";
  if (mode === "Offline") return "オフライン";
  if (mode === "Hybrid") return "ハイブリッド";
  return mode;
}

function participationJa(type: string) {
  if (type === "Solo") return "個人参加";
  if (type === "Team") return "チーム参加";
  return type;
}

export default function HackathonDetailPage() {

  const params = useParams();
  const id = params.id as string;

  const hackathon = hackathons.find((h) => h.id === id);

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!hackathon) {
    notFound();
  }

  if (!user) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  const result = calculateScore(hackathon, user);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>

      {/* 戻る */}
      <Link href="/dashboard">← ダッシュボードに戻る</Link>

      <h1 style={{ marginTop: "1rem" }}>{hackathon.name}</h1>

      <p style={{ marginTop: "1rem" }}>
        {hackathon.description}
      </p>

      {/* ⭐ スター */}
      <div style={{ marginTop: "1rem" }}>
        <StarRating score={result.score} />
      </div>

      {/* ❤️ お気に入り */}
      <div style={{ marginTop: "1rem" }}>
        <FavoriteButton hackathonId={hackathon.id} />
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <section>
        <p><strong>開催場所：</strong>{hackathon.location}</p>
        <p><strong>開催日：</strong>{hackathon.date}</p>
        <p><strong>難易度：</strong>{levelJa(hackathon.level)}</p>
        <p><strong>参加形式：</strong>{participationJa(hackathon.participationType)}</p>
        <p><strong>開催形式：</strong>{modeJa(hackathon.mode)}</p>
      </section>

      <div style={{ marginTop: "1rem" }}>
        {hackathon.tags.map((tag) => (
          <span
            key={tag}
            style={{
              marginRight: "0.5rem",
              padding: "0.3rem 0.6rem",
              background: "#eee",
              borderRadius: "6px",
              fontSize: "0.8rem",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <section>

        <h2>おすすめスコア</h2>

        <p>{result.score} 点</p>

        <div
          style={{
            background: "#ddd",
            width: "100%",
            height: "20px",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              background: "green",
              width: `${Math.min(result.score, 100)}%`,
              height: "100%",
            }}
          />
        </div>

        {result.reasons.length > 0 && (
          <>
            <h3 style={{ marginTop: "1.5rem" }}>
              おすすめ理由
            </h3>

            <ul>
              {result.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </>
        )}

      </section>

    </main>
  );
}
