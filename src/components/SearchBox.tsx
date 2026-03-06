"use client";

import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  const [text, setText] = useState("");

  return (
    <input
      type="text"
      placeholder="ハッカソン検索 (AI / Web など)"
      value={text}
      onChange={(e) => {
        const v = e.target.value;
        setText(v);
        onSearch(v);
      }}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    />
  );
}
