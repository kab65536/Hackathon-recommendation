import Link from "next/link";
import { Hackathon } from "@/types/Hackathon";

type Props = {
  hackathon: Hackathon;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function HackathonCard({
  hackathon,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div
    style={{
    border: isFavorite ? "2px solid red" : "1px solid #ccc",
    backgroundColor: isFavorite ? "#fff5f5" : "white",
    padding: "1rem",
    borderRadius: "8px",
    }}>

      <Link
        href={`/hackathons/${hackathon.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h2>{hackathon.name}</h2>
      </Link>

      <p>{hackathon.description}</p>
      <p>
        <strong>Location:</strong> {hackathon.location}
      </p>
      <p>
        <strong>Date:</strong> {hackathon.date}
      </p>

      <div style={{ marginBottom: "0.5rem" }}>
        {hackathon.tags.map((tag) => (
          <span key={tag} style={{ marginRight: "0.5rem" }}>
            #{tag}
          </span>
        ))}
      </div>

      <button
      onClick={() => onToggleFavorite(hackathon.id)}
      style={{
      color: isFavorite ? "red" : "gray",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "1.2rem",
      }}>
      {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>

    </div>
  );
}
