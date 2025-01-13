"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

export function Provider(props) {
  return (
    <ColorModeProvider forcedTheme="dark">
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </ColorModeProvider>
  );
}
