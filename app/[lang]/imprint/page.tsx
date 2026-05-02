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
          <p className="font-semibold text-ink-900">
            ENOX Energy Consulting
          </p>
          <p>{dict.contact.info.addressValue}</p>
          <p>
            {dict.contact.info.phone}: {dict.contact.info.phoneValue}
            <br />
            {dict.contact.info.email}: {dict.contact.info.emailValue}
          </p>
          <p>{dict.common.owner}</p>
        </div>
      </div>
    </section>
  );
}
