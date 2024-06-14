import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Exo } from 'next/font/google';
import { ReactNode } from 'react';

import { cn } from '@/libs/utils';
import QueryProvider from '@/providers/query-provider';

import SessionProvider from '@/providers/session-provider';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/options';
import '../globals.css';

const exo = Exo({ subsets: ['vietnamese'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NextJS v15 Starter',
  description: 'Author by Ginn',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang={params.locale}>
      <body
        className={cn(
          'bg-background font-sans antialiased min-h-screen container h-1',
          exo.variable
        )}
      >
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>{children}</QueryProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
