export type Level = "Beginner" | "Intermediate" | "Advanced";
export type ParticipationType = "Team" | "Solo";
export type Mode = "Online" | "Offline";

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  level: Level;
  participationType: ParticipationType;
  mode: Mode;
}
