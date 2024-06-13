import type { Metadata } from "next";
import { Exo } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import { cn } from "@/libs/utils";
import "./globals.css";

const exo = Exo({ subsets: ["vietnamese"], variable: "--font-sans" });

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
      <body
        className={cn(
          "bg-background font-sans antialiased min-h-screen",
          exo.variable,
        )}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
