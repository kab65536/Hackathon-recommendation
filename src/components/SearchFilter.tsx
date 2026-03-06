"use client";

import { useState } from "react";

type Props = {
  onFilterChange: (filter: {
    keyword: string;
    tag: string;
    level: string;
  }) => void;
};

export default function SearchFilter({ onFilterChange }: Props) {
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState("");
  const [level, setLevel] = useState("");

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        marginBottom: "1rem",
        borderRadius: "8px",
      }}
    >
      <input
        placeholder="キーワード検索"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          onFilterChange({ keyword: e.target.value, tag, level });
        }}
      />

      <select
        value={tag}
        onChange={(e) => {
          setTag(e.target.value);
          onFilterChange({ keyword, tag: e.target.value, level });
        }}
      >
        <option value="">すべての分野</option>
        <option value="AI">AI</option>
        <option value="Web">Web</option>
        <option value="Game">Game</option>
        <option value="IoT">IoT</option>
      </select>

      <select
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
          onFilterChange({ keyword, tag, level: e.target.value });
        }}
      >
        <option value="">すべての難易度</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}
