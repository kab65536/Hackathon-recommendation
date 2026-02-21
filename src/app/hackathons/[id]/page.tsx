import { mockHackathons } from "@/data/mockHackathons";

interface Props {
  params: { id: string };
}

export default function HackathonDetailPage({ params }: Props) {
  const hackathon = mockHackathons.find(
    (h) => h.id === params.id
  );

  if (!hackathon) {
    return <div>Not Found</div>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{hackathon.name}</h1>
      <p>{hackathon.description}</p>
      <p><strong>Location:</strong> {hackathon.location}</p>
      <p><strong>Date:</strong> {hackathon.date}</p>
      <div>
        {hackathon.tags.map((tag) => (
          <span key={tag} style={{ marginRight: "0.5rem" }}>
            #{tag}
          </span>
        ))}
      </div>
    </main>
  );
}
