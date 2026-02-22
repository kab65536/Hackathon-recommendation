import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hackathon Recommendation App</h1>
      <Link href="/hackathons">Go to Hackathon List</Link>
    </main>
  );
}
