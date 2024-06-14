'use client';

import { QueryClientProvider } from 'react-query';
import QueryClient from '@/libs/query-client';
import { ReactNode } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={QueryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
