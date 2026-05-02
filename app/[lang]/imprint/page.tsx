import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function ImprintPage({
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
          {dict.footer.imprint}
        </h1>
        <div className="mt-8 space-y-3 text-sm leading-relaxed text-ink-700">
          <p className="font-semibold text-ink-900">ENOX Energy Consulting</p>
          <p>{dict.common.owner}</p>
          <p className="rounded-2xl bg-brand-50 p-4 text-ink-700">
            {dict.contact.info.soon}
          </p>
        </div>
      </div>
    </section>
  );
}
