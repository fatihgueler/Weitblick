"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
import { kontaktPage } from "@/lib/content";

const schema = z.object({
  name: z.string().min(1, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().optional(),
  subject: z.string().min(1, "Bitte wählen Sie ein Anliegen aus."),
  message: z.string().min(5, "Bitte beschreiben Sie kurz Ihr Anliegen."),
  consent: z.boolean().refine((v) => v === true, { message: "Bitte stimmen Sie der Verarbeitung zu." }),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", consent: false },
  });

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`status_${res.status}`);
      track("contact_submit", { subject: data.subject });
      setDone(true);
    } catch {
      setSubmitError("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-navy-900/8 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-navy-900">Vielen Dank für Ihre Nachricht.</h2>
        <p className="mt-2 text-[15px] text-ink-600">Ich melde mich zeitnah bei Ihnen zurück.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-navy-900/8 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="k-name" className="label">Name</label>
          <input id="k-name" autoComplete="name" className={cn("input", errors.name && "input-err")} {...register("name")} />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="k-email" className="label">E-Mail</label>
            <input id="k-email" type="email" autoComplete="email" className={cn("input", errors.email && "input-err")} {...register("email")} />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </div>
          <div>
            <label htmlFor="k-phone" className="label">Telefonnummer (optional)</label>
            <input id="k-phone" type="tel" autoComplete="tel" className="input" {...register("phone")} />
          </div>
        </div>
        <div>
          <label htmlFor="k-subject" className="label">Anliegen</label>
          <select id="k-subject" className={cn("input", errors.subject && "input-err")} defaultValue="" {...register("subject")}>
            <option value="" disabled>Bitte auswählen …</option>
            {kontaktPage.subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.subject && <FieldError>{errors.subject.message}</FieldError>}
        </div>
        <div>
          <label htmlFor="k-message" className="label">Nachricht</label>
          <textarea id="k-message" rows={5} className={cn("input resize-none", errors.message && "input-err")} {...register("message")} />
          {errors.message && <FieldError>{errors.message.message}</FieldError>}
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-600">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-900/20 text-teal-700 focus:ring-teal-500" {...register("consent")} />
          <span>{kontaktPage.privacyNote}</span>
        </label>
        {errors.consent && <FieldError>{errors.consent.message}</FieldError>}
        {submitError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{submitError}</p>
        )}
        <Button type="submit" size="block" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? "Wird gesendet …" : "Anfrage senden"}
        </Button>
      </div>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-sm font-medium text-red-600">
      {children}
    </p>
  );
}
