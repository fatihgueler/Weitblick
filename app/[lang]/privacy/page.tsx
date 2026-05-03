import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <h1 className="heading-2">{dict.footer.privacy}</h1>
        <p className="mt-6 text-sm leading-relaxed text-ink-700 sm:text-base">
          {dict.contact.form.consent}
        </p>
      </div>
    </section>
  );
}
