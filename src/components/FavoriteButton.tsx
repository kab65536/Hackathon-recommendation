"use client";

import { useEffect, useState } from "react";

type Props = {
  hackathonId: string;
};

export default function FavoriteButton({ hackathonId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) return;

    const favorites = JSON.parse(saved);

    if (favorites.includes(hackathonId)) {
      setIsFavorite(true);
    }
  }, [hackathonId]);

  function toggleFavorite() {
    const saved = localStorage.getItem("favorites");
    let favorites: string[] = saved ? JSON.parse(saved) : [];

    if (favorites.includes(hackathonId)) {
      favorites = favorites.filter((id) => id !== hackathonId);
      setIsFavorite(false);
    } else {
      favorites.push(hackathonId);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <button
      onClick={toggleFavorite}
      style={{
        marginTop: "1rem",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: isFavorite ? "#ff4d6d" : "#ddd",
      }}
    >
      {isFavorite ? "❤️ お気に入り済み" : "🤍 お気に入り"}
    </button>
  );
}
