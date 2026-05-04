import Link from "next/link";
import { locales, defaultLocale, localeNames } from "@/i18n/config";

export const metadata = {
  title: "EnOX – Energieberatung trifft Smart Building",
  description:
    "EnOX kombiniert Energieberatung, Sanierung und intelligente Gebäudelösungen. Bitte Sprache wählen.",
};

export default function RootPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var b=${JSON.stringify(
            process.env.NEXT_PUBLIC_BASE_PATH || ""
          )};var ls=${JSON.stringify(
            locales as unknown as string[]
          )};var d=${JSON.stringify(defaultLocale)};var c=document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);var saved=c?decodeURIComponent(c[1]):null;var pref=null;if(saved&&ls.indexOf(saved)>-1){pref=saved;}else{var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]);for(var i=0;i<langs.length;i++){var t=String(langs[i]||"").toLowerCase().split("-")[0];if(ls.indexOf(t)>-1){pref=t;break;}}}window.location.replace(b+"/"+(pref||d)+"/");}catch(e){window.location.replace(${JSON.stringify(
            (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/" + defaultLocale + "/"
          )});}})();`,
        }}
      />
      <main className="grid min-h-screen place-items-center bg-white p-6">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-tech-600 text-white">
            <span className="font-display text-lg font-extrabold">E</span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            EnOX
          </h1>
          <p className="mt-2 text-sm text-ink-600">
            Energieberatung trifft Smart Building
          </p>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm font-semibold text-ink-900 shadow-soft transition hover:border-brand-500/40 hover:bg-brand-50"
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
          <noscript>
            <p className="mt-6 text-xs text-ink-500">
              Bitte Sprache wählen.
            </p>
          </noscript>
        </div>
      </main>
    </>
  );
}
