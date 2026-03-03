"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, HStack, Badge, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type UserProfile = {
  interests: string[];
  languages: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  participationType: "Team" | "Solo";
  mode: "Online" | "Offline";
  location: string;
};

type Hackathon = {
  id: number;
  title: string;
  interests: string[];
  mode: "Online" | "Offline";
  level: "Beginner" | "Intermediate" | "Advanced";
};

const mockEvents: Hackathon[] = [
  {
    id: 1,
    title: "AI Innovation Hack",
    interests: ["AI"],
    mode: "Online",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Web Creator Camp",
    interests: ["Web"],
    mode: "Offline",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Game Dev Challenge",
    interests: ["Game"],
    mode: "Online",
    level: "Advanced",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  if (!profile) {
    return (
      <Box p={10}>
        <Text>プロフィールが見つかりません。</Text>
        <Button mt={4} onClick={() => router.push("/profile")}>
          プロフィールを作成する
        </Button>
      </Box>
    );
  }

  const scoredEvents = mockEvents.map((event) => {
    let score = 0;

    if (event.mode === profile.mode) score += 30;
    if (event.level === profile.experienceLevel) score += 30;

    const interestMatch = event.interests.filter((i) =>
      profile.interests.includes(i)
    ).length;

    score += interestMatch * 20;

    return { ...event, score };
  }).sort((a, b) => b.score - a.score);

  return (
    <Box p={10} maxW="900px" mx="auto">
      <Heading mb={6}>おすすめハッカソン</Heading>

      <VStack gap={6} align="stretch">
        {scoredEvents.map((event) => (
          <Box
            key={event.id}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
          >
            <HStack justify="space-between">
              <Heading size="md">{event.title}</Heading>
              <Badge colorScheme="blue">{event.score} 点</Badge>
            </HStack>

            <Text mt={2}>
              開催形式: {event.mode === "Online" ? "オンライン" : "オフライン"}
            </Text>
            <Text>
              推奨レベル:{" "}
              {event.level === "Beginner"
                ? "初心者"
                : event.level === "Intermediate"
                ? "中級者"
                : "上級者"}
            </Text>
          </Box>
        ))}
      </VStack>

      <Button mt={10} onClick={() => router.push("/profile")}>
        プロフィールを編集
      </Button>
    </Box>
  );
}
