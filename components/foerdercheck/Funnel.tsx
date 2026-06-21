"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Home,
  Building2,
  DoorClosed,
  Hammer,
  HelpCircle,
  Route,
  Wrench,
  Flame,
  ThermometerSun,
  Layers,
  Triangle,
  PanelTop,
  Box,
  Calculator,
  Gauge,
  Wind,
  FileCheck2,
  BadgeEuro,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
import {
  questions,
  funnelCopy,
  type ChoiceId,
  type FunnelData,
} from "@/components/foerdercheck/content";

const tileIcons: Record<string, LucideIcon> = {
  Home, Building2, DoorClosed, Hammer, HelpCircle, Route, Wrench, Flame,
  ThermometerSun, Layers, Triangle, PanelTop, Box, Calculator, Gauge, Wind,
  FileCheck2, BadgeEuro,
};

const { errors: ERR, ui, location: LOC, contact: KON, intro: INTRO, success: SUC } = funnelCopy;

const schema = z.object({
  building: z.string().min(1, ERR.choice),
  measures: z.array(z.string()).min(1, ERR.multi),
  year: z.string().min(1, ERR.choice),
  usage: z.string().min(1, ERR.choice),
  plz: z.string().regex(/^\d{5}$/, ERR.plz),
  ort: z.string().min(2, ERR.ort),
  timing: z.string().min(1, ERR.choice),
  offers: z.string().min(1, ERR.choice),
  firstName: z.string().min(1, ERR.firstName),
  lastName: z.string().min(1, ERR.lastName),
  email: z.string().email(ERR.email),
  phone: z.string().min(5, ERR.phone),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: ERR.consent }),
});

type FormValues = z.infer<typeof schema>;

type Step =
  | { kind: "choice"; id: ChoiceId }
  | { kind: "location" }
  | { kind: "contact" };

const STEPS: Step[] = [
  { kind: "choice", id: "building" },
  { kind: "choice", id: "measures" },
  { kind: "choice", id: "year" },
  { kind: "choice", id: "usage" },
  { kind: "location" },
  { kind: "choice", id: "timing" },
  { kind: "choice", id: "offers" },
  { kind: "contact" },
];

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["building"],
  ["measures"],
  ["year"],
  ["usage"],
  ["plz", "ort"],
  ["timing"],
  ["offers"],
  ["firstName", "lastName", "email", "phone", "consent"],
];

export type FunnelProps = {
  variant?: "drawer" | "page";
  onClose?: () => void;
};

