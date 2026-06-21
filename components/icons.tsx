import {
  Route,
  BadgeEuro,
  Calculator,
  Gauge,
  FileCheck2,
  ThermometerSun,
  Wind,
  DraftingCompass,
  Home,
  Building2,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

/** Registry: hält content.ts serialisierbar (Strings statt Komponenten). */
export const serviceIcons: Record<string, LucideIcon> = {
  Route,
  BadgeEuro,
  Calculator,
  Gauge,
  FileCheck2,
  ThermometerSun,
  Wind,
  DraftingCompass,
};

export const audienceIcons: Record<string, LucideIcon> = {
  Home,
  Building2,
  KeyRound,
};
