"use client";

/**
 * Fördercheck-Funnel.
 *
 * Hinweis: In Phase 1 ist hier die Intro-Ansicht angelegt. Der vollständige
 * 8-Schritt-Fragebogen (mit Validierung & Versand) folgt in Phase 3 – dort wird
 * diese Datei erweitert. Wird sowohl im Drawer als auch auf /foerdercheck genutzt.
 */
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/content";

export type FunnelProps = {
  variant?: "drawer" | "page";
  onClose?: () => void;
};

export function Funnel({ variant = "page" }: FunnelProps) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-md">
        <span className="eyebrow">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          {hero.box.title}
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold text-navy-900">
          {hero.box.text}
        </h2>
        <ol className="mt-6 space-y-3">
          {hero.box.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                {i + 1}
              </span>
              <span className="text-[15px] font-medium text-navy-900">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Button size="block" disabled>
            Fragebogen folgt (Phase 3)
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-ink-500">
          {variant === "drawer"
            ? "Der vollständige Fragebogen wird in Phase 3 ergänzt."
            : "Der vollständige Fragebogen wird in Phase 3 ergänzt."}
        </p>
      </div>
    </div>
  );
}
