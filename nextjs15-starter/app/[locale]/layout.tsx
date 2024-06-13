import type { Metadata } from "next";
import { Exo } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import { cn } from "@/libs/utils";
import "../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const exo = Exo({ subsets: ["vietnamese"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NextJS v15 Starter",
  description: "Author by Ginn",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body
        className={cn(
          "bg-background font-sans antialiased min-h-screen",
          exo.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
