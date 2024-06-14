'use client';

import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';

import QueryClient from '@/libs/query-client';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={QueryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
