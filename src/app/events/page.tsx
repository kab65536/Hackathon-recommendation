"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const events = [
    { id: "1", name: "AI Hack Tokyo" },
    { id: "2", name: "Web3 Osaka" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>イベント一覧</h1>

      {events.map((e) => (
        <div key={e.id}>
          <span>{e.name}</span>
          <button onClick={() => router.push(`/events/${e.id}`)}>
            詳細
          </button>
        </div>
      ))}
    </div>
  );
}