export function Funnel({ variant = "page", onClose }: FunnelProps) {
  const [phase, setPhase] = useState<"intro" | "questions" | "success">("intro");
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      building: "", measures: [], year: "", usage: "", plz: "", ort: "",
      timing: "", offers: "", firstName: "", lastName: "", email: "",
      phone: "", message: "", consent: false,
    },
  });

  const values = watch();
  const isLast = step === STEPS.length - 1;

  function scrollTop() {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function next() {
    const ok = await trigger(STEP_FIELDS[step]);
    if (!ok) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  }

  function back() {
    if (step === 0) {
      setPhase("intro");
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  }

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/foerdercheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, meta: { source: variant, path: typeof window !== "undefined" ? window.location.pathname : "" } }),
      });
      if (!res.ok) throw new Error(`status_${res.status}`);
      track("foerdercheck_submit", { building: data.building, measures: data.measures });
      setPhase("success");
      scrollTop();
    } catch {
      setSubmitError(ERR.generic);
    } finally {
      setSubmitting(false);
    }
  }

  function selectSingle(id: ChoiceId, value: string) {
    setValue(id, value, { shouldValidate: true, shouldTouch: true });
  }
  function toggleMulti(id: ChoiceId, value: string) {
    const current = (values[id] as string[]) ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(id, next, { shouldValidate: true, shouldTouch: true });
  }

  const rootClass = cn(
    "flex flex-col bg-white",
    variant === "drawer" ? "h-full" : "min-h-[560px] rounded-3xl border border-navy-900/8 shadow-lift",
  );

  /* ---- Intro -------------------------------------------------------------- */
  if (phase === "intro") {
    return (
      <div className={rootClass}>
        <div ref={scrollRef} className="flex flex-1 items-center overflow-y-auto px-6 py-10 sm:px-10">
          <div className="mx-auto w-full max-w-md">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              {INTRO.badge}
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              {INTRO.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{INTRO.text}</p>
            <ol className="mt-6 space-y-3">
              {INTRO.bullets.map((b, i) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-medium text-navy-900">{b}</span>
                </li>
              ))}
            </ol>
            <Button
              size="block"
              className="mt-8"
              onClick={() => {
                setPhase("questions");
                setStep(0);
              }}
            >
              {INTRO.start}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Button>
            <p className="mt-3 text-center text-xs text-ink-500">{INTRO.duration}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Success ------------------------------------------------------------ */
  if (phase === "success") {
    return (
      <div className={rootClass}>
        <div ref={scrollRef} className="flex flex-1 items-center overflow-y-auto px-6 py-10 sm:px-10">
          <div className="mx-auto w-full max-w-md text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold text-navy-900">{SUC.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{SUC.text}</p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/" className="btn-primary" onClick={onClose}>
                {SUC.home}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Questions ---------------------------------------------------------- */
  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form className={rootClass} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Fortschritt */}
      <div className="shrink-0 border-b border-navy-900/8 px-6 pb-4 pt-6 sm:px-10">
        <div className="flex items-center justify-between text-xs font-semibold text-ink-500">
          <span>
            {ui.step} {step + 1} {ui.of} {STEPS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-navy-900/8"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          <div
            className="h-full rounded-full bg-teal-600 transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Schritt-Inhalt */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-7 sm:px-10">
        <div key={step} className="step-in mx-auto w-full max-w-xl">
          {current.kind === "choice" && (
            <ChoiceStep
              id={current.id}
              values={values}
              error={errors[current.id]?.message as string | undefined}
              onSingle={selectSingle}
              onMulti={toggleMulti}
            />
          )}

          {current.kind === "location" && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                {LOC.question}
              </legend>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="plz" className="label">{LOC.plz}</label>
                  <input
                    id="plz"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={cn("input", errors.plz && "input-err")}
                    {...register("plz")}
                  />
                  {errors.plz && <FieldError>{errors.plz.message}</FieldError>}
                </div>
                <div>
                  <label htmlFor="ort" className="label">{LOC.ort}</label>
                  <input
                    id="ort"
                    autoComplete="address-level2"
                    className={cn("input", errors.ort && "input-err")}
                    {...register("ort")}
                  />
                  {errors.ort && <FieldError>{errors.ort.message}</FieldError>}
                </div>
              </div>
            </fieldset>
          )}

          {current.kind === "contact" && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                {KON.question}
              </legend>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="label">{KON.firstName}</label>
                  <input id="firstName" autoComplete="given-name" className={cn("input", errors.firstName && "input-err")} {...register("firstName")} />
                  {errors.firstName && <FieldError>{errors.firstName.message}</FieldError>}
                </div>
                <div>
                  <label htmlFor="lastName" className="label">{KON.lastName}</label>
                  <input id="lastName" autoComplete="family-name" className={cn("input", errors.lastName && "input-err")} {...register("lastName")} />
                  {errors.lastName && <FieldError>{errors.lastName.message}</FieldError>}
                </div>
                <div>
                  <label htmlFor="email" className="label">{KON.email}</label>
                  <input id="email" type="email" autoComplete="email" className={cn("input", errors.email && "input-err")} {...register("email")} />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </div>
                <div>
                  <label htmlFor="phone" className="label">{KON.phone}</label>
                  <input id="phone" type="tel" autoComplete="tel" className={cn("input", errors.phone && "input-err")} {...register("phone")} />
                  {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="label">{KON.message}</label>
                <textarea id="message" rows={3} className="input resize-none" {...register("message")} />
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink-600">
                <input
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-900/20 text-teal-700 focus:ring-teal-500"
                  {...register("consent")}
                />
                <span>{KON.consent}</span>
              </label>
              {errors.consent && <FieldError>{errors.consent.message as string}</FieldError>}
              {submitError && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {submitError}
                </p>
              )}
            </fieldset>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="shrink-0 border-t border-navy-900/8 px-6 py-4 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-500 transition hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {ui.back}
          </button>

          {isLast ? (
            <Button type="submit" disabled={submitting} className="min-w-[160px]">
              {submitting ? KON.submitting : KON.submit}
              {!submitting && <ArrowRight className="h-4 w-4" strokeWidth={2.2} />}
            </Button>
          ) : (
            <Button type="button" onClick={next} className="min-w-[140px]">
              {ui.next}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function ChoiceStep({
  id,
  values,
  error,
  onSingle,
  onMulti,
}: {
  id: ChoiceId;
  values: FormValues;
  error?: string;
  onSingle: (id: ChoiceId, value: string) => void;
  onMulti: (id: ChoiceId, value: string) => void;
}) {
  const q = questions[id];
  const selected = values[id];
  const multi = q.kind === "multi";

  return (
    <fieldset>
      <legend className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
        {q.question}
      </legend>
      {q.hint && <p className="mt-1 text-sm text-ink-500">{q.hint}</p>}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {q.options.map((opt) => {
          const isSel = multi
            ? ((selected as string[]) ?? []).includes(opt.value)
            : selected === opt.value;
          const Icon = opt.icon ? tileIcons[opt.icon] : undefined;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={isSel}
              onClick={() => (multi ? onMulti(id, opt.value) : onSingle(id, opt.value))}
              className={cn(
                "group flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                isSel
                  ? "border-teal-600 bg-teal-50/60 ring-1 ring-teal-600"
                  : "border-navy-900/10 hover:border-teal-600/40 hover:bg-navy-50/40",
              )}
            >
              {Icon && (
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition",
                    isSel ? "bg-teal-600 text-white" : "bg-navy-50 text-navy-700",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
              )}
              <span className="flex-1 text-[15px] font-medium text-navy-900">{opt.label}</span>
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition",
                  isSel ? "border-teal-600 bg-teal-600 text-white" : "border-navy-900/20 text-transparent",
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
      {error && <FieldError>{error}</FieldError>}
    </fieldset>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 text-sm font-medium text-red-600">
      {children}
    </p>
  );
}
