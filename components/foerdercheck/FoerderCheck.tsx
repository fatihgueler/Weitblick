"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  computeEstimate,
  formatEuro,
  type Answers,
  type Estimate,
  type FunnelContent,
  type FunnelLocale,
  type QuestionDef,
} from "./content";
import { OptionIcon } from "./icons";

type Phase = "intro" | "question" | "calculating" | "result" | "lead" | "success";

type Props = {
  funnelLocale: FunnelLocale;
  content: FunnelContent;
  bookingUrl: string;
  contactHref: string;
  privacyHref: string;
};

const STORAGE_KEY = "enox_foerdercheck_v1";
const MAX_RESUME_AGE = 1000 * 60 * 60 * 24 * 7; // 7 Tage

type Persisted = {
  phase: Phase;
  questionIndex: number;
  answers: Answers;
  ts: number;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function isPhone(value: string): boolean {
  return /^[+()\d][\d\s/().-]{5,}$/.test(value.trim());
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function FoerderCheck({
  funnelLocale,
  content,
  bookingUrl,
  contactHref,
  privacyHref,
}: Props) {
  const { questions, ui } = content;

  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [resumable, setResumable] = useState<Persisted | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const totalSteps = questions.length + 1; // Fragen + Kontaktformular
  const headingRef = useRef<HTMLHeadingElement>(null);

  const estimate = useMemo<Estimate>(
    () => computeEstimate(answers),
    [answers],
  );

  /* ---- Persistenz -------------------------------------------------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Persisted;
        const fresh = Date.now() - data.ts < MAX_RESUME_AGE;
        const inProgress =
          (data.phase === "question" || data.phase === "result" || data.phase === "lead") &&
          Object.keys(data.answers ?? {}).length > 0;
        if (fresh && inProgress) setResumable(data);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (phase === "intro" || phase === "success") return;
    try {
      const data: Persisted = { phase, questionIndex, answers, ts: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [hydrated, phase, questionIndex, answers]);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- Fokus-Management -------------------------------------------------- */
  useEffect(() => {
    if (phase === "intro") return;
    const id = window.setTimeout(() => headingRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [phase, questionIndex]);

  /* ---- Navigation -------------------------------------------------------- */
  const goToCalculating = useCallback(() => {
    setPhase("calculating");
  }, []);

  const advance = useCallback(() => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      goToCalculating();
    }
  }, [questionIndex, questions.length, goToCalculating]);

  const back = useCallback(() => {
    if (phase === "lead") {
      setPhase("result");
      return;
    }
    if (phase === "result") {
      setPhase("question");
      setQuestionIndex(questions.length - 1);
      return;
    }
    if (phase === "question") {
      if (questionIndex === 0) setPhase("intro");
      else setQuestionIndex((i) => i - 1);
    }
  }, [phase, questionIndex, questions.length]);

  const start = useCallback(() => {
    setPhase("question");
    setQuestionIndex(0);
  }, []);

  const restart = useCallback(() => {
    clearStorage();
    setAnswers({});
    setQuestionIndex(0);
    setPhase("intro");
  }, [clearStorage]);

  const resume = useCallback(() => {
    if (!resumable) return;
    setAnswers(resumable.answers);
    setQuestionIndex(resumable.questionIndex);
    setPhase(resumable.phase === "result" ? "result" : "question");
    setResumable(null);
  }, [resumable]);

  /* ---- Antworten setzen -------------------------------------------------- */
  const setSingle = useCallback(
    (qid: string, value: string) => {
      setAnswers((a) => ({ ...a, [qid]: [value] }));
      window.setTimeout(advance, prefersReducedMotion() ? 0 : 260);
    },
    [advance],
  );

  const toggleMulti = useCallback((qid: string, value: string) => {
    setAnswers((a) => {
      const current = a[qid] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...a, [qid]: next };
    });
  }, []);

  /* ---- Render je Phase --------------------------------------------------- */
  const showProgress = phase === "question" || phase === "lead";
  const currentStep =
    phase === "lead" ? totalSteps : phase === "question" ? questionIndex + 1 : 0;
  const progress =
    phase === "lead"
      ? 100
      : phase === "question"
        ? (questionIndex / totalSteps) * 100
        : 0;

  return (
    <div className="relative w-full">
      {/* dekorativer Hintergrund */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 animate-blob rounded-full bg-brand-300/30 blur-3xl" />
        <div
          className="absolute bottom-0 -left-20 h-72 w-72 animate-blob rounded-full bg-brand-500/20 blur-3xl"
          style={{ animationDelay: "5s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:py-10">
        {showProgress && (
          <ProgressHeader
            step={currentStep}
            total={totalSteps}
            progress={progress}
            ui={ui}
            onBack={back}
          />
        )}

        <div key={`${phase}-${questionIndex}`} className="animate-fade-up">
          {phase === "intro" && <Intro content={content} onStart={start} />}

          {phase === "question" && (
            <Question
              q={questions[questionIndex]}
              selected={answers[questions[questionIndex].id] ?? []}
              onSingle={(v) => setSingle(questions[questionIndex].id, v)}
              onToggle={(v) => toggleMulti(questions[questionIndex].id, v)}
              onContinue={advance}
              headingRef={headingRef}
              ui={ui}
            />
          )}

          {phase === "calculating" && (
            <Calculating content={content} onDone={() => setPhase("result")} />
          )}

          {phase === "result" && (
            <Result
              content={content}
              estimate={estimate}
              funnelLocale={funnelLocale}
              headingRef={headingRef}
              onContinue={() => setPhase("lead")}
            />
          )}

          {phase === "lead" && (
            <Lead
              content={content}
              answers={answers}
              estimate={estimate}
              funnelLocale={funnelLocale}
              privacyHref={privacyHref}
              headingRef={headingRef}
              onSuccess={() => {
                clearStorage();
                setPhase("success");
              }}
            />
          )}

          {phase === "success" && (
            <Success
              content={content}
              estimate={estimate}
              funnelLocale={funnelLocale}
              bookingUrl={bookingUrl}
              contactHref={contactHref}
              headingRef={headingRef}
              onRestart={restart}
            />
          )}
        </div>
      </div>

      {resumable && (
        <ResumeDialog
          ui={ui}
          onResume={resume}
          onRestart={() => {
            clearStorage();
            setResumable(null);
          }}
        />
      )}
    </div>
  );
}

/* ========================================================================== */
/*  Fortschrittsanzeige                                                        */
/* ========================================================================== */

function ProgressHeader({
  step,
  total,
  progress,
  ui,
  onBack,
}: {
  step: number;
  total: number;
  progress: number;
  ui: FunnelContent["ui"];
  onBack: () => void;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold text-ink-600 transition hover:bg-brand-50 hover:text-ink-900"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
          {ui.back}
        </button>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
          {ui.step} {step} {ui.of} {total}
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Intro                                                                      */
/* ========================================================================== */

function Intro({
  content,
  onStart,
}: {
  content: FunnelContent;
  onStart: () => void;
}) {
  const { intro } = content;
  return (
    <div className="text-center">
      <span className="eyebrow mx-auto">{intro.badge}</span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-5xl">
        {intro.title}
      </h1>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-1.5 text-sm font-bold text-white shadow-soft sm:text-base">
        <SparkIcon className="h-4 w-4" />
        {intro.highlight}
      </div>
      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
        {intro.subtitle}
      </p>

      <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left">
        {intro.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 rounded-2xl border border-brand-900/5 bg-white/70 px-4 py-3 shadow-soft backdrop-blur">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <span className="text-sm font-medium text-ink-800">{b}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="btn-primary mt-9 w-full px-8 py-4 text-base sm:w-auto"
      >
        {intro.start}
        <span aria-hidden>→</span>
      </button>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-500">
        <ClockIcon className="h-3.5 w-3.5" />
        {intro.duration}
      </p>
      <p className="mt-1 text-xs text-ink-400">{intro.privacy}</p>
    </div>
  );
}

/* ========================================================================== */
/*  Frage                                                                      */
/* ========================================================================== */

function Question({
  q,
  selected,
  onSingle,
  onToggle,
  onContinue,
  headingRef,
  ui,
}: {
  q: QuestionDef;
  selected: string[];
  onSingle: (v: string) => void;
  onToggle: (v: string) => void;
  onContinue: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  ui: FunnelContent["ui"];
}) {
  const isMulti = q.type === "multi";
  const min = q.min ?? 1;
  const canContinue = selected.length >= min;

  // Tastatursteuerung: Zahlentasten wählen, Enter bestätigt (Multi)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const num = Number(e.key);
      if (num >= 1 && num <= q.options.length) {
        e.preventDefault();
        const opt = q.options[num - 1];
        if (isMulti) onToggle(opt.value);
        else onSingle(opt.value);
      } else if (e.key === "Enter" && isMulti && selected.length >= min) {
        e.preventDefault();
        onContinue();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, isMulti, onSingle, onToggle, onContinue, selected.length, min]);

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl font-bold tracking-tight text-ink-900 outline-none sm:text-3xl"
      >
        {q.question}
      </h2>
      {(q.help || isMulti) && (
        <p className="mt-2 text-sm text-ink-600">{q.help ?? ui.multiHint}</p>
      )}

      <div className="mt-6 grid gap-3">
        {q.options.map((opt, i) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => (isMulti ? onToggle(opt.value) : onSingle(opt.value))}
              className={[
                "group relative flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.99]",
                active
                  ? "border-brand-600 bg-brand-50 shadow-glow ring-1 ring-brand-600"
                  : "border-brand-900/10 bg-white shadow-soft hover:border-brand-500/40 hover:bg-brand-50/40 hover:shadow-lift",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition",
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-brand-50 text-brand-700 group-hover:bg-brand-100",
                ].join(" ")}
              >
                {opt.icon ? <OptionIcon icon={opt.icon} className="h-6 w-6" /> : <span className="text-sm font-bold">{i + 1}</span>}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-ink-900 sm:text-base">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="mt-0.5 block text-xs leading-snug text-ink-600 sm:text-sm">
                    {opt.description}
                  </span>
                )}
              </span>
              <span
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
                  isMulti ? "rounded-md" : "rounded-full",
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-brand-900/15 bg-white text-transparent",
                ].join(" ")}
              >
                <CheckIcon className="h-4 w-4" />
              </span>
            </button>
          );
        })}
      </div>

      {isMulti && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-sm text-ink-500">
            {selected.length > 0
              ? `${selected.length} ${ui.selectedHint}`
              : ui.multiHint}
          </span>
          <button
            type="button"
            disabled={!canContinue}
            onClick={onContinue}
            className="btn-primary px-7 py-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {ui.continue}
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/*  Berechnung (Übergangs-Animation)                                           */
/* ========================================================================== */

function Calculating({
  content,
  onDone,
}: {
  content: FunnelContent;
  onDone: () => void;
}) {
  const { calculating } = content;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) {
      const t = window.setTimeout(onDone, 350);
      return () => window.clearTimeout(t);
    }
    const per = 560;
    const timers = calculating.steps.map((_, i) =>
      window.setTimeout(() => setActive(i + 1), per * (i + 1)),
    );
    const done = window.setTimeout(onDone, per * calculating.steps.length + 500);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [calculating.steps, onDone]);

  return (
    <div className="py-10 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
        <span className="absolute h-20 w-20 animate-ping rounded-full bg-brand-400/30" />
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
          <SparkIcon className="h-9 w-9" />
        </span>
      </div>
      <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
        {calculating.title}
      </h2>
      <ul className="mx-auto mt-8 grid max-w-sm gap-2.5 text-left">
        {calculating.steps.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={s}
              className={[
                "flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all duration-300",
                done
                  ? "border-brand-600/30 bg-brand-50 text-ink-800"
                  : current
                    ? "border-brand-500/40 bg-white text-ink-900 shadow-soft"
                    : "border-brand-900/5 bg-white/50 text-ink-400",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition",
                  done ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-600",
                ].join(" ")}
              >
                {done ? (
                  <CheckIcon className="h-4 w-4" />
                ) : current ? (
                  <span className="h-2.5 w-2.5 animate-shimmer rounded-full bg-brand-600" />
                ) : (
                  <span className="text-[11px] font-bold">{i + 1}</span>
                )}
              </span>
              <span className="font-medium">{s}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/*  Ergebnis                                                                   */
/* ========================================================================== */

function useCountUp(target: number, run: boolean): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const duration = 1000;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return value;
}

function Result({
  content,
  estimate,
  funnelLocale,
  headingRef,
  onContinue,
}: {
  content: FunnelContent;
  estimate: Estimate;
  funnelLocale: FunnelLocale;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onContinue: () => void;
}) {
  const { result } = content;
  const animated = useCountUp(estimate.total, true);
  const rows = [
    { label: result.items.bafa, value: estimate.bafa },
    { label: result.items.kfw, value: estimate.kfw },
    { label: result.items.tax, value: estimate.tax },
  ].filter((r) => r.value > 0);
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div>
      <span className="eyebrow inline-flex items-center gap-1.5">
        <CheckBadgeIcon className="h-4 w-4" />
        {result.badge}
      </span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900 outline-none sm:text-3xl"
      >
        {result.title}
      </h2>

      <div className="relative mt-6 overflow-hidden rounded-4xl bg-ink-900 p-7 text-center shadow-lift sm:p-9">
        <div aria-hidden className="absolute inset-0 dark-mesh opacity-90" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            {result.upTo}
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            {formatEuro(animated, funnelLocale)}
          </p>
          <p className="mx-auto mt-2 max-w-xs text-sm text-brand-100/80">
            {result.perYear}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-brand-900/5 bg-white p-5 shadow-soft sm:p-6">
        <h3 className="text-sm font-bold text-ink-900">{result.breakdownTitle}</h3>
        <ul className="mt-4 space-y-4">
          {rows.map((r) => (
            <li key={r.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink-700">{r.label}</span>
                <span className="font-bold text-ink-900">
                  {formatEuro(r.value, funnelLocale)}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                  style={{ width: `${(r.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-ink-400">{result.disclaimer}</p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="btn-primary mt-7 w-full px-8 py-4 text-base"
      >
        {result.cta}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

/* ========================================================================== */
/*  Lead-Formular                                                              */
/* ========================================================================== */

function Lead({
  content,
  answers,
  estimate,
  funnelLocale,
  privacyHref,
  headingRef,
  onSuccess,
}: {
  content: FunnelContent;
  answers: Answers;
  estimate: Estimate;
  funnelLocale: FunnelLocale;
  privacyHref: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onSuccess: () => void;
}) {
  const { lead } = content;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
    company: "", // Honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.firstName.trim().length < 2) e.firstName = lead.errors.firstName;
    if (form.lastName.trim().length < 2) e.lastName = lead.errors.lastName;
    if (!isEmail(form.email)) e.email = lead.errors.email;
    if (!isPhone(form.phone)) e.phone = lead.errors.phone;
    if (!form.consent) e.consent = lead.errors.consent;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;

    // Honeypot: still „erfolgreich", aber nichts senden
    if (form.company.trim() !== "") {
      onSuccess();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/foerdercheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
          answers,
          estimate,
          locale: funnelLocale,
          meta: {
            url: typeof window !== "undefined" ? window.location.href : "",
            referrer: typeof document !== "undefined" ? document.referrer : "",
            submittedAt: new Date().toISOString(),
          },
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);

      // optionales Tracking, falls vorhanden
      try {
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
          event: "foerdercheck_lead",
          funding_estimate: estimate.total,
        });
      } catch {
        /* ignore */
      }

      onSuccess();
    } catch {
      setServerError(lead.errors.generic);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl font-bold tracking-tight text-ink-900 outline-none sm:text-3xl"
      >
        {lead.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-600 sm:text-base">
        {lead.subtitle}
      </p>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-600/20 bg-brand-50 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
          <SparkIcon className="h-5 w-5" />
        </span>
        <p className="text-sm text-ink-800">
          <span className="font-semibold">{content.success.resultLabel}: </span>
          {formatEuro(estimate.total, funnelLocale)}
        </p>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label={lead.firstName}
            value={form.firstName}
            onChange={(v) => update("firstName", v)}
            autoComplete="given-name"
            error={errors.firstName}
          />
          <TextField
            label={lead.lastName}
            value={form.lastName}
            onChange={(v) => update("lastName", v)}
            autoComplete="family-name"
            error={errors.lastName}
          />
        </div>
        <TextField
          label={lead.email}
          type="email"
          inputMode="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
          error={errors.email}
        />
        <TextField
          label={lead.phone}
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          autoComplete="tel"
          hint={lead.phoneHint}
          error={errors.phone}
        />

        {/* Honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-brand-900/20 text-brand-700 focus:ring-brand-500"
          />
          <span>
            {lead.consent}{" "}
            <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline underline-offset-2">
              ↗
            </a>
          </span>
        </label>
        {errors.consent && <p className="-mt-2 text-xs font-medium text-red-600">{errors.consent}</p>}

        {serverError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-1 w-full px-8 py-4 text-base disabled:opacity-60"
        >
          {submitting ? lead.submitting : lead.submit}
          {!submitting && <span aria-hidden>→</span>}
        </button>
        <p className="flex items-center justify-center gap-2 text-xs text-ink-400">
          <LockIcon className="h-3.5 w-3.5" />
          {lead.securenote}
        </p>
      </form>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  hint,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
  hint?: string;
  error?: string;
}) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={[
          "input mt-2",
          error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : "",
        ].join(" ")}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ========================================================================== */
/*  Erfolg                                                                     */
/* ========================================================================== */

function Success({
  content,
  estimate,
  funnelLocale,
  bookingUrl,
  contactHref,
  headingRef,
  onRestart,
}: {
  content: FunnelContent;
  estimate: Estimate;
  funnelLocale: FunnelLocale;
  bookingUrl: string;
  contactHref: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
}) {
  const { success } = content;
  const href = bookingUrl || contactHref;
  const external = /^https?:\/\//.test(href);

  return (
    <div className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
        <CheckIcon className="h-10 w-10" />
      </div>
      <span className="eyebrow mx-auto mt-6">{success.badge}</span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900 outline-none sm:text-3xl"
      >
        {success.title}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-700 sm:text-base">
        {success.subtitle}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm">
        <span className="font-medium text-ink-600">{success.resultLabel}:</span>
        <span className="font-bold text-brand-800">{formatEuro(estimate.total, funnelLocale)}</span>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-4xl bg-ink-900 p-7 text-left shadow-lift sm:p-8">
        <div aria-hidden className="absolute inset-0 dark-mesh opacity-90" />
        <div className="relative">
          <h3 className="font-display text-xl font-bold text-white">{success.bookTitle}</h3>
          <p className="mt-2 text-sm text-brand-100/80">{success.bookText}</p>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-400 px-7 py-3.5 text-sm font-bold text-ink-900 shadow-glow transition hover:bg-brand-300 active:scale-[0.98] sm:w-auto"
          >
            <CalendarIcon className="h-4 w-4" />
            {success.book}
          </a>
        </div>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-sm font-bold text-ink-900">{success.nextTitle}</h3>
        <ol className="mt-4 space-y-3">
          {success.next.map((n, i) => (
            <li key={n} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-ink-700">{n}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="btn-ghost mx-auto mt-8"
      >
        {success.restart}
      </button>
    </div>
  );
}

/* ========================================================================== */
/*  Resume-Dialog                                                              */
/* ========================================================================== */

function ResumeDialog({
  ui,
  onResume,
  onRestart,
}: {
  ui: FunnelContent["ui"];
  onResume: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lift animate-fade-up">
        <h3 className="font-display text-lg font-bold text-ink-900">{ui.resumeTitle}</h3>
        <p className="mt-2 text-sm text-ink-600">{ui.resumeText}</p>
        <div className="mt-5 grid gap-2.5">
          <button type="button" onClick={onResume} className="btn-primary w-full">
            {ui.resumeYes}
          </button>
          <button type="button" onClick={onRestart} className="btn-secondary w-full">
            {ui.resumeNo}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                      */
/* ========================================================================== */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2c.4 3.8 2.2 5.6 6 6-3.8.4-5.6 2.2-6 6-.4-3.8-2.2-5.6-6-6 3.8-.4 5.6-2.2 6-6Z" />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2.5 14 4l2.5-.4.6 2.4 2.3 1L19 9.5l1.4 2.1-2 1.5.2 2.5-2.5.3-1.3 2.2L12 17.4 9.2 18l-1.3-2.2-2.5-.3.2-2.5-2-1.5L5 9.5 3.6 7l2.3-1 .6-2.4L9 4Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5l3 2" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <path d="M3.5 9h17M8 3v4M16 3v4" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
