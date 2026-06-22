import { HorizonScene } from "@/components/HorizonScene";

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
    <section className="relative overflow-hidden border-b border-navy-900/8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-glow" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_80%)]"
      >
        <HorizonScene className="w-full" />
      </div>
      <div className="container py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-6 heading-1">{title}</h1>
          {text && <p className="mt-6 lead">{text}</p>}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
