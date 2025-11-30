import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "./query-client";

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * Query Provider Component
 * Wraps the app with React Query's QueryClientProvider
 * @example
 * ```tsx
 * export default function RootLayout() {
 *   return (
 *     <QueryProvider>
 *       <App />
 *     </QueryProvider>
 *   );
 * }
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
