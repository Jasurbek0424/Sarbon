import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";
import { CargoView } from "@/features/cargo/components/cargo-view";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "page" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function DispatcherCargoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <CargoView />
      <Footer />
    </>
  );
}
