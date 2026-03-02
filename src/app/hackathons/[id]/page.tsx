import { hackathons } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { calculateScore } from "@/app/lib/recommend";
import { UserProfile } from "@/types/UserProfile";

type Props = {
  params: {
    id: string;
  };
};

export default function HackathonDetail({ params }: Props) {
  const hackathon = hackathons.find((h) => h.id === params.id);

  if (!hackathon) {
    notFound();
  }

  // 仮ユーザー（本来はDBやlocalStorageなどから取得）
  const user: UserProfile = {
    interests: ["AI", "Web"],
    languages: ["TypeScript", "Python"],
    experienceLevel: "Intermediate",
    participationType: "Team",
    mode: "Offline",
    location: "Tokyo",
  };

  // 🔥 引数順に注意
  const result = calculateScore(hackathon, user);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{hackathon.name}</h1>

      <p style={{ marginTop: "1rem" }}>
        {hackathon.description}
      </p>

      <hr style={{ margin: "2rem 0" }} />

      <section>
        <p><strong>Location:</strong> {hackathon.location}</p>
        <p><strong>Date:</strong> {hackathon.date}</p>
        <p><strong>Level:</strong> {hackathon.level}</p>
        <p><strong>Participation:</strong> {hackathon.participationType}</p>
        <p><strong>Mode:</strong> {hackathon.mode}</p>
      </section>

      <div style={{ marginTop: "1rem" }}>
        {hackathon.tags.map((tag) => (
          <span
            key={tag}
            style={{
              marginRight: "0.5rem",
              padding: "0.3rem 0.6rem",
              background: "#eee",
              borderRadius: "6px",
              fontSize: "0.8rem",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <section>
        <h2>Recommendation Score</h2>

        <p>{result.score} 点</p>

        <div
          style={{
            background: "#ddd",
            width: "100%",
            height: "20px",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              background: "green",
              width: `${Math.min(result.score, 100)}%`,
              height: "100%",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {result.reasons.length > 0 && (
          <>
            <h3 style={{ marginTop: "1.5rem" }}>
              Why Recommended
            </h3>
            <ul>
              {result.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
