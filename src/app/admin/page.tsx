"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/admin/events");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>管理者ログイン</h1>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}

