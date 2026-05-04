"use client";

import { useState } from "react";

type Strings = {
  title: string;
  subtitle: string;
  area: string;
  consumption: string;
  result: string;
  resultLabel: string;
  co2Label: string;
  paybackLabel: string;
  cta: string;
  ctaHref: string;
};

export function SavingsCalculator({ strings }: { strings: Strings }) {
  const [area, setArea] = useState(180);
  const [perM2, setPerM2] = useState(140);

  const yearlyKwh = area * perM2;
  const cost = yearlyKwh * 0.32;
  const saved = Math.round(cost * 0.42);
  const co2 = Math.round((yearlyKwh / 1000) * 0.68 * 230);
  const payback = (cost * 0.42 > 0 ? Math.max(3.2, Math.min(8.5, 28000 / Math.max(cost * 0.42, 1))) : 5.8).toFixed(1);

  return (
    <div className="surface relative overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl"
      />
      <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">{strings.subtitle}</span>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {strings.title}
          </h3>

          <div className="mt-7 space-y-5">
            <Slider
              label={strings.area}
              unit="m²"
              min={40}
              max={1200}
              step={20}
              value={area}
              onChange={setArea}
            />
            <Slider
              label={strings.consumption}
              unit="kWh/m²·a"
              min={60}
              max={300}
              step={5}
              value={perM2}
              onChange={setPerM2}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-ink-900 p-6 text-white sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
            {strings.result}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="font-display text-5xl font-extrabold tracking-tight">
              {saved.toLocaleString("de-DE")}
            </div>
            <div className="text-xl font-semibold text-brand-200">€/Jahr</div>
          </div>
          <div className="mt-1 text-xs text-white/70">{strings.resultLabel}</div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Tile
              label={strings.co2Label}
              value={`−${co2.toLocaleString("de-DE")} kg`}
            />
            <Tile label={strings.paybackLabel} value={`${payback} J.`} />
          </div>

          <a
            href={strings.ctaHref}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:bg-brand-400 active:scale-[0.98]"
          >
            {strings.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="label">{label}</span>
        <span className="font-display text-lg font-bold text-ink-900">
          {value.toLocaleString("de-DE")}{" "}
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">
            {unit}
          </span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
      />
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-300">
        {label}
      </div>
      <div className="mt-1 font-display text-lg font-bold">{value}</div>
    </div>
  );
}
