"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useFoerdercheck } from "@/components/foerdercheck/provider";

type Props = ButtonProps & {
  /** Quelle für Tracking (z. B. "hero", "leistungen"). */
  source?: string;
};

/**
 * Öffnet den Fördercheck-Drawer. Verwendbar in Server-Komponenten, da selbst
 * eine Client-Komponente (dünne Hülle um <Button>).
 */
export function FoerdercheckButton({ source = "cta", children, ...props }: Props) {
  const { open } = useFoerdercheck();
  return (
    <Button onClick={() => open(source)} {...props}>
      {children}
    </Button>
  );
}
