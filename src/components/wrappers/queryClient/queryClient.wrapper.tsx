"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache(),
  queryCache: new QueryCache(),
});

export const QueryClientProvider: FC<Props> = ({ children }) => (
  <QueryProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryProvider>
);
