import { Hackathon } from "@/types/hackathon";

export const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "AI Innovation Hackathon",
    description: "AIを使った新しいサービスを開発するハッカソン",
    location: "Tokyo",
    date: "2026-05-10",
    tags: ["AI", "MachineLearning"],
    level: "Intermediate",
    participationType: "Team",
    mode: "Offline",
  },
  {
    id: "2",
    name: "Web3 Global Hackathon",
    description: "ブロックチェーンとWeb3アプリ開発",
    location: "Online",
    date: "2026-06-20",
    tags: ["Web", "Blockchain"],
    level: "Advanced",
    participationType: "Team",
    mode: "Online",
  },
  {
    id: "3",
    name: "Game Dev Challenge",
    description: "ゲーム開発者向けハッカソン",
    location: "Osaka",
    date: "2026-04-15",
    tags: ["Game"],
    level: "Beginner",
    participationType: "Solo",
    mode: "Offline",
  },
];
