"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactNode } from "react";

const cache = createCache({
  key: "chakra",
  prepend: true,
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={defaultSystem}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
