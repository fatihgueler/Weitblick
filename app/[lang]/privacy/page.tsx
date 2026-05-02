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
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
          {dict.footer.privacy}
        </h1>
        <p className="mt-6 text-sm text-ink-700">
          {dict.contact.form.consent}
        </p>
      </div>
    </section>
  );
}
