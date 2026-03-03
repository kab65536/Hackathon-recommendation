"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Hackathon Finder
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "600px",
          marginBottom: "2rem",
          opacity: 0.8,
        }}
      >
        あなたの興味・スキル・参加スタイルに合わせて
        最適なハッカソンを推薦します。
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => router.push("/profile")}
          style={buttonPrimary}
        >
          はじめる
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          style={buttonSecondary}
        >
          おすすめを見る
        </button>
      </div>

      <section
        style={{
          marginTop: "4rem",
          display: "grid",
          gap: "1.5rem",
          maxWidth: "800px",
        }}
      >
        <Feature
          title="🎯 パーソナライズ推薦"
          text="あなたのプロフィールとイベント情報を比較して適合度を算出します。"
        />
        <Feature
          title="⭐ わかりやすい可視化"
          text="おすすめ度を星やスコアで表示。初心者でも直感的に選べます。"
        />
        <Feature
          title="🔍 詳細検索"
          text="分野・難易度・日付で絞り込み可能。推薦以外のイベントも確認できます。"
        />
      </section>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "1.5rem",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ opacity: 0.8 }}>{text}</p>
    </div>
  );
}

const buttonPrimary: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#3b82f6",
  color: "white",
  cursor: "pointer",
};

const buttonSecondary: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid white",
  backgroundColor: "transparent",
  color: "white",
  cursor: "pointer",
};
