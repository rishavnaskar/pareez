"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  Check,
  ChevronDown,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { BRANCHES, SITE, waLink } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { logBookingRequest, track } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * Appointment form — saves the request to our backend (the admin dashboard's
 * "Website" inbox), then shows a confirmation with optional WhatsApp / call
 * follow-ups instead of forcing the customer into WhatsApp.
 */

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const inputCls =
  "w-full rounded-xl border border-cream/15 bg-ink-soft px-4 py-3.5 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/30";

type Booked = {
  name: string;
  phone: string;
  branchId: string;
  branchName: string;
  branchAddress: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

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

/** Build the structured WhatsApp message for an optional follow-up. */
function bookingMessage(b: Booked): string {
  return [
    "✨ *Appointment Booked — Pareez Website*",
    "",
    `*Name:* ${b.name}`,
    `*Phone:* ${b.phone}`,
    `*Branch:* ${b.branchName} — ${b.branchAddress}`,
    `*Service:* ${b.service}`,
    `*Date:* ${b.date}`,
    `*Preferred time:* ${b.time}`,
    b.notes ? `*Notes:* ${b.notes}` : "",
    "",
    "I've booked this appointment on your website. Following up to confirm!",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Animated confirmation badge — a glowing check with a few sparkles. */
function SuccessIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto flex size-28 items-center justify-center">
      {/* soft pulsing halo */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand/25 blur-2xl"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={
          reduce
            ? { scale: 1, opacity: 0.6 }
            : { scale: [0.8, 1.15, 1], opacity: [0, 0.7, 0.5] }
        }
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {/* expanding ring */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full border border-brand/40"
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {/* badge */}
      <motion.span
        className="relative flex size-20 items-center justify-center rounded-full bg-brand text-ink ring-glow"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.22 }}
        >
          <Check className="size-10" strokeWidth={3} />
        </motion.span>
      </motion.span>
      {/* sparkles */}
      <motion.span
        aria-hidden
        className="absolute -top-1 -right-1 text-brand-bright"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 12 }}
      >
        <Sparkles className="size-5" />
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute -bottom-1 -left-2 text-brand-bright/80"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 300, damping: 12 }}
      >
        <Sparkles className="size-4" />
      </motion.span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="text-xs font-bold tracking-[0.14em] text-cream-dim uppercase">
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-cream">{value}</span>
    </div>
  );
}

function Confirmation({ booked, onReset }: { booked: Booked; onReset: () => void }) {
  const branch = BRANCHES.find((b) => b.id === booked.branchId) ?? BRANCHES[0];
  return (
    <motion.div
      key="confirmation"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
      className="rounded-[2rem] glass-panel p-8 text-center md:p-10"
    >
      <SuccessIllustration />

      <h3 className="mt-6 text-2xl font-bold text-cream md:text-3xl">
        Appointment booked!
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-cream-dim">
        Thanks, {booked.name.split(" ")[0]} — your request is saved with our team.
        We&apos;ll see you at {booked.branchName} on {booked.date}, {booked.time}.
      </p>

      <div className="mx-auto mt-7 max-w-sm divide-y divide-cream/10 rounded-2xl border border-cream/12 bg-ink-soft/60 px-5 py-2 text-left">
        <SummaryRow label="Branch" value={booked.branchName} />
        <SummaryRow label="Service" value={booked.service} />
        <SummaryRow label="Date" value={booked.date} />
        <SummaryRow label="Time" value={booked.time} />
      </div>

      <p className="mt-7 text-xs text-cream-dim">
        Want to follow up or tweak something? Reach us directly:
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <a
          href={waLink(bookingMessage(booked))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_0_36px_-6px_var(--color-brand)]"
        >
          <MessageCircle className="size-4.5" />
          WhatsApp us
        </a>
        <a
          href={branch.phoneHref}
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full border border-cream/20 bg-ink-soft px-6 py-3.5 text-sm font-bold text-cream transition-all duration-300 hover:border-cream/40 hover:bg-ink-soft/70"
        >
          <Phone className="size-4.5" />
          Call salon
        </a>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-semibold text-cream-dim underline-offset-4 transition-colors hover:text-brand hover:underline"
      >
        Book another appointment
      </button>
    </motion.div>
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
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState<Booked | null>(null);
  const valid = name.trim().length >= 2 && /^[\d\s+()-]{8,}$/.test(phone) && date !== "";

  // Fire a single "booking_started" event the moment a visitor begins entering
  // their personal details (name / phone). Compared against "booking_submitted"
  // in the admin dashboard, this surfaces how many people fill the form but
  // never tap "Book Appointment".
  const started = useRef(false);
  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("booking_started");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting || booked) return;
    setSubmitting(true);
    const b = BRANCHES.find((x) => x.id === branch)!;
    const record: Booked = {
      name: name.trim(),
      phone: phone.trim(),
      branchId: b.id,
      branchName: b.shortName,
      branchAddress: b.addressLine1,
      service,
      date,
      time,
      notes: notes.trim(),
    };
    // save to backend exactly as before (fire-and-forget Firestore write)
    logBookingRequest({
      name: record.name,
      phone: record.phone,
      branchId: record.branchId,
      branchName: record.branchName,
      service: record.service,
      date: record.date,
      time: record.time,
      notes: record.notes,
    });
    setBooked(record);
    setSubmitting(false);
  };

  const reset = () => {
    setBooked(null);
    setName("");
    setPhone("");
    setNotes("");
    started.current = false;
  };

  return (
    <AnimatePresence mode="wait">
      {booked ? (
        <Confirmation key="confirmation" booked={booked} onReset={reset} />
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
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
                onChange={(e) => {
                  setName(e.target.value);
                  markStarted();
                }}
                className={inputCls}
              />
            </Field>

            <Field label="Phone number">
              <input
                type="tel"
                required
                placeholder="+91 98xxx xxxxx"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  markStarted();
                }}
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
            disabled={!valid || submitting}
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_0_36px_-6px_var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CalendarCheck className="size-5" />
            {submitting ? "Booking…" : "Book Appointment"}
          </button>
          <p className="mt-4 text-center text-xs text-cream-dim">
            Your appointment is saved with our team instantly. After booking you
            can WhatsApp or call us if anything needs adjusting. Prefer to call
            now?{" "}
            <a href={BRANCHES[0].phoneHref} className="font-semibold text-brand">
              {BRANCHES[0].phone}
            </a>
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
