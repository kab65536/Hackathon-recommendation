"use client";

type Props = {
  score: number;
};

export default function StarRating({ score }: Props) {
  const stars = Math.round(score / 20); // 100点 → ★5

  return (
    <div style={{ fontSize: "1.2rem", color: "#f5b301" }}>
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < stars ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
