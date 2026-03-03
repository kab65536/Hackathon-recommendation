"use client";

import Link from "next/link";
import { Hackathon } from "@/types/hackathon";

type Props = {
  hackathon: Hackathon;
  score?: number;
  reasons?: string[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function HackathonCard({
  hackathon,
  score,
  reasons,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div
      style={{
        border: isFavorite ? "2px solid red" : "1px solid #ccc",
        backgroundColor: isFavorite ? "#fff5f5" : "white",
        padding: "1rem",
        borderRadius: "8px",
        transition: "0.2s ease",
      }}
    >
      {/* カード全体をリンク化 */}
      <Link
        href={`/hackathons/${hackathon.id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <h2>{hackathon.name}</h2>
        <p>{hackathon.description}</p>

        {score !== undefined && (
          <p>
            <strong>Score:</strong> {score}
          </p>
        )}

        {reasons && reasons.length > 0 && (
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Reasons:</strong>
            <ul>
              {reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>Location:</strong> {hackathon.location}
        </p>

        <p>
          <strong>Date:</strong> {hackathon.date}
        </p>

        <div style={{ marginBottom: "0.5rem" }}>
          {hackathon.tags.map((tag) => (
            <span key={tag} style={{ marginRight: "0.5rem" }}>
              #{tag}
            </span>
          ))}
        </div>
      </Link>

      {/* お気に入りボタンは遷移させない */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(hackathon.id);
        }}
        style={{
          color: isFavorite ? "red" : "gray",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}
