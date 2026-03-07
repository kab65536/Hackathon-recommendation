"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { hackathons } from "@/app/lib/data";

export default function FavoritesPage() {

  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {

    const stored = localStorage.getItem("favorites");

    if (stored) {
      setFavorites(JSON.parse(stored));
    }

  }, []);

  const favoriteEvents = hackathons.filter((h) =>
    favorites.includes(h.id)
  );

  return (

    <Box p={10} maxW="800px" mx="auto">

      <Heading mb={6}>❤️ お気に入り一覧</Heading>

      {favoriteEvents.length === 0 && (

        <Text mb={6}>
          お気に入りはまだありません
        </Text>

      )}

      <VStack gap={6} align="stretch">

        {favoriteEvents.map((event) => (

          <Box
            key={event.id}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
          >

            <Heading size="md">
              {event.name}
            </Heading>

            <Text mt={2}>
              {event.mode} / {event.level}
            </Text>

            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => router.push(`/hackathons/${event.id}`)}
            >
              詳細を見る
            </Button>

          </Box>

        ))}

      </VStack>

      <Button
        mt={10}
        onClick={() => router.push("/dashboard")}
      >
        ダッシュボードへ戻る
      </Button>

    </Box>

  );
}
