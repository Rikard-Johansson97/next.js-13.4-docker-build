import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Provider from "@/providers/providers";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>next-intl & next-auth</title>
      </head>
      <body>
        <Provider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
