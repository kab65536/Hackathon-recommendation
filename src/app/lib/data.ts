import { Hackathon } from "@/types/hackathon";

export const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "AI Hack Tokyo",
    description: "AIを使ったプロダクト開発ハッカソン",
    location: "Tokyo",
    date: "2026-04-10",
    tags: ["AI", "Web"],
    level: "Intermediate",
    participationType: "Team",
    mode: "Offline",
  },
  {
    id: "2",
    name: "Web3 Global Online",
    description: "Web3特化のオンラインハッカソン",
    location: "Online",
    date: "2026-05-01",
    tags: ["Web3", "Blockchain"],
    level: "Beginner",
    participationType: "Solo",
    mode: "Online",
  },
];
