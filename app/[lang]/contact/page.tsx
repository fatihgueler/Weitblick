import { locales, localeNames, assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ContactIllustration } from "@/components/illustrations/ContactIllustration";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="gradient-hero">
        <div className="container grid gap-10 py-20 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">{dict.nav.contact}</span>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-700">
              {dict.contact.subtitle}
            </p>
          </div>
          <ContactIllustration className="w-full max-w-md justify-self-center lg:justify-self-end" />
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <form className="rounded-3xl border border-brand-900/5 bg-white p-8 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={dict.contact.form.name} name="name" required />
              <Field
                label={dict.contact.form.email}
                name="email"
                type="email"
                required
              />
              <Field label={dict.contact.form.phone} name="phone" />
              <div>
                <label className="label" htmlFor="language">
                  {dict.contact.form.language}
                </label>
                <select
                  id="language"
                  name="language"
                  defaultValue={lang}
                  className="input mt-2"
                >
                  {locales.map((l) => (
                    <option key={l} value={l}>
                      {localeNames[l]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Field label={dict.contact.form.subject} name="subject" />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="message">
                  {dict.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="input mt-2"
                />
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-ink-700">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-brand-900/20 text-brand-700 focus:ring-brand-500"
              />
              <span>{dict.contact.form.consent}</span>
            </label>

            <button type="submit" className="btn-primary mt-6">
              {dict.contact.form.submit}
            </button>
          </form>

          <aside className="rounded-3xl bg-ink-900 p-8 text-brand-50 shadow-xl">
            <h2 className="text-xl font-semibold text-white">
              {dict.contact.info.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-100/80">
              {dict.contact.info.soon}
            </p>

            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                  {dict.contact.info.hours}
                </dt>
                <dd className="mt-1 text-brand-50">
                  {dict.contact.info.hoursValue}
                </dd>
              </div>
            </dl>

            <div className="mt-8 rounded-2xl bg-white/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                {dict.about.founder.title}
              </div>
              <div className="mt-1 text-base font-semibold text-white">
                {dict.about.founder.name}
              </div>
              <div className="text-xs text-brand-100/80">
                {dict.about.founder.role}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="input mt-2"
      />
    </div>
  );
}
