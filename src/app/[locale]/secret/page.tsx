"use client";

import { useTranslations } from "next-intl";
import PageLayout from "../../../components/PageLayout";
import { useSession } from "next-auth/react";

export default function Secret() {
  const t = useTranslations("Secret");
  const { update } = useSession();

  return (
    <PageLayout title={t("title")}>
      <p>{t("description")}</p>
    </PageLayout>
  );
}
