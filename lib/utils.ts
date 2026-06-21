import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-Klassen sicher zusammenführen (shadcn-Konvention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
