"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
      <p>{t("home")}</p>
      <Button>Click me</Button>
    </>
  );
}
