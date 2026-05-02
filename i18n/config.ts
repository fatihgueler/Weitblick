export const locales = ["de", "en", "zh", "es", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }
  return value;
}

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  zh: "中文",
  es: "Español",
  ru: "Русский",
};

export const localeFlags: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  zh: "ZH",
  es: "ES",
  ru: "RU",
};
