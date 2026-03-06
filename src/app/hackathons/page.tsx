"use client";

import { useState } from "react";
import Link from "next/link";
import { hackathons } from "@/app/lib/data";

export default function HackathonsPage() {
  const [query, setQuery] = useState("");

  const filtered = hackathons.filter((h) => {
    const q = query.toLowerCase();

    return (
      h.name.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.tags.join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>ハッカソン一覧</h1>

      <input
        placeholder="Search hackathons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "grid", gap: "1rem" }}>
        {filtered.map((h) => (
          <div
            key={h.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h2>{h.name}</h2>

            <p>{h.description}</p>

            <div style={{ marginTop: "0.5rem" }}>
              {h.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    marginRight: "6px",
                    fontSize: "0.8rem",
                    background: "#eee",
                    padding: "3px 6px",
                    borderRadius: "5px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link href={`/hackathons/${h.id}`}>
              <button
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                詳細を見る
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
