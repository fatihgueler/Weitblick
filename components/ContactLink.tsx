"use client";

import { cn } from "@/lib/utils";
import { isPlaceholder } from "@/lib/content";
import { track } from "@/lib/track";

type Props = {
  type: "email" | "phone";
  value: string;
  className?: string;
};

/**
 * Telefon-/E-Mail-Link mit DSGVO-konformem Event-Hook.
 * Platzhalter (z. B. "[E-Mail-Adresse eintragen]") werden als reiner Text
 * dargestellt – kein kaputter mailto:/tel:-Link.
 */
export function ContactLink({ type, value, className }: Props) {
  if (isPlaceholder(value)) {
    return <span className={cn("opacity-80", className)}>{value}</span>;
  }
  const href =
    type === "email" ? `mailto:${value}` : `tel:${value.replace(/[^+\d]/g, "")}`;
  return (
    <a
      href={href}
      className={cn("transition hover:text-white", className)}
      onClick={() => track(type === "email" ? "mail_click" : "tel_click")}
    >
      {value}
    </a>
  );
}
