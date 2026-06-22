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
          <AccordionTrigger>
            <span className="flex items-baseline gap-4">
              <span aria-hidden="true" className="index-tag shrink-0 text-teal-700/55">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.q}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-[3.25rem]">{item.a}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
