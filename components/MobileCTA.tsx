import Link from "next/link";
import type { Locale } from "@/i18n/config";

export function MobileCTA({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  return (
    <div
      aria-hidden="false"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 lg:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href={`/${lang}/contact`}
        className="pointer-events-auto inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lift backdrop-blur transition active:scale-[0.98]"
      >
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-70" />
          <span className="relative inline-block h-2 w-2 rounded-full bg-brand-400" />
        </span>
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
