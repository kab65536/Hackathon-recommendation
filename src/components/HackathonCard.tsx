"use client";

import Link from "next/link";
import { Hackathon } from "@/types/hackathon";
import StarRating from "@/components/StarRating";

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
        marginBottom: "1rem",
      }}
    >
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

        {score !== undefined && <StarRating score={score} />}

        {reasons && reasons.length > 0 && (
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>おすすめ理由</strong>
            <ul>
              {reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
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

        <button
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          詳細を見る
        </button>
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(hackathon.id);
        }}
        style={{
          marginTop: "0.5rem",
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
