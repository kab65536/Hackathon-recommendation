"use client";

import { useState, useEffect } from "react";
import { mockHackathons } from "@/data/mockHackathons";
import HackathonCard from "@/components/HackathonCard";

export default function HackathonsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("date");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const allTags = Array.from(
    new Set(mockHackathons.flatMap((h) => h.tags))
  );

  // ① フィルタ
  const filteredHackathons = mockHackathons.filter((h) => {
    const matchesTag = selectedTag
      ? h.tags.includes(selectedTag)
      : true;

    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFavorite = showOnlyFavorites
      ? favorites.includes(h.id)
      : true;

    return matchesTag && matchesSearch && matchesFavorite;
  });

  // ② ソート（filterの外に書く）
  const sortedHackathons = [...filteredHackathons].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === "favorites") {
      return (
        Number(favorites.includes(b.id)) -
        Number(favorites.includes(a.id))
      );
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hackathon List</h1>

      {/* 検索 */}
      <input
        type="text"
        placeholder="Search hackathons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "300px",
          display: "block",
        }}
      />

      {/* お気に入り表示切替 */}
      <button
        onClick={() => setShowOnlyFavorites((prev) => !prev)}
        style={{
          marginBottom: "1rem",
          padding: "0.4rem 0.8rem",
          backgroundColor: showOnlyFavorites ? "#333" : "#eee",
          color: showOnlyFavorites ? "#fff" : "#000",
          border: "none",
          cursor: "pointer",
        }}
      >
        {showOnlyFavorites ? "Show All" : "Show Favorites"}
      </button>

      {/* ソート */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "0.4rem",
          display: "block",
        }}
      >
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
        <option value="favorites">Favorites First</option>
      </select>

      <p>{sortedHackathons.length} 件表示中</p>

      {/* タグ */}
      <div style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={() => setSelectedTag(null)}
          style={{
            marginRight: "0.5rem",
            backgroundColor: selectedTag === null ? "#333" : "#eee",
            color: selectedTag === null ? "#fff" : "#000",
            padding: "0.4rem 0.8rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{
              marginRight: "0.5rem",
              backgroundColor: selectedTag === tag ? "#333" : "#eee",
              color: selectedTag === tag ? "#fff" : "#000",
              padding: "0.4rem 0.8rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 一覧 */}
      <div
      style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "1.5rem",
      marginTop: "1rem",
      }}
      >
      {sortedHackathons.map((hackathon) => (
      <HackathonCard
      key={hackathon.id}
      hackathon={hackathon}
      isFavorite={favorites.includes(hackathon.id)}
      onToggleFavorite={toggleFavorite}
      />
      ))}
      </div>

    </main>
  );
}
