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
      bg="gray.50"
      px="6"
    >
      <VStack gap="10" maxW="1100px" textAlign="center">

        {/* タイトル */}

        <VStack gap="4">

          <Heading size="2xl">
            Hackathon Finder
          </Heading>

          <Text fontSize="lg" color="gray.600" maxW="600px">
            あなたの興味・スキル・参加スタイルに合わせて
            最適なハッカソンを推薦します。
          </Text>

        </VStack>

        {/* ボタン */}

        <HStack gap="4">

          <Button
            size="lg"
            colorScheme="blue"
            onClick={() => router.push("/profile")}
          >
            はじめる
          </Button>

          <Button
            size="lg"
            variant="outline"
            colorScheme="blue"
            onClick={() => router.push("/dashboard")}
          >
            おすすめを見る
          </Button>

        </HStack>

        {/* 機能紹介 */}

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap="6"
          mt="10"
        >

          <Feature
            title="🎯 パーソナライズ推薦"
            text="プロフィールとイベント情報を比較し、あなたに合うハッカソンをランキング表示します。"
          />

          <Feature
            title="⭐ わかりやすい評価"
            text="おすすめ度をスコアと星で表示。初心者でも直感的にイベントを選べます。"
          />

          <Feature
            title="🔍 イベント検索"
            text="分野やキーワードからハッカソンを検索できます。"
          />

        </SimpleGrid>

      </VStack>
    </Box>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <Box
      bg="white"
      p="6"
      borderRadius="xl"
      borderWidth="1px"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
    >
      <Heading size="md" mb="3">
        {title}
      </Heading>

      <Text color="gray.600">
        {text}
      </Text>
    </Box>
  );
}
