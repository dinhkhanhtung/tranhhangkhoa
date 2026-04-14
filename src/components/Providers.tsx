"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { WebsiteProvider } from "@/context/WebsiteContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WebsiteProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WebsiteProvider>
    </SessionProvider>
  );
}
