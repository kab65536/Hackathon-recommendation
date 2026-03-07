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
import FavoriteButton from "@/components/FavoriteButton";

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

  /* 🔍 検索 */

  const filtered = hackathons.filter((h) => {

    const text = search.toLowerCase();

    return (
      h.name.toLowerCase().includes(text) ||
      h.tags.some((t) => t.toLowerCase().includes(text))
    );

  });

  /* ⭐ 推薦アルゴリズム */

  const recommendations = filtered
    .map((event) => {

      const result = calculateScore(event, profile);

      return {
        event,
        score: result.score,
        reasons: result.reasons
      };

    })
    .sort((a, b) => b.score - a.score);

  return (

    <Box p={10} maxW="900px" mx="auto">

      {/* ナビゲーションボタン */}

      <HStack mb={6} gap={4}>

        <Button
          variant="outline"
          onClick={() => router.push("/profile")}
        >
          ← フォームに戻る
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push("/")}
        >
          🏠 最初の画面に戻る
        </Button>

      </HStack>

      <Heading mb={6}>おすすめハッカソン</Heading>

      {/* 🔍 検索 */}

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

        {recommendations.map(({ event, score, reasons }, index) => (

          <Box
            key={event.id}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            bg={index < 3 ? "yellow.50" : "white"}
          >

            <HStack justify="space-between">

              <HStack>

                <Text fontWeight="bold" fontSize="lg">

                  {index === 0 && "🥇 1位"}
                  {index === 1 && "🥈 2位"}
                  {index === 2 && "🥉 3位"}
                  {index > 2 && `${index + 1}位`}

                </Text>

                <Heading size="md">
                  {event.name}
                </Heading>

              </HStack>

              <Text fontWeight="bold">
                {score}点
              </Text>

            </HStack>

            <Text mt={1} fontSize="lg">
              {getStars(score)}
            </Text>

            <Text mt={2}>
              開催形式: {event.mode}
            </Text>

            <Text>
              レベル: {event.level}
            </Text>

            {reasons.length > 0 && (

              <Box mt={3}>

                <Text fontWeight="bold">
                  おすすめ理由
                </Text>

                <VStack align="start" gap={1}>

                  {reasons.map((r, i) => (

                    <Text key={i} fontSize="sm">
                      ・{r}
                    </Text>

                  ))}

                </VStack>

              </Box>

            )}

            {/* ボタン */}

            <HStack mt={4} gap={3}>

              <Button
                colorScheme="blue"
                onClick={() => router.push(`/hackathons/${event.id}`)}
              >
                詳細を見る
              </Button>

              <FavoriteButton hackathonId={event.id} />

            </HStack>

          </Box>

        ))}

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
