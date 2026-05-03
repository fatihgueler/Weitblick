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
      <section className="relative overflow-hidden border-b border-ink-200/40 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14 lg:py-20">
          <div className="animate-fade-up">
            <span className="eyebrow">{dict.nav.contact}</span>
            <h1 className="mt-4 heading-1">{dict.contact.title}</h1>
            <p className="mt-5 lead">{dict.contact.subtitle}</p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <ContactIllustration className="mx-auto w-full max-w-xs lg:max-w-sm" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <form className="surface p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={dict.contact.form.name} name="name" required autoComplete="name" />
              <Field
                label={dict.contact.form.email}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
              />
              <Field
                label={dict.contact.form.phone}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
              />
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
                className="mt-1 h-5 w-5 rounded border-brand-900/20 text-brand-700 focus:ring-brand-500"
              />
              <span>{dict.contact.form.consent}</span>
            </label>

            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              {dict.contact.form.submit}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <aside className="relative overflow-hidden rounded-4xl bg-ink-900 p-6 text-brand-50 shadow-lift sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 dark-mesh opacity-90"
            />
            <div className="relative">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {dict.contact.info.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-100/85 sm:text-base">
                {dict.contact.info.soon}
              </p>

              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                    {dict.contact.info.hours}
                  </dt>
                  <dd className="mt-1 text-base text-brand-50">
                    {dict.contact.info.hoursValue}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                  {dict.about.founder.title}
                </div>
                <div className="mt-1 text-base font-semibold text-white">
                  {dict.about.founder.name}
                </div>
                <div className="text-xs text-brand-100/80">
                  {dict.about.founder.role}
                </div>
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
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text" | "search" | "url" | "numeric";
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
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="input mt-2"
      />
    </div>
  );
}
