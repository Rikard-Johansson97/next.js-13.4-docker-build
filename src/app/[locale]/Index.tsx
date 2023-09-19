"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import PageLayout from "../../components/PageLayout";

type Props = {
  session: Session | null;
};

export default function Index({ session }: Props) {
  const t = useTranslations("Index");
  const locale = useLocale();
  const { update, data } = useSession();

  const handleUpdate = () => {
    update();
  };

  function onLogoutClick() {
    signOut();
  }

  return (
    <PageLayout title={t("title")}>
      {session ? (
        <>
          <p>{t("loggedIn", { username: data?.user.name })}</p>
          <p>
            <Link href={locale + "/secret"}>{t("secret")}</Link>
          </p>
          <button onClick={handleUpdate}>Update user</button>
          <button onClick={onLogoutClick} type='button'>
            {t("logout")}
          </button>
        </>
      ) : (
        <>
          <p>{t("loggedOut")}</p>
          <Link href={locale + "/login"}>{t("login")}</Link>
        </>
      )}
    </PageLayout>
  );
}
