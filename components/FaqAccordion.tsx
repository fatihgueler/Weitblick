"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/content";

/** Aufklappbare FAQ-Liste (Radix Accordion, single + collapsible). */
export function FaqAccordion({ items, idPrefix = "faq" }: { items: Faq[]; idPrefix?: string }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`${idPrefix}-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
