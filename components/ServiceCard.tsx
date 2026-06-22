import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceIcons } from "@/components/icons";
import { routes, type Service } from "@/lib/content";

/** Leistungskarte – Zeichenblatt-Stil: Mono-Index, Hairline, Eck-Tick, Hover. */
export function ServiceCard({
  service,
  index,
  className,
}: {
  service: Service;
  index?: number;
  className?: string;
}) {
  const Icon = serviceIcons[service.icon];
  return (
    <Link
      href={`${routes.leistungen}#${service.slug}`}
      className={cn(
        "card card-hover group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        className,
      )}
    >
      {/* Eck-Tick wie auf einem Zeichenblatt. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-navy-900/15 transition-colors group-hover:border-teal-600/50"
      />
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-100">
          {Icon ? <Icon className="h-5 w-5" strokeWidth={1.8} /> : null}
        </span>
        {typeof index === "number" && (
          <span className="index-tag text-navy-900/30">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="font-display text-[17px] font-bold leading-snug text-navy-900">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-600">{service.short}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
        Mehr erfahren
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.2}
        />
      </span>
    </Link>
  );
}
