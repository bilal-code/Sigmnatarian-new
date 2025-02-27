"use client";

import { ActiveChain, clientId } from "../component/Constants";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function ThirdWebProvider({ children }) {
  return (
    <ThirdwebProvider activeChain={ActiveChain} clientId={clientId}>
      {children}
    </ThirdwebProvider>
  );
}
