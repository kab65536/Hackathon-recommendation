"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { hackathons } from "@/app/lib/data";
import { calculateScore } from "@/app/lib/recommend";

type UserProfile = {
  interests: string[];
  languages: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  participationType: "Team" | "Solo";
  mode: "Online" | "Offline";
  location: string;
};

function getStars(score: number) {
  const stars = Math.round(score / 20);
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

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
          プロフィール作成
        </Button>
      </Box>
    );
  }

  const filtered = hackathons.filter((h) => {
    const text = search.toLowerCase();

    return (
      h.name.toLowerCase().includes(text) ||
      h.tags.some((t) => t.toLowerCase().includes(text))
    );
  });

  return (
    <Box p={10} maxW="900px" mx="auto">

      <Heading mb={6}>おすすめハッカソン</Heading>

      {/* 検索バー */}
      <HStack mb={6}>
        <Input
          placeholder="AI / Web / Blockchain など"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Button
          colorScheme="blue"
          onClick={() => setSearch(searchInput)}
        >
          検索
        </Button>
      </HStack>

      <VStack gap={6} align="stretch">

        {filtered.map((event) => {

          const result = calculateScore(event, profile);

          return (
            <Box
              key={event.id}
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
            >
              <HStack justify="space-between">

                <Heading size="md">
                  {event.name}
                </Heading>

                {/* スコア */}
                <Text fontWeight="bold">
                  {result.score}点
                </Text>

              </HStack>

              {/* 星表示 */}
              <Text mt={1} fontSize="lg">
                {getStars(result.score)}
              </Text>

              <Text mt={2}>開催形式: {event.mode}</Text>
              <Text>レベル: {event.level}</Text>

              <Button
                mt={3}
                colorScheme="blue"
                onClick={() => router.push(`/hackathons/${event.id}`)}
              >
                詳細を見る
              </Button>

            </Box>
          );
        })}

      </VStack>

      <Button
        mt={10}
        colorScheme="pink"
        onClick={() => router.push("/favorites")}
      >
        ❤️ お気に入り一覧
      </Button>

    </Box>
  );
}
