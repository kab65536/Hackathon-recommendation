"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      bg="gray.950"
      color="white"
      textAlign="center"
      px="6"
    >
      {/* 背景エフェクト */}
      <Box
        position="absolute"
        inset="0"
        bgGradient={`
          radial(circle at 20% 20%, rgba(59,130,246,0.4), transparent 40%),
          radial(circle at 80% 80%, rgba(168,85,247,0.4), transparent 40%)
        `}
        zIndex="0"
      />

      {/* メインコンテンツ */}
      <VStack gap="8" maxW="1100px" zIndex="1">
        <Heading size="2xl">Hackathon Finder</Heading>

        <Text fontSize="lg" maxW="600px" opacity={0.85}>
          あなたの興味・スキル・参加スタイルに合わせて
          最適なハッカソンを推薦します。
        </Text>

        <HStack gap="4">
          <Button
            size="lg"
            colorPalette="blue"
            onClick={() => router.push("/profile")}
          >
            はじめる
          </Button>

          <Button
            size="lg"
            variant="outline"
            colorPalette="blue"
            onClick={() => router.push("/dashboard")}
          >
            おすすめを見る
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" mt="12">
          <Feature
            title="🎯 パーソナライズ推薦"
            text="あなたのプロフィールとイベント情報を比較して適合度を算出します。"
          />
          <Feature
            title="⭐ わかりやすい可視化"
            text="おすすめ度を星やスコアで表示。初心者でも直感的に選べます。"
          />
          <Feature
            title="🔍 詳細検索"
            text="分野・難易度・日付で絞り込み可能。推薦以外のイベントも確認できます。"
          />
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <Box
      bg="whiteAlpha.200"
      p="6"
      borderRadius="2xl"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="whiteAlpha.300"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-6px)",
        bg: "whiteAlpha.300",
      }}
    >
      <Heading size="md" mb="3">
        {title}
      </Heading>
      <Text opacity={0.85}>{text}</Text>
    </Box>
  );
}
