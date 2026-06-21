"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { hero, ctaLabels } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { useFoerdercheck } from "@/components/foerdercheck/provider";

/**
 * Dauerhaft präsenter Fördercheck-Launcher.
 *  - Desktop (≥1024px): schmaler, am rechten Rand andockender Tab, der bei
 *    Hover/Fokus zur Mini-Vorschau aufklappt. Blendet erst nach dem Hero ein.
 *  - Mobil (<1024px): fixe Bottom-Bar mit Full-Width-Button.
 * Öffnet jeweils den Fördercheck-Drawer.
 */
export function StickyFoerdercheck() {
  const { open } = useFoerdercheck();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: andockender Tab, klappt auf */}
      <div
        className={cn(
          "fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 lg:block",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="group flex translate-x-[296px] items-stretch transition-transform duration-300 ease-out hover:translate-x-0 focus-within:translate-x-0">
          {/* Griff/Tab */}
          <button
            type="button"
            onClick={() => open("sticky-desktop")}
            aria-label={`${hero.box.title} – ${ctaLabels.foerdercheck}`}
            className="flex w-11 shrink-0 items-center justify-center rounded-l-2xl bg-teal-700 py-5 text-white shadow-lift transition group-hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <span className="flex flex-col items-center gap-2">
              <ClipboardCheck className="h-5 w-5" strokeWidth={2} />
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] [writing-mode:vertical-rl]">
                Fördercheck
              </span>
            </span>
          </button>

          {/* Mini-Vorschau */}
          <div className="w-[296px] rounded-l-3xl border-y border-l border-navy-900/8 bg-white p-5 shadow-lift">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
              {hero.box.title}
            </div>
            <p className="mt-1.5 text-sm font-medium text-navy-900">{hero.box.text}</p>
            <ol className="mt-3 space-y-1.5">
              {hero.box.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-2 text-sm text-ink-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-[11px] font-bold text-teal-700">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <Button onClick={() => open("sticky-desktop")} size="block" className="mt-4">
              {ctaLabels.foerdercheck}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobil: Bottom-Bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-navy-900/8 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Button onClick={() => open("sticky-mobile")} size="block">
          {ctaLabels.foerdercheck}
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </Button>
      </div>
    </>
  );
}
