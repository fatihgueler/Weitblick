import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceIcons } from "@/components/icons";
import { routes, type Service } from "@/lib/content";

/** Leistungskarte – Icon, Titel, kurzer Text, Link auf den Detailblock. */
export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = serviceIcons[service.icon];
  return (
    <Link
      href={`${routes.leistungen}#${service.slug}`}
      className={cn("card card-hover group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2", className)}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
        {Icon ? <Icon className="h-6 w-6" strokeWidth={1.8} /> : null}
      </span>
      <h3 className="text-base font-bold text-navy-900">{service.title}</h3>
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
