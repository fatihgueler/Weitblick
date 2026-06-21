"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Funnel } from "@/components/foerdercheck/Funnel";
import { track } from "@/lib/track";

type FoerdercheckContextValue = {
  open: (source?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const FoerdercheckContext = createContext<FoerdercheckContextValue | null>(null);

export function useFoerdercheck(): FoerdercheckContextValue {
  const ctx = useContext(FoerdercheckContext);
  if (!ctx) {
    throw new Error("useFoerdercheck muss innerhalb von <FoerdercheckProvider> verwendet werden.");
  }
  return ctx;
}

export function FoerdercheckProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((source = "unknown") => {
    track("foerdercheck_open", { source });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <FoerdercheckContext.Provider value={value}>
      {children}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          aria-describedby={undefined}
          className="w-full sm:max-w-lg lg:max-w-xl"
        >
          <VisuallyHidden>
            <SheetTitle>Kostenloser Fördercheck</SheetTitle>
            <SheetDescription>
              Schritt-für-Schritt-Fragebogen zu Ihrem Wohngebäude.
            </SheetDescription>
          </VisuallyHidden>
          <Funnel variant="drawer" onClose={close} />
        </SheetContent>
      </Sheet>
    </FoerdercheckContext.Provider>
  );
}
