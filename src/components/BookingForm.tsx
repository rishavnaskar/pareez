"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck, ChevronDown } from "lucide-react";
import { BRANCHES, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { logBookingRequest } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * Appointment form — composes a structured WhatsApp message to the salon,
 * so bookings land directly in the channel the team already uses.
 */

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const inputCls =
  "w-full rounded-xl border border-cream/15 bg-ink-soft px-4 py-3.5 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold tracking-[0.18em] text-cream-dim uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function BookingForm() {
  const params = useSearchParams();
  const preselected = params.get("branch");

  const [branch, setBranch] = useState(
    BRANCHES.some((b) => b.id === preselected) ? (preselected as string) : BRANCHES[0].id,
  );
  // local date, not toISOString() — UTC would lag a day behind IST until 5:30 AM
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  }, []);

  const [service, setService] = useState(SERVICES[0].title);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const valid = name.trim().length >= 2 && /^[\d\s+()-]{8,}$/.test(phone) && date !== "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const b = BRANCHES.find((x) => x.id === branch)!;
    logBookingRequest({
      name: name.trim(),
      phone: phone.trim(),
      branchId: b.id,
      branchName: b.shortName,
      service,
      date,
      time,
      notes: notes.trim(),
    });
    const msg = [
      "✨ *New Appointment Request — Pareez Website*",
      "",
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Branch:* ${b.shortName} — ${b.addressLine1}`,
      `*Service:* ${service}`,
      `*Date:* ${date}`,
      `*Preferred time:* ${time}`,
      notes.trim() ? `*Notes:* ${notes.trim()}` : "",
      "",
      "Please confirm my slot. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
      className="rounded-[2rem] glass-panel p-8 md:p-10"
    >
      <Field label="Choose your branch">
        <div className="grid grid-cols-2 gap-3">
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBranch(b.id)}
              aria-pressed={branch === b.id}
              className={cn(
                "rounded-xl border px-4 py-3.5 text-left transition-all duration-300",
                branch === b.id
                  ? "border-brand bg-brand/12 ring-glow"
                  : "border-cream/15 bg-ink-soft hover:border-cream/30",
              )}
            >
              <span className="block text-sm font-bold text-cream">{b.shortName}</span>
              <span className="mt-0.5 block truncate text-xs text-cream-dim">
                {b.addressLine1}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field label="Service">
          <div className="relative">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={cn(inputCls, "appearance-none pr-10")}
            >
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Other / Multiple services">Other / Multiple services</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-cream-dim" />
          </div>
        </Field>

        <Field label="Preferred time">
          <div className="relative">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={cn(inputCls, "appearance-none pr-10")}
            >
              {TIME_SLOTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-cream-dim" />
          </div>
        </Field>

        <Field label="Date">
          <input
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={cn(inputCls, "[color-scheme:dark]")}
          />
        </Field>

        <Field label="Your name">
          <input
            type="text"
            required
            placeholder="e.g. Riya Sen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Phone number">
          <input
            type="tel"
            required
            placeholder="+91 98xxx xxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Notes (optional)">
          <input
            type="text"
            placeholder="e.g. bridal trial, long hair…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_0_36px_-6px_var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CalendarCheck className="size-5" />
        Confirm on WhatsApp
      </button>
      <p className="mt-4 text-center text-xs text-cream-dim">
        This opens WhatsApp with your request pre-filled — our team confirms
        your slot within minutes during salon hours. Prefer to call?{" "}
        <a href={BRANCHES[0].phoneHref} className="font-semibold text-brand">
          {BRANCHES[0].phone}
        </a>
      </p>
    </motion.form>
  );
}
