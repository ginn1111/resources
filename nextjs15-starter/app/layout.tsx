import type { Metadata } from "next";
import { Exo } from "next/font/google";
import QueryProvider from "@/providers/query-provider";

const exo = Exo({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "NextJS v15 Starter",
  description: "Author by Ginn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
