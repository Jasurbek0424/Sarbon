"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <NuqsAdapter>
          <MotionConfig reducedMotion="user">
            <TooltipProvider delayDuration={200}>
              {children}
              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </MotionConfig>
        </NuqsAdapter>
      </QueryProvider>
    </ThemeProvider>
  );
}
