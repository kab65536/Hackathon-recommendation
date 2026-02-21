import Link from "next/link";
import { Hackathon } from "@/types/Hackathon";

interface Props {
  hackathon: Hackathon;
}

export default function HackathonCard({ hackathon }: Props) {
  return (
    <Link href={`/hackathons/${hackathon.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>{hackathon.name}</h2>
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
        </div>
    </Link>
  );
}
