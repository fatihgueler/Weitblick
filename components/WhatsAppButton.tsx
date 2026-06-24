import { contact } from "@/lib/content";

/**
 * Dezenter Klick-zu-WhatsApp-Button (v. a. mobil). Sitzt über der mobilen
 * Sticky-Fördercheck-Bar, damit er den Fördercheck ergänzt, nicht ersetzt.
 */
export function WhatsAppButton() {
  const number = contact.phone.replace(/[^\d]/g, ""); // 4917680020590
  const text = encodeURIComponent(
    "Hallo Weitblick, ich interessiere mich für eine Energieberatung.",
  );
  const href = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Per WhatsApp Kontakt aufnehmen"
      title="WhatsApp"
      className="group fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-paper bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.52 0-3.01-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23Zm-3.2 4.43c-.15 0-.4.06-.61.29-.21.23-.8.79-.8 1.92 0 1.13.82 2.22.93 2.38.12.15 1.62 2.47 3.92 3.46.55.24.97.38 1.31.49.55.17 1.05.15 1.45.09.44-.07 1.36-.56 1.55-1.09.19-.54.19-1 .14-1.09-.06-.1-.21-.15-.44-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.52.12-.15.23-.59.74-.72.9-.13.15-.27.17-.5.06-.23-.12-.96-.36-1.84-1.13-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.36.1-.47.1-.1.23-.27.35-.4.12-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.52-1.26-.72-1.72-.19-.46-.38-.39-.52-.4l-.45-.01Z" />
      </svg>
    </a>
  );
}
