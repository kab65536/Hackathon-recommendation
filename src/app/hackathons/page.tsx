"use client";

import { useState } from "react";
import { mockHackathons } from "@/data/mockHackathons";
import HackathonCard from "@/components/HackathonCard";

export default function HackathonsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 全タグを重複なしで抽出
  const allTags = Array.from(
    new Set(mockHackathons.flatMap((h) => h.tags))
  );

  // タグ + 検索 両方適用
  const filteredHackathons = mockHackathons.filter((h) => {
    const matchesTag = selectedTag
      ? h.tags.includes(selectedTag)
      : true;

    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hackathon List</h1>

      {/* 🔍 検索バー */}
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

      <p>{filteredHackathons.length} 件表示中</p>

      {/* タグ選択ボタン */}
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

      {/* 一覧表示 */}
      {filteredHackathons.map((hackathon) => (
        <HackathonCard key={hackathon.id} hackathon={hackathon} />
      ))}
    </main>
  );
}
