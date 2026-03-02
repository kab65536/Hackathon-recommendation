"use client";

import Link from "next/link";
import { Box, Heading, Stack, Link as ChakraLink } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box p={8}>
      <Heading size="lg">
        Hackathon Recommendation App
      </Heading>

      <Stack mt={6} gap={4}>
        <ChakraLink as={Link} href="/hackathons">
          Go to Hackathon List
        </ChakraLink>

        <ChakraLink as={Link} href="/profile">
          Edit Profile
        </ChakraLink>
      </Stack>
    </Box>
  );
}
