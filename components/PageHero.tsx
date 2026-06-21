/** Schlanker Hero für Unterseiten – Eyebrow, Titel, Text + optionale Aktionen. */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy-900/5">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-glow" />
      <div className="container py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-5 heading-1">{title}</h1>
          {text && <p className="mt-5 lead">{text}</p>}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
