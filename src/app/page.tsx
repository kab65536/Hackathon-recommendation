"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hackathon Recommendation App</h1>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/hackathons">
          Go to Hackathon List
        </Link>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/profile">
          Edit Profile
        </Link>
      </div>
    </main>
  );
}
