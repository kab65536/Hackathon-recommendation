"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>イベント管理</h1>

      <button onClick={() => router.push("/admin/events/new")}>
        新規登録
      </button>
    </div>
  );
}
